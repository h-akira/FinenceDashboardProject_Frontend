<template>
  <div id="app">
    <!-- Bootstrap Navbar -->
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">FinanceDashboard v1.0</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="ms-auto d-flex align-items-center">
            <template v-if="authStatus && authStatus.authenticated">
              <a href="/accounts/profile" class="btn btn-outline-light me-2">Profile</a>
              <a href="/accounts/logout" class="btn btn-outline-light">Logout</a>
            </template>
            <template v-else>
              <a href="/accounts/login" class="btn btn-outline-light">Login</a>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStatus = ref(null)

const checkAuthStatus = async () => {
  try {
    const response = await fetch('/accounts/status')
    authStatus.value = await response.json()
  } catch (error) {
    console.error('Auth status check failed:', error)
    authStatus.value = { authenticated: false }
  }
}

const handleRedirectAfterLogin = () => {
  // Check if there's a 'next' parameter in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const nextPath = urlParams.get('next')

  if (nextPath && authStatus.value && authStatus.value.authenticated) {
    // Remove the 'next' parameter from URL and navigate to the target path
    const url = new URL(window.location)
    url.searchParams.delete('next')
    window.history.replaceState({}, '', url.pathname + url.search)

    // Navigate to the target path using Vue Router
    router.push(nextPath || '/')
  }
}

onMounted(async () => {
  await checkAuthStatus()
  handleRedirectAfterLogin()
})
</script>

<style scoped>
.user-icon {
  font-size: 1.2rem;
}
</style>
