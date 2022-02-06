<template>
  <v-row justify="center">
    <v-dialog
      v-model="loginDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Đăng nhập</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.email"
                    label="Email*"
                    :error-messages="emailErrors"
                    required
                    @input="$v.user.email.$touch()"
                    @blur="$v.user.email.$touch()"
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
                    @keyup.enter="login()"
                  />
                  <a @click="openForgotPasswordModal()">Quên mật khẩu?</a>
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
            @click="login()"
          >
            Đăng nhập
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="forgotPasswordDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Quên mật khẩu</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.email"
                    label="Email*"
                    :error-messages="emailForgotErrors"
                    required
                    @input="$v.form.email.$touch()"
                    @blur="$v.form.email.$touch()"
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
            @click="closeForgotPasswordDialog()"
          >
            Hủy
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit()"
          >
            Xác nhận
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  // eslint-disable-next-line vue/require-prop-types
  name: "LoginModal",
  mixins: [validationMixin],
  // eslint-disable-next-line vue/require-prop-types
  props: ["loginDialog", "loginDialogStatus"],
  data: () => ({
    user: {
      email: "",
      password: ""
    },
    forgotPasswordDialog: false,
    form: {
      email: "",
    }
  }),
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
    form: {
    email: {
      required,
      email
    }
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push("Email sai định dạng.");
      !this.$v.user.email.required && errors.push("Email không được để trống");
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
    emailForgotErrors() {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push("Email sai định dạng.");
      !this.$v.form.email.required && errors.push("Email không được để trống");
      return errors;
    }
  },
  methods: {
    async login() {
      this.$v.user.$touch();
      if (!this.$v.user.$anyError) {
        try {
          await this.$store.dispatch("user/login", this.user);
          this.user.email = "";
          this.user.password = "";
          this.$v.user.$reset();
          this.loginDialogStatus(false);
        } catch (error) {
          alert("Sai mật khẩu hoặc tài khoản vui lòng thử lại");
        }
      }
    },
    openForgotPasswordModal() {
      this.forgotPasswordDialog = true;
    },
    closeForgotPasswordDialog() {
      this.forgotPasswordDialog = false;
      this.email = "";
      this.$v.$reset();
    },
    async submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        try {
          await this.$store.dispatch("user/forgotPassword", {
            email: this.form.email
          });
          this.email = "";
          this.$v.$reset();
          this.forgotPasswordDialog = false;
          alert("Xác nhận thành công xin mời kiểm tra email");
        } catch (error) {
          alert("Có lỗi xảy ra xin vui lòng thử lại");
        }
      }
    },
    close() {
      this.user.email = "";
      this.user.password = "";
      this.$v.user.$reset();
      this.loginDialogStatus(false);
    }
  }
};
</script>
