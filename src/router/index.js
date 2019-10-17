import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
/*
import componentsRouter from './modules/components'

import tableRouter from './modules/table'
*/

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/shop',
    component: () => import('@/views/shop/index'),
    hidden: true
  },{
    path: '/cart',
    component: () => import('@/views/shop/cart'),
    hidden: true
  },{
    path: '/address',
    component: () => import('@/views/shop/address'),
    hidden: true
  },
  {
    path: '/product',
    component: () => import('@/views/shop/product'),
    hidden: true
  },
  {
    path: '/order',
    component: () => import('@/views/shop/order'),
    hidden: true
  },{
    path: '/demo',
    component: () => import('@/views/shop/demo'),
    hidden: true
  },
  {
    path: '/user',
    component: () => import('@/views/shop/user'),
    hidden: true
  },{
    path: '/addressList',
    component: () => import('@/views/shop/addressList'),
    hidden: true
  },{
    path: '/memberLogin',
    component: () => import('@/views/shop/login'),
    hidden: true
  },
  {
    path: '/productDetail',
    component: () => import('@/views/shop/productDetail'),
    hidden: true
  },
  {
    path: '/pay',
    component: () => import('@/views/shop/pay'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '我的', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
/*  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['lala', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },*/

  {
    path: '/product',
    component: Layout,
    redirect: 'noRedirect',
    name: '商品',
    meta: {
      title: '商品',
      icon: 'product'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/list'),
        name: '商品列表',
        meta: { title: '商品列表', noCache: true }
      },
      {
        path: 'brand',
        component: () => import('@/views/product/brand'),
        name: '商品品牌',
        meta: { title: '商品品牌', noCache: true }
      },
      {
        path: 'kind',
        component: () => import('@/views/product/kind'),
        name: "商品种类",
        meta: { title: '商品种类',noCache: true,roles:['admin']}
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: 'noRedirect',
    name: '订单',
    meta: {
      title: '订单',
      icon: 'product'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: '订单列表',
        meta: { title: '订单列表', noCache: true }
      },
      {
        path: 'returnList',
        component: () => import('@/views/order/returnList'),
        name: '退货申请处理',
        meta: { title: '退货申请处理', noCache: true }
      },
      {
        path: 'orderDetail',
        component: () => import('@/views/order/orderDetail'),
        name: '订单详情',
        meta: { title: '订单详情', noCache: true },
        hidden: true
      },
    ]
  },

  {
    path: '/sell',
    component: Layout,
    redirect: 'noRedirect',
    name: '营销',
    meta: {
      title: '营销',
      icon: 'sell'
    },
    children: [
      {
        path: 'brandRecommend',
        component: () => import('@/views/sell/brandRecommend'),
        name: '品牌推荐',
        meta: { title: '品牌推荐', noCache: true }
      },
      {
        path: 'brandRecommend',
        component: () => import('@/views/sell/goodRecommend'),
        name: '优选推荐',
        meta: { title: '优选推荐', noCache: true }
      },
      {
        path: 'brandRecommend',
        component: () => import('@/views/sell/hotRecommend'),
        name: '热门推荐',
        meta: { title: '热门推荐', noCache: true }
      },
      {
        path: 'brandRecommend',
        component: () => import('@/views/sell/newRecommend'),
        name: '新品推荐',
        meta: { title: '新品推荐', noCache: true }
      },
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'product'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: '会员管理',
        meta: { title: '会员管理', noCache: true }
      },
      {
        path: 'admin',
        component: () => import('@/views/admin/list'),
        name: '后台用户管理',
        meta: { title: '后台用户管理', noCache: true }
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: '角色管理',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: 'menu',
        component: () => import('@/views/admin/menu'),
        name: '菜单管理',
        meta: { title: '菜单管理', noCache: true }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
