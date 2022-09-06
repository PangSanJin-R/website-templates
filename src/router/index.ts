import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { basicRoutes as routes } from './routes'

const isHash = import.meta.env.VITE_USE_HASH === 'true'
/** 创建 Router 实例 */
export const router = createRouter({
  history: isHash ? createWebHashHistory('/') : createWebHistory('/'),
  routes,
  /** 在页面之间导航时控制滚动的函数,可以返回一个 Promise 来延迟滚动 */
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    router.hasRoute(name!) && router.removeRoute(name!)
  })
  routes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route)
  })
}

export function setupRouter(app: App) {
  app.use(router)
}
