import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
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
    path: '/login',
    component: () => import('@/views/login/index2'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      name: 'Trang cá nhân',
      component: () => import('@/views/profile/index'),
      meta: {title: 'Trang cá nhân'}
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/post/index',
    children: [
      {
        path: '/post/index',
        component: () => import('@/views/post/index'),
        name: 'Loạt bài',
        meta: {title: 'Loạt bài', icon: 'table'}
      },
      {
        path: '/post/detail/:id',
        component: () => import('@/views/post-detail/index'),
        name: 'Chi tiết',
        hidden: true,
        meta: {title: 'Chi tiết'}
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Đơn hàng',
        component: () => import('@/views/order/index'),
        meta: {title: 'Đơn hàng'}
      }
    ]
  },
  {
    path: '/confirm-order-information',
    component: Layout,
    redirect: '/confirm-order-information/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Xác nhận thông tin',
        component: () => import('@/views/confirm-order-information/index'),
        meta: {title: 'Xác nhận thông tin'}
      },
      {
        path: 'result/:code',
        name: 'Kết quả thanh toán',
        component: () => import('@/views/confirm-order-information/components/payment-result'),
        meta: {title: 'Kết quả thanh toán'}
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    meta: {roles: ['admin']},
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },
  {
    path: '/create-farm',
    component: Layout,
    redirect: 'create-farm/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/create-farm/index'),
        name: 'Đăng ký vườn mới',
        meta: {title: 'Đăng ký vườn mới', icon: 'el-icon-edit'}
      }
    ]
  },
  {
    path: '/create-post',
    redirect: '/create-post/index',
    component: Layout,
    meta: {roles: ['farmer']},
    children: [
      {
        path: 'index',
        name: 'Viết bài',
        component: () => import('@/views/create-post/index'),
        meta: {title: 'Viết bài', icon: 'form'}
      }
    ]
  },
  {
    path: '/farm',
    component: Layout,
    redirect: '/farm/index',
    meta: {roles: ['farmer']},
    children: [
      {
        path: 'index',
        component: () => import('@/views/farm/index'),
        name: 'Quản lý vườn',
        meta: {title: 'Quản lý vườn', icon: 'tree'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
