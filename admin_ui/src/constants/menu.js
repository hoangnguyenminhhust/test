import { adminRoot } from "./config";
import { UserRole } from "../utils/auth.roles";

const data = [{
  id: "dashboard",
  icon: "iconsminds-shop",
  label: "menu.dashboard",
  to: `${adminRoot}/dashboard`,
},
{
  id: "management",
  icon: "iconsminds-management",
  label: "menu.management",
  to: `${adminRoot}/management`,
  subs: [
    {
      icon: "iconsminds-business-mens",
      label: "menu.employee",
      to: `${adminRoot}/management/employee`,
      roles: [UserRole.Admin],
    },
    {
      icon: "iconsminds-business-mens",
      label: "menu.customer",
      to: `${adminRoot}/management/customer`
    },
    {
      icon: "iconsminds-cart-quantity",
      label: "menu.product",
      to: `${adminRoot}/management/product`
    },
    {
      icon: "iconsminds-posterous",
      label: "menu.category",
      to: `${adminRoot}/management/category`
    },
    {
      icon: "iconsminds-calendar-4",
      label: "menu.order",
      to: `${adminRoot}/management/order`
    },
    {
      icon: 'iconsminds-tv',
      label: 'menu.banner',
      to: `${adminRoot}/management/banner`
    }
  ]
},
// {
//   id: "second-menu",
//   icon: "iconsminds-chemical",
//   label: "menu.second-menu",
//   to: `${adminRoot}/second-menu`,
//   subs: [{
//     icon: "simple-icon-paper-plane",
//     label: "menu.second",
//     to: `${adminRoot}/second-menu/second`,
//   },
//   ]
// },
// {
//   id: "pages",
//   icon: "iconsminds-digital-drawing",
//   label: "menu.pages",
//   to: "/user/login",
//   subs: [{
//     icon: "simple-icon-user-following",
//     label: "menu.login",
//     to: "/user/login",
//     newWindow: true
//   }, {
//     icon: "simple-icon-user-follow",
//     label: "menu.register",
//     to: "/user/register",
//     newWindow: true
//   }, {
//     icon: "simple-icon-user-unfollow",
//     label: "menu.forgot-password",
//     to: "/user/forgot-password",
//     newWindow: true
//   },
//   {
//     icon: "simple-icon-user-following",
//     label: "menu.reset-password",
//     to: "/user/reset-password",
//     newWindow: true
//   }
//   ]
// },
// {
//   id: "single",
//   icon: "iconsminds-three-arrow-fork",
//   label: "menu.single",
//   to: `${adminRoot}/single`,
// },
// {
//   id: "docs",
//   icon: "iconsminds-library",
//   label: "menu.docs",
//   to: "https://piaf-vue-docs.coloredstrategies.com/",
//   newWindow: true
// }
];
export default data;
