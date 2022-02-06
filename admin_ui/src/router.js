import Vue from "vue";
import VueRouter from "vue-router";
import store from './store/index';
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

async function checkAuth(to, from, next) {
  if (localStorage.getItem('app_token')) {
    next()
  } else {
    next('/user/login')
  }
}

async function checkLogin(to, from, next) {
  if (localStorage.getItem('app_token')) {
    next('/app')
  } else {
    next()
  }
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // redirect: `${adminRoot}/piaf`,
    redirect: `${adminRoot}/dashboard`,
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/dashboard`,
    meta: { loginRequired: true },
    beforeEnter: checkAuth,
    /*
   define with Authorization :
   meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
   */
    children: [
      {
        path: "dashboard",
        component: () => import("./views/app/dashboard/Dashboard.vue"),
      },
      // {
      //   path: "piaf",
      //   component: () =>
      //     import(/* webpackChunkName: "piaf" */ "./views/app/piaf"),
      //   redirect: `${adminRoot}/piaf/start`,
      //   children: [
      //     {
      //       path: 'start',
      //       component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Start')
      //       // meta: { roles: [UserRole.Admin, UserRole.Editor] },
      //     }
      //   ]
      // },
      {
        path: "management",
        component: () => 
          import("./views/app/management"),
        redirect: `${adminRoot}/management/customer`,
        children: [
          { path: 'employee', component: () => import("./views/app/management/Employee.vue")},
          { path: 'customer', component: () => import("./views/app/management/Customer/Customer.vue")},
          { path: 'product', component: () => import("./views/app/management/Product/Product.vue")},
          { path: 'product/add-new', component: () => import("./views/app/management/Product/AddNewProduct.vue")},
          { path: 'product/:productId', component: () => import("./views/app/management/Product/EditNewProduct.vue")},
          { path: 'category', component: () => import("./views/app/management/Category/Category.vue")},
          { path: 'order', component: () => import("./views/app/management/Order/index.vue")},
          { name: 'order-detail', path: 'order/:orderId', component: () => import("./views/app/management/Order/OrderDetail.vue")},
          { path: 'banner', component: () => import("./views/app/management/Banner/index.vue")},
        ]
      }, 
      // {
      //   path: "second-menu",
      //   component: () =>
      //     import(/* webpackChunkName: "second-menu" */ "./views/app/second-menu"),
      //   redirect: `${adminRoot}/second-menu/second`,
      //   children: [
      //     { path: 'second', component: () => import(/* webpackChunkName: "piaf" */ './views/app/second-menu/Second') }
      //   ]
      // },


      // {
      //   path: "single",
      //   component: () =>
      //     import(/* webpackChunkName: "single" */ "./views/app/single")
      // }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    beforeEnter: checkLogin,
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
      },

    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;
