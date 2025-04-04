import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4fe68fde = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _f6dd40c2 = () => interopDefault(import('../pages/posts/new.vue' /* webpackChunkName: "pages/posts/new" */))
const _d43fece6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _70db8ab9 = () => interopDefault(import('../pages/posts/_id.vue' /* webpackChunkName: "pages/posts/_id" */))
const _5e62fd60 = () => interopDefault(import('../pages/posts/_id/edit.vue' /* webpackChunkName: "pages/posts/_id/edit" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/posts",
    component: _4fe68fde,
    name: "posts"
  }, {
    path: "/posts/new",
    component: _f6dd40c2,
    name: "posts-new"
  }, {
    path: "/",
    component: _d43fece6,
    name: "index"
  }, {
    path: "/posts/:id",
    component: _70db8ab9,
    name: "posts-id",
    children: [{
      path: "edit",
      component: _5e62fd60,
      name: "posts-id-edit"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
