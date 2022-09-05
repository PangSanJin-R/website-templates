import type { RouteModule, RouteType, RoutesType } from '@/types/router'

export const basicRoutes: RoutesType = [
  {
    name: 'Dashboard',
    path: '/',
    redirect: '/workbench',
    meta: {
      order: 0,
    },
    children: [
      {
        name: 'Workbench',
        path: 'workbench',
        component: () => import('@/views/workbench/index.vue'),
        meta: {
          title: '工作台',
          icon: 'mdi:home',
        },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },

  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },
  {
    name: 'ExternalLink',
    path: '/external-link',
    meta: {
      title: '外部链接',
      icon: 'mdi:link-variant',
      order: 3,
    },
    redirect: '/external-link/github',
    children: [
      {
        name: 'LinkGithubSrc',
        // path: 'https://github.com/zclzone/qs-admin',
        path: "github",
        component: () => import('@/views/externalLink/github.vue'),
        meta: {
          title: '源码 - github',
          icon: 'mdi:github',
        },
      },
      {
        name: 'LinkGiteeSrc',
        // path: 'https://gitee.com/zclzone/qs-admin-ts',
        path: "gitee",
        component: () => import('@/views/externalLink/gitee.vue'),
        meta: {
          title: '源码 - gitee',
          icon: 'simple-icons:gitee',
        },
      },
    ],
  },
  {
    name: "demo",
    path: "/demo",
    component: () => import("@/views/demo/index.vue"),
    meta: {
      title: '测试页面',
      icon: 'twemoji:beaming-face-with-smiling-eyes',
      order: 1,
    },
  }
]

export const NOT_FOUND_ROUTE: RouteType = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

const modules = import.meta.glob('@/views/**/route.ts', { eager: true }) as RouteModule
const asyncRoutes: RoutesType = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default)
})

export { asyncRoutes }
