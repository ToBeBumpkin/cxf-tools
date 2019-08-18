import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/execl',
      name: 'execl',
      component: () => import('./views/Example/Execl.vue')
    },
    {
      path: '/pdddate',
      component: () => import('./views/Example/Pdddate.vue')
    },
    {
      path: '/demoaxios',
      component: () => import('./views/Example/DemoAxios.vue')
    },
    {
      path: '/mongo',
      component: () => import('./views/Example/Mongo.vue')
    },
    {
      path: '/beef',
      component: () => import('./views/Statistics/Beef.vue')
    }
  ]
})
