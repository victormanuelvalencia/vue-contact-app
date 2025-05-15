import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ContactsView from '../views/ContactsView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFoundView},
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView, name: 'login' },
  { path: '/register', component: RegisterView,name: 'register' },
  {
    path: '/home',
    component: HomeView,
    name: 'home'
  },
  {
    path: '/contacts',
    component: ContactsView,
    name: 'contacts'
  },
  {   path: '/user-profile', 
    component: UserProfileView, 
    name: 'user-profile', 
    meta: {
        secure: true
    }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
