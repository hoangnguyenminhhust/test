import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

function checkRouteOrder(to, from, next) {
  if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).products.length > 0) {
    next()
  } else {
    next('/')
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Trang chủ',
    component: () => import('../layout/layout.vue'),
    redirect: '/',
    children: [
      {
        path: '',
        component: () => import('../views/Home.vue')
      },
      {
        name: 'Sản phẩm',
        path: '/category/:categoryId',
        component: () => import('../views/Product.vue')
      },
      {
        name: 'Chi tiết sản phẩm',
        path: '/product/:productId',
        component: () => import('../views/ProductDetail.vue')
      },
      {
        name: 'Giỏ hàng',
        path: '/cart',
        component: () => import('../views/Cart.vue')
      },
      {
        name: 'Thanh toán',
        path: '/order',
        beforeEnter: checkRouteOrder,
        component: () => import('../views/Order.vue')
      },
      {
        name: 'Thanh toán thành công',
        path: '/order-success',
        component: () => import('../views/OrderSuccess.vue')
      },
      {
        name: 'Lịch sử hoá đơn',
        path: '/order-history/:id',
        component: () => import('../views/OrderHistory.vue')
      },
      {
        name: 'Chi tiết hoá đơn',
        path: '/order/:id',
        component: () => import('../views/orderDetail.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  mode: "history",
  routes
})

export default router
