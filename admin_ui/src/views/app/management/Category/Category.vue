<template>
  <div>
    <datatable-heading
      :title="$t('menu.category')"
    ></datatable-heading>
    <b-row>
      <!-- <b-colxx xxs="12">
        <vuetable
          ref="vuetable"
          class="table-divided order-with-arrow"
          :api-mode="false"
          :data="items"
          :query-params="makeQueryParams"
          :per-page="perPage"
          :reactive-api-url="true"
          :fields="fields"
          pagination-path
          :row-class="onRowClass"
          @vuetable:pagination-data="onPaginationData"
          @vuetable:row-clicked="rowClicked"
          @vuetable:cell-rightclicked="rightClicked"
        >
          <div slot="actions" slot-scope="props">
            <b-form-checkbox
              :checked="selectedItems.includes(props.rowData._id)"
              class="itemCheck mb-0"
            ></b-form-checkbox>
          </div>
        </vuetable>
        <vuetable-pagination-bootstrap
          class="mt-4"
          ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        />
      </b-colxx> -->
      <b-table bordered hover :items="categories" :fields="fields">
        <template #cell(actions)="row">
          <b-button
            size="sm"
            class="mr-1"
            variant="primary"
            @click="openEditCategoryModal(row)"
          >
            Cập nhật
          </b-button>
          <b-button size="sm" variant="danger" @click="deleteCategory(row)">
            Xoá
          </b-button>
        </template>
      </b-table>
    </b-row>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="onContextMenuAction('copy')">
        <i class="simple-icon-docs" />
        <span>Copy</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('move-to-archive')">
        <i class="simple-icon-drawer" />
        <span>Move to archive</span>
      </v-contextmenu-item>
      <v-contextmenu-item @click="onContextMenuAction('delete')">
        <i class="simple-icon-trash" />
        <span>Delete</span>
      </v-contextmenu-item>
    </v-contextmenu>
       <b-modal id="editCategoryModal" title="Cập nhật danh mục">
      <b-form
        class="av-tooltip tooltip-label-right"
        @submit.stop.prevent="onSubmit"
      >
        <b-form-group id="namefield" label="Tên" label-cols="1">
          <b-form-input
            id="input-1"
            v-model="$v.category.name.$model"
            :state="!$v.category.name.$error"
          ></b-form-input>
          <b-form-invalid-feedback
            >Tên không được để trống
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="levelfield" label="Cấp" label-cols="1">
          <b-form-input
            id="input-2"
            v-model="$v.category.level.$model"
            :state="!$v.category.level.$error"
          ></b-form-input>
          <b-form-invalid-feedback
            >Cấp không được để trống và phải là sô
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <template slot="modal-footer">
        <b-button
          variant="primary"
          type="submit"
          @click="onSubmit()"
          class="mr-1"
          >Lưu</b-button
        >
        <b-button variant="secondary" @click="close()">Huỷ</b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import Vuetable from "vuetable-2";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/app/management/category/CategoryHeading";
import { validationMixin } from "vuelidate";
import { required, numeric } from "vuelidate/lib/validators";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading,
  },
  mixins: [validationMixin],
  data() {
    return {
      fields: [
        { key: "name", label: "Tên" },
        { key: "level", label: "Cấp" },
        { key: "actions", thClass: "text-center", tdClass: "actionClass" },
      ],
      categories: [],
      category: {
        name: "",
        level: "",
      },
    };
  },
  validations: {
    category: {
      name: {
        required,
      },
      level: {
        required,
        numeric,
      },
    },
  },
  methods: {
    setupEvenListener() {
      this.$store.subscribe(async (muation) => {
        if (muation.type === "RETURN_CATEGORY") {
          this.categories = muation.payload;
        }
      });
    },
    openEditCategoryModal(row) {
      this.$bvModal.show('editCategoryModal');
      this.category = row.item
    },
    close() {
      this.$bvModal.hide('editCategoryModal');
    },
    async onSubmit() {
      try {
        await this.$store.dispatch('editCategory', this.category);
        this.$swal.fire({
              icon: 'success',
              title: 'Thông báo',
              text: 'Cập nhật thành công'
        });
        this.$bvModal.hide('editCategoryModal');
        await this.$store.dispatch('getAllCategory');
      } catch (error) {
        this.$swal.fire({
              icon: 'error',
              title: 'Thông báo',
              text: 'Có lỗi xảy ra'
        });
      }
    },
    deleteCategory(data) {
      try {
        this.$swal.fire({
          title: "Bạn có chắc muốn xoá bản ghi này?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Huỷ"
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
              icon: 'success',
              title: 'Thông báo',
              text: 'Xoá thành công'
            });
            const catetogryId = data.item._id;
            await this.$store.dispatch("deleteCategory", { _id: catetogryId });
            await this.$store.dispatch("getAllCategory");
          }
        });
      } catch (error) {
        alert(error);
      }
    },
    editCategory(data) {
      this.employee = data.item;
    },
  },
  async created() {
    this.setupEvenListener();
    await this.$store.dispatch('getAllCategory');
  },
};
</script>

<style>
  .actionClass {
    width: 20%;
    text-align: center;
  }
</style>
