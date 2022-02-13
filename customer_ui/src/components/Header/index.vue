<template>
  <v-main
    style="background-image: url('../../assets/images/logo/logo-back.png')"
  >
    <v-row class="d-flex justify-content-between align-items-center">
      <v-container class="pa-0 pt-1" style="height: 87px">
        <div class="d-flex justify-space-between">
          <div class="drawer">
            <v-app-bar-nav-icon @click="drawer = !drawer" />
          </div>
          <div class="wrapper" @click="$router.push('/')">
            <div class="logo mt-2 d-flex align-center">
              <img height="70px" src="../../assets/images/logo/logo-back.png" />
              <div>
                <p
                  class="ma-0"
                  style="
                    font-family: monospace;
                    text-align: left;
                    text-indent: 0px;
                    font-size: 27px;
                    letter-spacing: -2px;
                  "
                >
                  Sàn mua bán
                </p>
                <p
                  class="ma-0"
                  style="
                    font-family: monospace;
                    text-align: left;
                    font-size: 15px;
                    text-indent: 0px;
                    letter-spacing: -2px;
                  "
                >
                  trao đổi điện thoại
                </p>
              </div>
            </div>
          </div>
          <div class="d-flex align-center">
            <div class="d-flex">
              <div v-if="user">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      v-bind="attrs"
                      class="header_icon"
                      v-on="on"
                      @click="profileDialog = true"
                    >
                      <v-icon> mdi-account </v-icon>
                    </v-btn>
                  </template>
                  <span>Profile</span>
                </v-tooltip>
              </div>
              <div v-if="!user">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      v-bind="attrs"
                      class="header_icon"
                      v-on="on"
                      @click="loginDialog = true"
                    >
                      <v-icon> mdi-account </v-icon>
                    </v-btn>
                  </template>
                  <span>Đăng nhập</span>
                </v-tooltip>
              </div>
              <div v-if="!user">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      v-bind="attrs"
                      class="header_icon"
                      v-on="on"
                      @click="registerDialog = true"
                    >
                      <v-icon> mdi-account-plus </v-icon>
                    </v-btn>
                  </template>
                  <span>Đăng kí</span>
                </v-tooltip>
              </div>
              <div v-if="user">
                <v-menu :offset-x="true" left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" class="header_icon" v-on="on">
                      <v-icon> mdi-chevron-down </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn text @click="changePassDialog = true">
                          Đổi mật khẩu
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <v-btn text width="100%" @click="logout()">
                          Đăng xuất
                        </v-btn>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      v-bind="attrs"
                      class="header_icon"
                      @click="$router.push({ path: '/cart' })"
                      v-on="on"
                    >
                      <v-badge bordered color="orange" :content="cartNumber">
                        <v-icon> mdi-cart </v-icon>
                      </v-badge>
                    </v-btn>
                  </template>
                  <span>Giỏ hàng</span>
                </v-tooltip>
              </div>
            </div>
          </div>
        </div>
        <v-navigation-drawer
          v-model="drawer"
          fixed
          temporary
          class="navigation"
        >
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a href="/">Trang chủ</a>
              </v-list-item-title>
            </v-list-item>
            <v-list-group :value="false">
              <template v-slot:activator>
                <v-list-item-title>
                  <a>Sản phẩm</a>
                </v-list-item-title>
              </template>
              <v-list-item v-for="category in categories" :key="category._id">
                <v-list-item-title>
                  <a
                    :href="`/category/${category._id}`"
                    style="padding: 20px"
                    >{{ category.name }}</a
                  >
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item>
              <v-list-item-title>
                <a
                  @click="$router.push({ path: `/order-history/${orderUser}` })"
                  >Hoá đơn</a
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <login-modal
          :login-dialog="loginDialog"
          :login-dialog-status="loginModalStatus"
        />
        <register-modal
          :register-dialog="registerDialog"
          :register-dialog-status="registerModalStatus"
        />
        <profile-modal
          :profile-dialog="profileDialog"
          :profile-dialog-status="profileModalStatus"
        />
        <change-pass-modal
          :change-pass-dialog="changePassDialog"
          :change-pass-dialog-status="changePassModalStatus"
        />
      </v-container>
    </v-row>
    <v-divider></v-divider>
    <v-row class="ma-0 d-flex justify-content-between align-items-center">
      <v-col cols="12" md="3" offset="1" class="pa-0">
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              class="pa-0"
              color="primary"
              text
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-format-list-bulleted-square </v-icon>
              Danh mục sản phẩm
            </v-btn>
          </template>
          <v-list>
            <v-row style="width: 400px" align="center" dense>
              <v-list-item
                v-for="(item, index) in categories"
                :key="index"
                dense
                link
              >
                <v-col class="pa-0" cols="6" md="4" offset="0">
                  {{ item.name }}
                </v-col>
                <v-col class="pa-0" cols="6" md="8" offset="0">
                  <v-list>
                    <v-list-item
                      v-for="(item2, index2) in item.category"
                      :key="index2"
                      @click="routeCategory(item2._id)"
                      dense
                      link
                    >
                      <v-list-item-title v-text="item2.name" />
                    </v-list-item> </v-list
                ></v-col>
              </v-list-item>
            </v-row>
          </v-list>
        </v-menu>
      </v-col>
      <v-col cols="12" md="3" offset="0" class="pa-0">
        <v-btn
          small
          class="pa-0"
          color="primary"
          @click="$router.push({ path: `/order-history/${orderUser}` })"
          text
        >
          Hoá đơn
        </v-btn>
      </v-col>
      <v-col cols="12" md="3" offset="2" class="pa-0">
        <v-btn small class="pa-0" color="primary" text>
          <v-icon dark> mdi-magnify </v-icon>
          <v-autocomplete
            dense
            full-width
            placeholder="Tìm kiếm"
          ></v-autocomplete>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-main>
</template>

<script>
import loginModal from "./loginModal";
import registerModal from "./registerModal";
import profileModal from "./profileModal";
import changePassModal from "./changePassModal";
export default {
  name: "Header",
  components: {
    loginModal,
    registerModal,
    profileModal,
    changePassModal,
  },
  data: () => ({
    drawer: false,
    w: window.innerWidth,
    menuStatus: false,
    loginDialog: false,
    registerDialog: false,
    profileDialog: false,
    changePassDialog: false,
    menu: ["Trang chủ", "Sản phẩm"],
  }),
  computed: {
    cartNumber() {
      return this.$store.state.cart.cartCount.toString();
    },
    categories() {
      return this.$store.state.category.categories;
    },
    user() {
      return this.$store.state.user.user;
    },
    orderUser() {
      return this.$store.state.user.deviceId;
    },
  },
  watch: {
    w: function (val) {
      if (val > 968) {
        this.drawer = false;
        this.menuStatus = true;
      } else {
        this.menuStatus = false;
      }
    },
  },
  mounted() {
    window.onresize = () => {
      this.w = window.innerWidth;
    };
  },
  async created() {
    await this.$store.dispatch("category/getAllCategory");
  },
  methods: {
    loginModalStatus(value) {
      this.loginDialog = value;
    },
    registerModalStatus(value) {
      this.registerDialog = value;
    },
    profileModalStatus(value) {
      this.profileDialog = value;
    },
    changePassModalStatus(value) {
      this.changePassDialog = value;
    },
    async routeCategory(id) {
      this.$router.push({ path: `/category/${id}` });
      await this.$store.dispatch("product/getProductByCategory", {
        categoryId: id,
      });
    },
    logout() {
      const result = confirm("Bạn có chắc chắn muốn đăng xuất?");
      if (result) this.$store.dispatch("user/logout");
    },
  },
};
</script>

<style lang="scss">
.logo {
  display: block;
}
.header {
  position: relative;
  z-index: 6;
}
.drawer {
  display: none !important;
}
.header_dropdown {
  display: none !important;
}

@media only screen and (max-width: 968px) {
  .drawer {
    display: inline-flex !important;
    align-items: center;
  }
  .menu {
    display: none !important;
  }
  .icons {
    margin: 0px;
    float: right;
  }
  .header_dropdown {
    display: initial !important;
  }

  .logo {
    margin: auto;
    width: 50%;
  }
}
</style>