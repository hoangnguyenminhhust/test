<template>
  <v-row justify="center">
    <v-dialog
      v-model="changePassDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Đổi mật khẩu</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="oldPass"
                    label="Mật khẩu cũ"
                    type="password"
                    :error-messages="oldPassErrors"
                    required
                    @input="$v.oldPass.$touch()"
                    @blur="$v.oldPass.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="newPass"
                    label="Mật khẩu*"
                    type="password"
                    :error-messages="newPassErrors"
                    required
                    @input="$v.newPass.$touch()"
                    @blur="$v.newPass.$touch()"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confirmPass"
                    label="Xác nhận Mật khẩu*"
                    type="password"
                    :error-messages="confirmPassErrors"
                    required
                    @input="$v.confirmPass.$touch()"
                    @blur="$v.confirmPass.$touch()"
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
            @click="changePass()"
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  // eslint-disable-next-line vue/require-prop-types
  name: "ChangePassModal",
  mixins: [validationMixin],
  // eslint-disable-next-line vue/require-prop-types
  props: ["changePassDialog", "changePassDialogStatus"],
  data: () => ({
    oldPass: "",
    newPass: "",
    confirmPass: ""
  }),
  validations: {
    oldPass: {
      required,
      minLength: minLength(8)
    },
    newPass: {
      required,
      minLength: minLength(8)
    },
    confirmPass: {
      sameAsPassword: sameAs("newPass")
    }
  },
  computed: {
    oldPassErrors() {
      const errors = [];
      if (!this.$v.oldPass.$dirty) return errors;
      !this.$v.oldPass.required && errors.push("Mật khẩu không được để trống.");
      !this.$v.oldPass.minLength && errors.push("Mật khẩu ít nhất 8 kí tự");
      return errors;
    },
    newPassErrors() {
      const errors = [];
      if (!this.$v.newPass.$dirty) return errors;
      !this.$v.newPass.minLength &&
        errors.push("Mật khẩu phải có ít nhất 8 kí tự.");
      !this.$v.newPass.required && errors.push("Mât khẩu không được để trống");
      return errors;
    },
    confirmPassErrors() {
      const errors = [];
      if (!this.$v.confirmPass.$dirty) return errors;
      !this.$v.confirmPass.sameAsPassword &&
        errors.push("Xác nhận và mật khẩu không trùng");
      return errors;
    }
  },
  methods: {
    async changePass() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        try {
          await this.$store.dispatch('user/changePassword', {
            oldPass: this.oldPass,
            newPass: this.newPass,
          });
          this.oldPass = "";
      this.newPass = "";
      this.confirmPass = "";
          this.changePassDialogStatus(false)
        } catch (error) {
          alert('Có lỗi xảy ra');
        }
      }
    },
    close() {
      this.oldPass = "";
      this.newPass = "";
      this.confirmPass = "";
      this.changePassDialogStatus(false);
    }
  }
};
</script>
