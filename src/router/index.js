import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ContactsView from '../views/ContactsView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import AccountOptionsView from '../views/AccountOptionsView.vue'

const routes = [
  { path: '/:pathMatch(.*)*', component: NotFoundView },
  { path: '/', redirect: '/home' },
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView, name: 'register' },
  { path: '/home', component: HomeView, name: 'home' },
  { path: '/contacts', component: ContactsView, name: 'contacts', meta: { secure: true } },
  { path: '/user-profile', component: UserProfileView, name: 'user-profile', meta: { secure: true } },
  { path: '/account-options', component: AccountOptionsView, name: 'account-options' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem('isAuth') === 'true'
  if (to.meta.secure && !isAuth) {
    next({ name: 'account-options' })
  } else {
    next()
  }
})

export default router
