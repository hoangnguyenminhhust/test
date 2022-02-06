<template>
  <div>
    <order-heading
      :title="$t('menu.order')"
      :date="date"
      :handlerDateValue="handlerDateValue"
      :total="totalRows"
      :perPage="pagination.perPage"
      :currentPage="pagination.currentPage"
      :changePageSize="changePageSize"
      :handlerPageClick="handlerPageClick"
    />
    <b-row>
      <b-card class="mb-4" style="width: 100%">
        <b-table :fields="fields" :items="orders">
          <template #cell(payment_method)="row">
            <div v-if="row.item.payment_method === 'online'">
              Thanh toán online
            </div>
            <div v-else>Thanh toán khi nhận hàng</div>
          </template>
          <template #cell(payment)="row">
            <div
              v-if="row.item.payment && row.item.payment_method === 'online'"
              style="color: green"
            >
              Đã thanh toán
            </div>
            <div
              v-else-if="row.item.payment_method === 'offline'"
              style="color: red"
            ></div>
            <div v-else style="color: red">Chưa thanh toán</div>
          </template>
          <template #cell(created_at)="row">
            <div>{{ row.item.created_at | formatDate }}</div>
          </template>
          <template #cell(status)="row">
            <b-select
              v-model="row.item.status"
              :options="options"
              size="sm"
              @change="changeOrderStatus(row.item)"
            ></b-select>
          </template>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              class="mr-1"
              variant="primary"
              v-b-modal.modaleditright
              :to="`/app/management/order/${row.item._id}`"
            >
              Chi tiết
            </b-button>
            <b-button :disabled="row.item.status === 'finish'" size="sm" variant="danger" @click="deleteOrder(row)">
              Huỷ đơn 
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
import OrderHeading from "../../../../containers/app/management/order/OrderHeading";
export default {
  components: {
    "order-heading": OrderHeading
  },
  computed: {
    orders() {
      return this.$store.state.order.orders;
    },
    totalRows() {
      return this.$store.state.order.total;
    }
  },
  data: () => ({
    fields: [
      { key: "customer.fullname", label: "Người đặt" },
      { key: "customer.phone", label: "Số điện thoại" },
      { key: "created_at", label: "Tạo ngày" },
      { key: "payment_method", label: "Phương thức thanh toán" },
      { key: "payment", label: "Thanh Toán" },
      { key: "status", label: "Trạng thái" },
      {
        key: "actions",
        label: "Thao tác",
        thClass: "text-center",
        tdClass: "text-center"
      }
    ],
    date: "",
    options: [
      { value: "pending", text: "Đang đợi xử lý" },
      { value: "finish", text: "Hoàn thành" }
    ],
    pagination: {
      perPage: 5,
      currentPage: 1
    }
  }),
  methods: {
    handlerDateValue(value) {
      this.date = value;
    },
    async changeOrderStatus(val) {
      try {
        await this.$store.dispatch("updateOrder", { _id: val._id, status: val.status });
        this.$swal.fire({
          icon: "success",
          title: "Thông báo",
          text: "Chuyển thành công"
        });
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: "Có lỗi xảy ra vui lòng thử lại"
        });
      }
      await this.$store.dispatch("getAllOrder", {
        limit: this.pagination.perPage,
        skip: this.pagination.currentPage
      });
    },
    async changePageSize(perPage) {
      this.pagination.perPage = perPage;
      await this.$store.dispatch("getAllOrder", {
        limit: this.pagination.perPage,
        skip: this.pagination.currentPage
      });
    },
    async handlerPageClick() {
      await this.$store.dispatch("getAllOrder", {
        limit: this.pagination.perPage,
        skip: this.pagination.currentPage
      });
    },
    async deleteOrder(data) {
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
              this.$swal.fire("Đã xoá", "Đơn hàng đã được xoá", "success");
              const orderId = data.item._id;
              await this.$store.dispatch("deleteOrder", { orderId });
              await this.$store.dispatch("getAllOrder", {
                limit: this.pagination.perPage,
                skip: this.pagination.currentPage
              });
            }
          });
      } catch (error) {
        alert(error);
      }
    }
  },
  async created() {
    await this.$store.dispatch("getAllOrder", {
      limit: this.pagination.perPage,
      skip: this.pagination.currentPage
    });
  }
};
</script>
