<template>
  <v-main style="background-color: #ECEFF1">
    <v-container>
      <v-breadcrumbs
        :items="items"
        style="padding: 0px; margin-top: 50px;"
      />
      <div
        v-for="order in orders"
        :key="order._id"
        style="margin: 20px 0px;"
      >
        <v-card elevation="0">
          <div
            class="d-flex justify-space-between"
            style="width: 100%"
          >
            <div>
              <v-card-title style="font-size: 16px">
                Đơn hàng ngày {{ order.created_at | formatDate }}
              </v-card-title>
            </div>
            <div class="d-flex align-center">
              <v-card-subtitle
                v-if="(order.status === 'pending') & order.ship_code"
                style="font-size: 16px; color: amber"
              >
                Đang vận chuyển
              </v-card-subtitle>
              <v-card-subtitle
                v-else-if="(order.status === 'pending') & !order.ship_code"
                style="font-size: 16px; color: red"
              >
                Đang xử lý
              </v-card-subtitle>
              <v-card-subtitle
                v-else-if="order.status === 'finish'"
                style="font-size: 16px"
              >
                Hoàn thành
              </v-card-subtitle>
            </div>
            <div
              class="d-flex align-center"
              style="margin: 10px"
            >
              <v-btn
                color="#FFA726"
                @click="$router.push({ path: `/order/${order._id}` })"
              >
                Chi tiết
              </v-btn>
            </div>
          </div>
        </v-card>
        <v-dialog
          v-model="orderDetailDialog"
          max-width="600px"
          persistent
        >
          <v-card>
            <v-card-title>
              Chi tiết đơn hàng
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Tên sản phẩm
                      </th>
                      <th class="text-left">
                        Số lượng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in orderDetail"
                      :key="item._id"
                    >
                      <td>{{ item.product.name }}</td>
                      <td>{{ item.quantity }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                color="primary"
                @click="close()"
              >
                Huỷ
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    orderDetailDialog: false,
    orderDetail: [],
    items: [
      {
        text: "Trang chủ",
        disabled: false,
        href: "/"
      },
      {
        text: "Lịch sử hoá đơn",
        disabled: false,
        href: "#"
      }
    ]
  }),
  computed: {
    currentUser() {
      return this.$store.state.user.user;
    },
    orders() {
      return this.$store.state.order.orders;
    }
  },
  async created() {
    this.setupEventListener();

    await this.$store.dispatch("order/getOrderUser", {
      deviceId: this.$route.params.id
    });
  },
  methods: {
    setupEventListener() {
      this.$store.subscribe(async muation => {
        if (muation.type === "order/GET_ORDER_DETAIL") {
          this.orderDetail = muation.payload;
        }
      });
    },
    async openOrderDetail(order) {
      try {
        this.orderDetailDialog = true;
        await this.$store.dispatch("order/getOrderDetail", {
          orderId: order._id
        });
      } catch (error) {
        alert("Có lỗi xảy ra");
      }
    },
    close() {
      this.orderDetailDialog = false;
      this.orderDetail = [];
    }
  }
};
</script>
