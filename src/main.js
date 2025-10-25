import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap JavaScript (optional - for interactive components)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import './index.css'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// Authentication guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const response = await fetch('/accounts/status')
      const data = await response.json()

      if (data.authenticated) {
        next()
      } else {
        // Redirect to backend login
        window.location.href = '/accounts/login?next=' + encodeURIComponent(to.fullPath)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      window.location.href = '/accounts/login?next=' + encodeURIComponent(to.fullPath)
    }
  } else {
    next()
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
