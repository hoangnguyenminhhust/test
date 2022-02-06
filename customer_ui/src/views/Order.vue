<template>
  <v-main style="background-color: #ECEFF1">
    <v-container>
      <v-breadcrumbs
        :items="items"
        style="margin-bottom: 30px; padding: 0px"
      />
      <v-row>
        <v-col
          cols="12"
          md="7"
        >
          <v-card elevation="0">
            <v-card-title>Thanh toán và giao hàng</v-card-title>
            <v-form
              lazy-validation
              style="padding: 20px"
            >
              <v-text-field
                v-model="customer.fullname"
                :error-messages="nameErrors"
                label="Họ và tên"
                style="width: 50%"
                @input="$v.customer.fullname.$touch()"
                @blur="$v.customer.fullname.$touch()"
              />
              <v-text-field
                v-model="customer.phone"
                :error-messages="phoneErrors"
                label="Số điện thoại"
                style="width: 50%"
                @input="$v.customer.phone.$touch()"
                @blur="$v.customer.phone.$touch()"
              />
              <v-text-field
                v-model="customer.email"
                :error-messages="emailErrors"
                label="Địa chỉ email"
                style="width: 50%"
                @input="$v.customer.email.$touch()"
                @blur="$v.customer.email.$touch()"
              />
              <v-row>
                <v-col>
                  <v-autocomplete
                    v-model="customer.province"
                    :error-messages="provinceErrors"
                    :items="
                      provinces.map(r => {
                        return {
                          text: r.ProvinceName,
                          value: r.ProvinceID
                        };
                      })
                    "
                    label="Thành phố, Tỉnh"
                    dense
                    @input="$v.customer.province.$touch()"
                    @blur="$v.customer.province.$touch()"
                  />
                </v-col>
                <v-col>
                  <v-autocomplete
                    v-model="customer.district"
                    :error-messages="districtErrors"
                    :items="
                      districts.map(r => {
                        return {
                          text: r.DistrictName,
                          value: r.DistrictID
                        };
                      })
                    "
                    label="Quận, Huyện"
                    dense
                    :disabled="!customer.province"
                    @input="$v.customer.district.$touch()"
                    @blur="$v.customer.district.$touch()"
                  />
                </v-col>
                <v-col>
                  <v-autocomplete
                    v-model="customer.ward"
                    :error-messages="wardErrors"
                    :items="
                      wards.map(r => {
                        return {
                          text: r.WardName,
                          value: r.WardCode
                        };
                      })
                    "
                    label="Phường, xã"
                    dense
                    :disabled="!customer.district"
                    @input="$v.customer.ward.$touch()"
                    @blur="$v.customer.ward.$touch()"
                  />
                </v-col>
              </v-row>
              <v-text-field
                v-model="customer.address"
                :error-messages="addressErrors"
                label="Số nhà"
                @input="$v.customer.address.$touch()"
                @blur="$v.customer.address.$touch()"
              />
              <v-textarea
                v-model="note"
                outlined
                name="input-7-4"
                label="Ghi chú"
              />
            </v-form>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="5"
        >
          <v-card elevation="0">
            <v-card-title>Đơn hàng</v-card-title>
            <div style="padding: 20px">
              <div
                class="d-flex justify-space-between"
                style="margin: 10px 0px"
              >
                <div class="subtitle-1">
                  Sản phẩm
                </div>
                <div style="font-size: 16px; color: #C62828">
                  Tạm tính
                </div>
              </div>
              <v-divider />
              <div
                v-for="(item, i) in products"
                :key="i"
              >
                <div
                  class="d-flex justify-space-between"
                  style="margin: 20px 0px"
                >
                  <div
                    class="subtitle-1"
                    style="margin-right: 20px"
                  >
                    {{ item.product.name }} x
                    <strong>{{ item.quantity }}</strong>
                  </div>
                  <div style="font-size: 16px; color: #C62828">
                    {{ item.product.price | formatPrice }}đ
                  </div>
                </div>
              </div>
              <v-divider />
              <div
                class="d-flex justify-space-between"
                style="margin: 10px 0px"
              >
                <div class="subtitle-1">
                  Phí ship
                </div>
                <div style="font-size: 16px; color: #C62828">
                  {{ feeShip | formatPrice }}đ
                </div>
              </div>
              <v-divider />
              <div
                class="d-flex justify-space-between"
                style="margin: 10px 0px"
              >
                <div class="subtitle-1">
                  Tổng
                </div>
                <div style="font-size: 16px; color: #C62828">
                  {{ totalPrice | formatPrice }}đ
                </div>
              </div>
              <div>
                <v-radio-group v-model="paymentMethod">
                  <v-radio
                    label="Thanh toán khi nhận hàng"
                    value="offline"
                  />
                  <v-radio
                    label="Thanh toán online"
                    value="online"
                  />
                </v-radio-group>
              </div>
              <v-btn
                color="warning"
                @click="orderHandler"
              >
                Đặt hàng
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import validator from "validator";

const isPhoneNumber = value => validator.isMobilePhone(value, "vi-VN");
export default {
  mixins: [validationMixin],
  data: () => ({
    customer: {
      fullname: "",
      phone: "",
      email: "",
      address: "",
      province: "",
      district: "",
      ward: ""
    },
    feeShip: 0,
    note: "",
    paymentMethod: "offline",
    products: [],
    valid: true,
    items: [
      {
        text: "Trang chủ",
        disabled: false,
        href: "/"
      },
      {
        text: "Giỏ hàng",
        disabled: false,
        href: "/cart"
      },
      {
        text: "Chi tiết thanh toán",
        disabled: false,
        href: "/order"
      }
    ]
  }),
  validations: {
    customer: {
      fullname: {
        required
      },
      phone: { isPhoneNumber },
      email: { required, email },
      address: { required },
      province: { required },
      district: { required },
      ward: { required }
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    totalPrice() {
      let total = 0;
      this.products.forEach(r => {
        total += r.product.price * r.quantity;
      });
      return total + this.feeShip;
    },
    order() {
      return this.$store.state.order.order;
    },
    provinces() {
      return this.$store.state.location.provinces || [];
    },
    districts() {
      return this.$store.state.location.districts || [];
    },
    wards() {
      return this.$store.state.location.wards || [];
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.customer.fullname.$dirty) return errors;
      !this.$v.customer.fullname.required &&
        errors.push("Họ và tên không được để trống.");
      return errors;
    },
    provinceErrors() {
      const errors = [];
      if (!this.$v.customer.province.$dirty) return errors;
      !this.$v.customer.province.required &&
        errors.push("Tỉnh, Thành phố không được để trống.");
      return errors;
    },
    districtErrors() {
      const errors = [];
      if (!this.$v.customer.district.$dirty) return errors;
      !this.$v.customer.district.required &&
        errors.push("Quận, huyện phố không được để trống.");
      return errors;
    },
    wardErrors() {
      const errors = [];
      if (!this.$v.customer.ward.$dirty) return errors;
      !this.$v.customer.ward.required &&
        errors.push("Phường, xã phố không được để trống.");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.customer.phone.$dirty) return errors;
      !this.$v.customer.phone.isPhoneNumber &&
        errors.push("Số điện thoại không đúng định dạng");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.customer.email.$dirty) return errors;
      !this.$v.customer.email.email && errors.push("email sai định dạng.");
      !this.$v.customer.email.required &&
        errors.push("email không được để trống.");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.customer.address.$dirty) return errors;
      !this.$v.customer.address.required &&
        errors.push("Số nhà không được để trống.");
      return errors;
    }
  },
  watch: {
    "customer.province": async function(val) {
      if (val) {
        try {
          await this.$store.dispatch("location/getDistrict", {
            provinceId: this.customer.province
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    "customer.district": async function(val) {
      if (val) {
        await this.$store.dispatch("location/getWard", {
          districtId: this.customer.district
        });
      }
    },
    "customer.ward": async function(val) {
      if (val) {
        try {
          await this.$store.dispatch("order/getFeeShip", {
            districtId: this.customer.district,
            wardId: this.customer.ward
          });
        } catch (error) {
          alert("Chưa hỗ trợ ship khu vực này");
        }
      }
    }
  },
  async created() {
    this.setupEventListener();
    if (localStorage.getItem("cart")) {
      await this.$store.dispatch("location/getProvince");
      const cart = JSON.parse(localStorage.getItem("cart")).products;
      this.products = cart;
    }
    if (this.user) {
      this.customer.fullname = this.user.first_name + " " + this.user.last_name;
      this.customer.phone = this.user.phone;
      this.customer.email = this.user.email;
      this.customer.province = this.user.province;
      this.customer.district = this.user.district;
      this.customer.ward = this.user.ward;
      this.customer.address = this.user.address;
    }
  },
  methods: {
    setupEventListener() {
      this.$store.subscribe(mutation => {
        if (mutation.type === "order/GET_FEE_SHIP") {
          this.feeShip = mutation.payload;
        }
      });
    },
    async orderHandler() {
      try {
      this.$v.customer.$touch();
      if (!this.$v.customer.$anyError) {
          await this.$store.dispatch("order/createOrder", {
            customer: this.customer,
            customer_id: this.user ? this.user._id : null,
            payment_method: this.paymentMethod,
            feeShip: this.feeShip,
            note: this.note,
            created_at: new Date(),
            device_id: localStorage.getItem('deviceId'),
            products: this.products.map(r => {
              return {
                product: r.product._id,
                quantity: r.quantity
              };
            })
          });
        if (this.paymentMethod === "offline") {
          this.$router.push({ path: "/order-success" });
        } else {
          const paymentUrl = await this.$store.dispatch(
            "order/createPaymentUrl",
            {
              orderId: this.order._id,
              total: this.totalPrice
            }
          );
          document.location.href = paymentUrl;
        }
      }
      } catch (error) {
        alert(error.response.data);
      }
    }
  }
};
</script>
