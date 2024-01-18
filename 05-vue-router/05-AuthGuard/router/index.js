import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),

  routes: [
    {
      path: '/',
      name: 'index',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      name: 'login',
      query: {
        from: null
      },
      meta: {
        requireGuest: true,
        requireAuth: false,

      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
        requireAuth: false,

      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        requireGuest: false,
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireGuest: false,
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!isAuthenticated()) {
    if (to.meta.requireGuest === false) 
    next({
        name: 'login',
        query: { from: to.fullPath },
    })
    else next()
  }
  if (isAuthenticated()) {
    if (to.meta.requireAuth === false) 
    next({ 
      name: 'index' 
    })
    else next() 
  }
})



export { router };
