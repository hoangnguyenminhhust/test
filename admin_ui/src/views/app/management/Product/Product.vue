<template>
  <div>
    <datatable-heading
      :title="$t('menu.product')"
      :total="totalRows"
      :perPage="pagination.perPage"
      :currentPage="pagination.currentPage"
      :changePageSize="changePageSize"
      :handlerPageClick="handlerPageClick"
      :searchChange="searchChange"
    ></datatable-heading>
    <b-row>
      <b-card class="mb-4" style="width: 100%">
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
        <b-table bordered hover :items="products" :fields="fields">
          <template #cell(price)="row">
            <div>{{ row.item.price | formatPrice }}</div>
          </template>
          <template #cell(cost_price)="row">
            <div>{{ row.item.cost_price | formatPrice }}</div>
          </template>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              class="mr-1"
              variant="primary"
              @click="
                $router.push({
                  path: `/app/management/product/${row.item._id}`
                })
              "
              v-b-modal.modaleditright
            >
              Cập nhật
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteProduct(row)">
              Xoá
            </b-button>
          </template>
        </b-table>
        <b-pagination
          size="sm"
          align="center"
          :total-rows="totalRows"
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
  </div>
</template>
<script>
import Vuetable from "vuetable-2";
import VuetablePaginationBootstrap from "../../../../components/Common/VuetablePaginationBootstrap";
import DatatableHeading from "../../../../containers/app/management/product/ProductHeading";

export default {
  props: ["title"],
  components: {
    vuetable: Vuetable,
    "vuetable-pagination-bootstrap": VuetablePaginationBootstrap,
    "datatable-heading": DatatableHeading
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1
      },
      totalRows: 0,
      items: [],
      selectedItems: [],
      products: [],
      fields: [
        { key: "name", label: "Tên" },
        { key: "cost_price", label: "Giá vốn (đồng)" },
        { key: "price", label: "Giá bán (đồng)" },
        { key: "amount", label: "Tồn kho" },
        { key: "unit", label: "Đơn vị" },
        {
          key: "actions",
          label: "Thao tác",
          thClass: "text-center",
          tdClass: "actionClass"
        }
      ],
      employees: [],
      employee: {}
    };
  },
  methods: {
    setupEvenListener() {
      this.$store.subscribe(async muation => {
        if (muation.type === "GET_ALL_PRODUCT") {
          this.products = muation.payload.products;
          this.totalRows = muation.payload.totalProducts;
        }
      });
    },
    deleteProduct(data) {
      try {
        this.$swal
          .fire({
            title: "Bạn có chắc muốn xoá bản ghi này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ"
          })
          .then(async result => {
            if (result.isConfirmed) {
              this.$swal.fire("", "Xoá thành công", "success");
              const productId = data.item._id;
              const productImages = data.item.images;
              let content = data.item.description;
              let temp = document.createElement("div");
              temp.innerHTML = content;
              let images = temp.getElementsByTagName("img");
              const descriptionArrImage = [];
              const productArrImage = [];
              for (let i = 0; i < images.length; i++) {
                descriptionArrImage.push(
                  this.deleteImage({
                    key: images[i].src.substring(64, images[i].src.length)
                  })
                );
              }
              productImages.forEach(r =>
                productArrImage.push(
                  this.$store.dispatch("deleteImage", { key: r })
                )
              );

              await Promise.all([...descriptionArrImage, ...productArrImage]);
              await this.$store.dispatch("deleteProduct", { productId });
              await this.$store.dispatch("getAllProduct", {
                skip: this.pagination.currentPage,
                limit: this.pagination.perPage
              });
            }
          });
      } catch (error) {
        alert(error);
      }
    },
    async changePageSize(perPage) {
      this.pagination.perPage = perPage;
      await this.$store.dispatch("getAllProduct", {
        limit: this.pagination.perPage,
        skip: this.pagination.currentPage
      });
    },
    async handlerPageClick() {
      await this.$store.dispatch("getAllProduct", {
        limit: this.pagination.perPage,
        skip: this.pagination.currentPage
      });
    },
    async searchChange(val) {
      try {
        if (val) {
          await this.$store.dispatch("getAllProduct", {
            limit: this.pagination.perPage,
            skip: this.pagination.currentPage,
            name: val
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    this.setupEvenListener();
    await this.$store.dispatch("getAllProduct", {
      skip: this.pagination.currentPage,
      limit: this.pagination.perPage
    });
  }
};
</script>

<style>
.actionClass {
  width: 20%;
  text-align: center;
}
</style>
