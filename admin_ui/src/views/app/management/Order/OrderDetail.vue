<template>
  <div>
    <heading :onSubmit="onSubmit" :order="order" />
    <b-form @submit.prevent="onSubmit" class="av-tooltip tooltip-label-right">
      <b-row>
        <b-col>
          <b-form-group label-cols="2" id="orderId-input" label="Mã đơn:">
            <b-form-input :disabled="true" v-model="order._id"></b-form-input>
            <b-form-invalid-feedback
              >Tên không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label-cols="2"
            id="fullname-input"
            label="Tên khách hàng:"
          >
            <b-form-input
              v-model="$v.order.customer.fullname.$model"
              :state="!$v.order.customer.fullname.$error"
            ></b-form-input>
            <b-form-invalid-feedback
              >Tên không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="2" id="phone-input" label="Số điện thoại:">
            <b-form-input
              v-model="$v.order.customer.phone.$model"
              :state="!$v.order.customer.phone.$error"
            ></b-form-input>
            <b-form-invalid-feedback
              >Số điện thoại không được để trống và phải là số
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="2" id="email-input" label="Email:">
            <b-form-input
              v-model="$v.order.customer.email.$model"
              :state="!$v.order.customer.email.$error"
            ></b-form-input>
            <b-form-invalid-feedback
              >Email không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="2" id="creadtedAt-input" label="Ngày tạo:">
            <b-form-input
              :value="formatDate(order.created_at)"
              :disabled="true"
            ></b-form-input>
            <b-form-invalid-feedback
              >Ngày tạo không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label-cols="2"
            id="paymentMethod-input"
            label="Phương thức thanh toán:"
          >
            <b-form-input
              v-model="paymentMethod"
              :disabled="true"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            v-if="order.payment_method === 'online'"
            label-cols="2"
            id="payment-input"
            label="Thanh toán:"
          >
            <div v-if="order.payment">
              <h4 style="color: green">Đã thanh toán</h4>
            </div>
            <div v-else>
              <h4 style="color: red">Chưa thanh toán</h4>
            </div>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group
            label-cols="2"
            id="provine-input"
            label="Tỉnh, Thành phố:"
            v-if="provinces.length > 0"
          >
            <b-form-select
              :options="
                provinces.map(r => {
                  return {
                    value: r.ProvinceID,
                    text: r.ProvinceName
                  };
                })
              "
              required
              v-model="$v.order.customer.province.$model"
              :state="!$v.order.customer.province.$error"
            ></b-form-select>
            <!-- <datalist id="province-input">
              <option v-for="(province, i) in provinces.map(r => {
                return {
                  value: r.ProvinceID,
                  text: r.ProvinceName,
                }
                })" :key="i">{{ province.text }}</option>
            </datalist> -->
            <b-form-invalid-feedback
              >Thành phố không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label-cols="2"
            id="district-input"
            label="Quận, Huyện:"
            v-if="districts.length > 0"
          >
            <b-form-select
              :options="
                districts.map(r => {
                  return {
                    text: r.DistrictName,
                    value: r.DistrictID
                  };
                })
              "
              required
              v-model="$v.order.customer.district.$model"
              :state="!$v.order.customer.district.$error"
            ></b-form-select>
            <b-form-invalid-feedback
              >Quận, huyên không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label-cols="2"
            id="ward-input"
            label="Phường, Xã:"
            v-if="wards.length > 0"
          >
            <b-form-select
              :options="
                wards.map(r => {
                  return {
                    text: r.WardName,
                    value: r.WardCode
                  };
                })
              "
              required
              v-model="$v.order.customer.ward.$model"
              :state="
                wards
                  .map(r => r.WardCode)
                  .includes($v.order.customer.ward.$model)
              "
            ></b-form-select>
            <b-form-invalid-feedback
              >Phường, xã không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label-cols="2" id="address-input" label="Số nhà:">
            <b-form-input
              v-model="$v.order.customer.address.$model"
              :state="!$v.order.customer.address.$error"
            ></b-form-input>
            <b-form-invalid-feedback
              >Số nhà không được để trống
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            v-if="order.ship_code"
            label-cols="2"
            id="status-input"
            label="Mã ship:"
          >
            <div>
              <h3>{{ order.ship_code }}</h3>
            </div>
          </b-form-group>
          <b-form-group label-cols="2" id="feeship-input" label="Phí ship:">
            <div>
              <h3 style="color: red">{{ feeShip | formatPrice }}đ</h3>
            </div>
          </b-form-group>
          <b-form-group label-cols="2" id="total-input" label="Tổng:">
            <div>
              <h3>{{ (total + feeShip) | formatPrice }}đ</h3>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="!order.ship_code">
        <b-col></b-col>
        <b-col style="display: flex; justify-content: center">
          <b-button variant="primary default" @click="createOrderShip()"
            >Tạo đơn giao hàng nhanh</b-button
          >
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row style="margin-top: 50px">
        <b-table :fields="fields" :items="orderDetail">
          <template #cell(product)="row">
            <div>{{ row.item.product.price | formatPrice }}đ</div>
          </template>
        </b-table>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import Heading from "../../../../containers/app/management/order/OrderEditHeading";
import { validationMixin } from "vuelidate";
import { required, numeric, email } from "vuelidate/lib/validators";
import dayjs from "dayjs";
import { VueAutosuggest } from "vue-autosuggest";

export default {
  components: {
    heading: Heading,
    "vue-autosuggest": VueAutosuggest
  },
  data: () => ({
    // customer: {
    //   fullname: "",
    //   phone: "",
    //   address: ""
    // }
    feeShip: 0,
    fields: [
      { key: "product._id", label: "Mã sản phẩm" },
      { key: "product.name", label: "Tên sản phẩm" },
      { key: "quantity", label: "Số lượng" },
      { key: "product", label: "Giá" }
    ]
  }),
  mixins: [validationMixin],
  validations: {
    order: {
      customer: {
        fullname: {
          required
        },
        phone: {
          required,
          numeric
        },
        email: {
          required,
          email
        },
        address: {
          required
        },
        province: {
          required
        },
        district: {
          required
        },
        ward: {
          required
        }
      }
    },
    created_at: {
      required
    }
  },
  computed: {
    order() {
      return this.$store.state.order.order;
    },
    orderDetail() {
      return this.$store.state.order.orderDetail;
    },
    paymentMethod() {
      if (this.order.payment_method === "online") {
        return "Thanh toán online";
      }
      return "Thanh toán khi nhận hàng";
    },
    total() {
      let total = 0;
      this.orderDetail.forEach(r => {
        total += r.product.price * r.quantity;
      });
      return total;
    },
    provinces() {
      return this.$store.state.location.provinces || [];
    },
    districts() {
      return this.$store.state.location.districts || [];
    },
    wards() {
      return this.$store.state.location.wards || [];
    }
  },
  methods: {
    formatDate(value) {
      if (value) return dayjs(value).format("DD/MM/YYYY");
    },
    onSubmit() {
      this.$v.order.$touch();
      if (this.$v.order.$anyError) {
        return false;
      } else {
        return true;
      }
    },
    setupEventListener() {
      this.$store.subscribe(mutation => {
        if (mutation.type === "GET_FEE_SHIP") {
          this.feeShip = mutation.payload;
        }
      });
    },
    async createOrderShip() {
      try {
        await this.$store.dispatch("createOrderShip", {
          fullname: this.order.customer.fullname,
          phone: this.order.customer.phone,
          address: this.order.customer.address,
          wardCode: this.order.customer.ward,
          districtId: this.order.customer.district,
          total: this.total,
          products: this.orderDetail,
          orderId: this.order._id,
          feeShip: this.feeShip,
          paymentMethod: this.order.payment_method
        });
        await this.$store.dispatch("getOrder", {
          orderId: this.$route.params.orderId
        }),
          this.$swal.fire({
            icon: "success",
            title: "Thông báo",
            text: "Gửi đơn thành công"
          });
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          title: "Thông báo",
          text: error.response.data
        });
      }
    }
  },
  watch: {
    "order.customer.province": async function(val, newVal) {
      if (val) {
        try {
          await this.$store.dispatch("getDistrict", {
            provinceId: this.order.customer.province
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    "order.customer.district": async function(val, newVal) {
      if (val) {
        await this.$store.dispatch("getWard", {
          districtId: this.order.customer.district
        });
        // this.order.customer.ward = "";
      }
    },
    "order.customer.ward": async function(val, newVal) {
      if (newVal) {
        try {
          await this.$store.dispatch("getFeeShip", {
            districtId: this.order.customer.district,
            wardId: this.order.customer.ward
          });
        } catch (error) {
          this.feeShip = 0;
          alert("Chưa hỗ trợ ship khu vực này");
        }
      }
    }
  },
  async created() {
    this.setupEventListener();
    await Promise.all([
      await this.$store.dispatch("getOrder", {
        orderId: this.$route.params.orderId
      }),
      await this.$store.dispatch("getOrderDetail", {
        orderId: this.$route.params.orderId
      }),
      await this.$store.dispatch("getProvince")
    ]);

    await this.$store.dispatch("getFeeShip", {
      districtId: this.order.customer.district,
      wardId: this.order.customer.ward
    });
    // await Promise.all([
    //   this.$store.dispatch("getProvince"),
    //   this.$store.dispatch("getDistrict", {
    //     provinceId: this.order.customer.province
    //   }),
    //   this.$store.dispatch("getWard", {
    //     districtId: this.order.customer.district
    //   }),
    // ]);
  }
};
</script>
