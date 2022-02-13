<template>
  <div>
    <datatable-heading
      :title="$t('menu.category')"
      :categoriesGroup="ModifyCategories"
    ></datatable-heading>
    <b-row>
      <b-table bordered hover :items="categories" :fields="fields">
        <template #cell(actions)="row">
          <b-button
            size="sm"
            class="mr-1"
            variant="primary"
            @click="openEditParentCategoryModal(row)"
          >
            Cập nhật
          </b-button>
          <b-button
            size="sm"
            variant="danger"
            @click="deleteParentCategory(row)"
          >
            Xoá
          </b-button>
        </template>
        <template #cell(level)="row">
          <b-list-group v-for="(item, index) in row.item.category" :key="index">
            <b-row>
              <b-col>
                <b-list-group-item class="ml-0">{{
                  item.name
                }}</b-list-group-item>
              </b-col>
              <b-col>
                <b-button
                  size="sm"
                  class="mr-0"
                  variant="primary"
                  @click="openEditCategoryModal(item)"
                >
                  Cập nhật
                </b-button>
                <b-button
                  size="sm"
                  class="mr-0"
                  variant="danger"
                  @click="deleteCategory(row)"
                >
                  Xoá
                </b-button></b-col
              >
            </b-row>
          </b-list-group>
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
        <b-form-group id="levelfield" label="Nhóm" label-cols="1">
          <b-form-select
            :options="ModifyCategories"
            v-model="$v.category.parent.$model"
            :state="!$v.category.parent.$error"
            plain
          />
          <b-form-invalid-feedback
            >Danh mục không được để trống</b-form-invalid-feedback
          >
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
    <b-modal id="editParentCategoryModal" title="Cập nhật danh mục">
      <b-form
        class="av-tooltip tooltip-label-right"
        @submit.stop.prevent="onSubmit"
      >
        <b-form-group id="namefield" label="Tên" label-cols="1">
          <b-form-input
            id="input-1"
            v-model="$v.parentCategory.name.$model"
            :state="!$v.parentCategory.name.$error"
          ></b-form-input>
          <b-form-invalid-feedback
            >Tên không được để trống
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group id="levelfield" label="Cấp" label-cols="1">
          <b-form-input
            id="input-2"
            v-model="$v.parentCategory.level.$model"
            :state="!$v.parentCategory.level.$error"
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
          @click="onSubmitParent()"
          class="mr-1"
          >Lưu</b-button
        >
        <b-button variant="secondary" @click="closeParent()">Huỷ</b-button>
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
      ModifyCategories: [],
      parentCategory: {
        name: "",
        level: "",
      },
      category: {
        name: "",
        parent: "",
      },
    };
  },
  validations: {
    category: {
      name: {
        required,
      },
      parent: {
        required,
      },
    },
    parentCategory: {
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
        if (muation.type === "RETURN_PARENT_CATEGORY") {
          this.categories = muation.payload;
          this.ModifyCategories = muation.payload.map((x) => {
            return {
              text: x.name,
              value: x._id,
            };
          });
        }
      });
    },
    openEditParentCategoryModal(row) {
      this.$bvModal.show("editParentCategoryModal");
      this.parentCategory = row.item;
    },
    openEditCategoryModal(item) {
      this.$bvModal.show("editCategoryModal");
      this.category = item;
    },

    close() {
      this.$bvModal.hide("editCategoryModal");
    },

    async onSubmit() {
      try {
        await this.$store.dispatch("editCategory", this.category);
        this.$swal.fire({
          icon: "success",
          title: "Thông báo",
          text: "Cập nhật thành công",
        });
        this.$bvModal.hide("editCategoryModal");
        await this.$store.dispatch("getAllParentCategory");
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Có lỗi xảy ra",
        });
      }
    },

    closeParent() {
      this.$bvModal.hide("editParentCategoryModal");
    },

    async onSubmitParent() {
      try {
        await this.$store.dispatch("editParentCategory", this.parentCategory);
        this.$swal.fire({
          icon: "success",
          title: "Thông báo",
          text: "Cập nhật thành công",
        });
        this.$bvModal.hide("editParentCategoryModal");
        await this.$store.dispatch("getAllParentCategory");
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Có lỗi xảy ra",
        });
      }
    },

    deleteParentCategory(data) {
      try {
        this.$swal
          .fire({
            title: "Bạn có chắc muốn xoá bản ghi này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              this.$swal.fire({
                icon: "success",
                title: "Thông báo",
                text: "Xoá thành công",
              });
              const parentCatetogryId = data.item._id;
              await this.$store.dispatch("deleteParentCategory", {
                _id: parentCatetogryId,
              });
              await this.$store.dispatch("getAllParentCategory");
            }
          });
      } catch (error) {
        alert(error);
      }
    },

    editParentCategory(data) {
      this.employee = data.item;
    },
    deleteCategory(data) {
      try {
        this.$swal
          .fire({
            title: "Bạn có chắc muốn xoá bản ghi này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              this.$swal.fire({
                icon: "success",
                title: "Thông báo",
                text: "Xoá thành công",
              });
              const parentCatetogryId = data.item._id;
              await this.$store.dispatch("deleteParentCategory", {
                _id: parentCatetogryId,
              });
              await this.$store.dispatch("getAllParentCategory");
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
    await this.$store.dispatch("getAllParentCategory");
  },
};
</script>

<style>
.actionClass {
  width: 20%;
  text-align: center;
}
</style>
