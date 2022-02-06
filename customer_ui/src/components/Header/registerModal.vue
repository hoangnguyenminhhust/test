<template>
  <v-row justify="center">
    <v-dialog
      v-model="registerDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Đăng kí</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.first_name"
                    label="Họ*"
                    :error-messages="firstNameErrors"
                    required
                    @input="$v.user.first_name.$touch()"
                    @blur="$v.user.first_name.$touch()"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.last_name"
                    label="Tên*"
                    :error-messages="lastNameErrors"
                    required
                    @input="$v.user.last_name.$touch()"
                    @blur="$v.user.last_name.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-radio-group
                    v-model="user.gender"
                    row
                    :error-messages="genderErrors"
                    @input="$v.user.gender.$touch()"
                    @blur="$v.user.gender.$touch()"
                  >
                    <v-radio
                      label="Nam"
                      value="male"
                    />
                    <v-radio
                      label="Nữ"
                      value="female"
                    />
                  </v-radio-group>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.email"
                    label="Email*"
                    :error-messages="emailErrors"
                    required
                    @input="$v.user.email.$touch()"
                    @blur="$v.user.email.$touch()"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.phone"
                    label="Số điện thoại*"
                    :error-messages="phoneErrors"
                    required
                    @input="$v.user.phone.$touch()"
                    @blur="$v.user.phone.$touch()"
                  />
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.province"
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
                    @input="$v.user.province.$touch()"
                    @blur="$v.user.province.$touch()"
                  />
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.district"
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
                    :disabled="!user.province"
                    @input="$v.user.district.$touch()"
                    @blur="$v.user.district.$touch()"
                  />
                </v-col>
                <v-col cols="4">
                  <v-autocomplete
                    v-model="user.ward"
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
                    :disabled="!user.district"
                    @input="$v.user.ward.$touch()"
                    @blur="$v.user.ward.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.address"
                    label="Địa chỉ*"
                    :error-messages="addressErrors"
                    required
                    @input="$v.user.address.$touch()"
                    @blur="$v.user.address.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.password"
                    label="Mật khẩu*"
                    type="password"
                    :error-messages="passwordErrors"
                    required
                    @input="$v.user.password.$touch()"
                    @blur="$v.user.password.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.confirm_pass"
                    label="Xác nhận mật khẩu*"
                    type="password"
                    :error-messages="confirmPassErrors"
                    required
                    @input="$v.user.confirm_pass.$touch()"
                    @blur="$v.user.confirm_pass.$touch()"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small>*bắt buộc</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
          >
            Hủy
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit()"
          >
            Đăng kí
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  numeric,
  sameAs,
  minLength
} from "vuelidate/lib/validators";
export default {
  // eslint-disable-next-line vue/require-prop-types
  name: "LoginModal",
  mixins: [validationMixin],
  // eslint-disable-next-line vue/require-prop-types
  props: ["registerDialog", "registerDialogStatus"],
  data: () => ({
    user: {
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirm_pass: "",
      role: "customer",
      province: "",
      district: "",
      ward: ""
    }
  }),
  validations: {
    user: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required,
        email
      },
      address: {
        required
      },
      gender: {
        required
      },
      phone: {
        required,
        numeric
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirm_pass: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs("password")
      },
      province: { required },
      district: { required },
      ward: { required }
    }
  },
  computed: {
    provinces() {
      return this.$store.state.location.provinces || [];
    },
    districts() {
      return this.$store.state.location.districts || [];
    },
    wards() {
      return this.$store.state.location.wards || [];
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.user.first_name.$dirty) return errors;
      !this.$v.user.first_name.required &&
        errors.push("Họ không được để trống");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.user.last_name.$dirty) return errors;
      !this.$v.user.last_name.required && errors.push("Họ không được để trống");
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.user.gender.$dirty) return errors;
      !this.$v.user.gender.required &&
        errors.push("Giới tính không được để trống");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push("Email sai định dạng.");
      !this.$v.user.email.required && errors.push("Email không được để trống");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.user.phone.$dirty) return errors;
      !this.$v.user.phone.numeric && errors.push("Số điênh sai định dạng.");
      !this.$v.user.phone.required &&
        errors.push("Số điện thoại không được để trống");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.user.address.$dirty) return errors;
      !this.$v.user.address.required &&
        errors.push("Địa chỉ không được để trống");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.minLength &&
        errors.push("Mật khẩu phải có ít nhất 8 kí tự.");
      !this.$v.user.password.required &&
        errors.push("Mât khẩu không được để trống");
      return errors;
    },
    confirmPassErrors() {
      const errors = [];
      if (!this.$v.user.confirm_pass.$dirty) return errors;
      !this.$v.user.confirm_pass.minLength &&
        errors.push("Mật khẩu phải có ít nhất 8 kí tự.");
      !this.$v.user.confirm_pass.sameAsPassword &&
        errors.push("Mật khẩu không trùng");
      !this.$v.user.confirm_pass.required &&
        errors.push("Xác nhận mật khẩu không được để trống");
      return errors;
    },
    provinceErrors() {
      const errors = [];
      if (!this.$v.user.province.$dirty) return errors;
      !this.$v.user.province.required &&
        errors.push("Tỉnh, Thành phố không được để trống.");
      return errors;
    },
    districtErrors() {
      const errors = [];
      if (!this.$v.user.district.$dirty) return errors;
      !this.$v.user.district.required &&
        errors.push("Quận, huyện phố không được để trống.");
      return errors;
    },
    wardErrors() {
      const errors = [];
      if (!this.$v.user.ward.$dirty) return errors;
      !this.$v.user.ward.required &&
        errors.push("Phường, xã phố không được để trống.");
      return errors;
    }
  },
  watch: {
    "user.province": async function(val) {
      if (val) {
        try {
          await this.$store.dispatch("location/getDistrict", {
            provinceId: this.user.province
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    "user.district": async function(val) {
      if (val) {
        await this.$store.dispatch("location/getWard", {
          districtId: this.user.district
        });
      }
    }
  },
  async created() {
    await this.$store.dispatch("location/getProvince");
  },
  methods: {
    async submit() {
      this.$v.user.$touch();
      if (!this.$v.user.$anyError) {
        try {
          delete this.user.confirm_pass;
          await this.$store.dispatch("user/createUser", this.user);
          this.$v.user.$reset();
          this.user.first_name = "";
          this.user.last_name = "";
          this.user.gender = "";
          this.user.email = "";
          this.user.phone = "";
          this.user.province = "";
          this.user.district = "";
          this.user.ward = "";
          this.user.address = "";
          this.user.password = "";
          this.user.confirm_pass = "";
          this.registerDialogStatus(false);
        } catch (error) {
          alert("Email đã tồn tại vui lòng thử lại");
        }
      }
    },
    async close() {
      this.$v.user.$reset();
      this.user.first_name = "";
      this.user.last_name = "";
      this.user.gender = "";
      this.user.email = "";
      this.user.phone = "";
      this.user.province = "";
      this.user.district = "";
      this.user.ward = "";
      this.user.address = "";
      this.user.password = "";
      this.user.confirm_pass = "";
      this.registerDialogStatus(false);
    }
  }
};
</script>
