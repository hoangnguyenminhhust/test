<template>
  <v-row justify="center">
    <v-dialog
      v-if="user"
      v-model="profileDialog"
      persistent
      max-width="600"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Thông tin cá nhân</span>
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
            @click="save()"
          >
            Lưu
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
  mixins: [validationMixin],
  // eslint-disable-next-line vue/require-prop-types
  props: ["profileDialog", "profileDialogStatus"],
  data: () => ({
    // user: {
    //   first_name: "",
    //   last_name: "",
    //   gender: "",
    //   email: "",
    //   phone: "",
    //   address: "",
    //   role: "customer",
    //   province: "",
    //   district: "",
    //   ward: ""
    // }
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
      province: { required },
      district: { required },
      ward: { required }
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user;
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
        try {
          await this.$store.dispatch("location/getWard", {
            districtId: this.user.district
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  async created() {
    if (this.user) {
      await Promise.all([
      this.$store.dispatch("location/getProvince"),
      await this.$store.dispatch("location/getDistrict", {
        provinceId: this.user.province
      }),
      await this.$store.dispatch("location/getWard", {
            districtId: this.user.district
      })
    ]);
    }
  },
  methods: {
    async save() {
      this.$v.user.$touch();
      if (!this.$v.user.$anyError) {
        try {
          await this.$store.dispatch("user/updateUser", this.user);
          this.profileDialogStatus(false);
          alert("Lưu thành công");
        } catch (error) {
          alert("Email đã tồn tại vui lòng thử lại");
        }
      }
    },
    async close() {
      await this.$store.dispatch('user/getUser');
      this.profileDialogStatus(false);
    }
  }
};
</script>
