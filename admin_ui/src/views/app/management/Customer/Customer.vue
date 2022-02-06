<template>
  <div>
    <datatable-heading
      title="Nhân viên"
      :total="pagination.totalRows"
      :perPage="pagination.perPage"
      :currentPage="pagination.currentPage"
      :changePageSize="changePageSize"
      :handlerPageClick="handlerPageClick"
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
      <b-card class="mb-4" style="width: 100%">
        <b-table
          bordered
          outlined
          hover
          :items="items"
          :fields="fields"
          :current-page="pagination.currentPage"
        >
          <template #cell(actions)="row">
            <b-button
              size="sm"
              class="mr-1"
              variant="primary"
              @click="editCustomer(row)"
              v-b-modal.modaleditright
            >
              Cập nhật
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteCustomer(row)">
              Xoá
            </b-button>
          </template>
          <template #cell(active)="row">
            <span v-if="row.value === true" class="badge badge-success"
              >Đã kích hoạt</span
            >
            <span v-else class="badge badge-danger">Chưa kích hoạt</span>
          </template>
        </b-table>
        <b-pagination
          size="sm"
          align="center"
          :total-rows="pagination.totalRows"
          :per-page="pagination.perPage"
          v-model="pagination.currentPage"
          @input="handlerPageClick()"
        >
          <template v-slot:next-text>
            <i class="simple-icon-arrow-right" />
          </template>
          <template v-slot:prev-text>
            <i class="simple-icon-arrow-left" />
          </template>
          <template v-slot:first-text>
            <i class="simple-icon-control-start" />
          </template>
          <template v-slot:last-text>
            <i class="simple-icon-control-end" />
          </template>
        </b-pagination>
      </b-card>
    </b-row>
    <edit-customer-modal
      :skip="pagination.currentPage"
      :limit="pagination.perPage"
      :customerProp="customer"
    />
  </div>
</template>
<script>
import DatatableHeading from "../../../../containers/app/management/customer/CustomerHeading";
import EditCustomerModal from "../../../../containers/app/management/customer/EditCustomerModal";

export default {
  props: ["title"],
  components: {
    "datatable-heading": DatatableHeading,
    "edit-customer-modal": EditCustomerModal
  },
  data() {
    return {
      items: [],
      pagination: {
        totalRows: 0,
        perPage: 5,
        currentPage: 1
      },
      fields: [
        { key: "first_name", label: "Họ" },
        { key: "last_name", label: "Tên" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Số điện thoại" },
        {
          key: "actions",
          label: "Thao tác",
          thClass: "text-center",
          tdClass: "text-center"
        }
      ],
      customers: [],
      customer: {}
    };
  },
  methods: {
    setupEvenListener() {
      this.$store.subscribe(async muation => {
        if (muation.type === "LIST_ALL_CUSTOMER") {
          this.items = muation.payload.users;
          this.pagination.totalRows = muation.payload.total;
        }
        if (muation.type === "ADD_CUSTOMER") {
        }
        if (muation.type === "SEARCH_USER") {
          this.items = muation.payload.users.map(r => r.doc);
          this.pagination.totalRows = muation.payload.total;
        }
      });
    },
    deleteCustomer(data) {
      try {
        this.$swal
          .fire({
            title: "Bạn có chắc muốn xoá?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ"
          })
          .then(async result => {
            if (result.isConfirmed) {
              this.$swal.fire(
                "Đã xoá",
                "Your file has been deleted.",
                "success"
              );
              const userId = data.item._id;
              await this.$store.dispatch("deleteUser", { userId });
              await this.$store.dispatch("getAllCustomer", {
                limit: this.pagination.perPage,
                skip: this.pagination.currentPage
              });
            }
          });
      } catch (error) {
        alert(error);
      }
    },
    editCustomer(data) {
      this.customer = data.item;
    },
    async changePageSize(perPage) {
      this.pagination.perPage = perPage;
      await this.$store.dispatch("getAllCustomer", {
        limit: this.pagination.perPage,
        skip: this.pagination.currentPage
      });
    },
    async handlerPageClick(text) {
      if (text) {
        await this.$store.dispatch("searchUser", {
          text: text,
          skip: this.pagination.currentPage,
          limit: this.pagination.perPage
        });
      } else {
        await this.$store.dispatch("getAllCustomer", {
          limit: this.pagination.perPage,
          skip: this.pagination.currentPage
        });
      }
    }
  },
  computed: {
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 &&
        this.selectedItems.length < this.items.length
      );
    }
  },
  async created() {
    this.setupEvenListener();
    await this.$store.dispatch("getAllCustomer", {
      limit: this.pagination.perPage,
      skip: this.pagination.currentPage
    });
  }
};
</script>
