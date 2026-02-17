<template>
  <div class="background-container d-flex justify-content-center align-items-center">
    <div class="login-card p-4 shadow">

      <div class="glass-form p-4 text-center">
        <h4 class="fw-bold text-primary">Welcome Back</h4>
        <p class="text-muted small mb-4">Please log in to continue.</p>

        <form @submit.prevent="handleLogin">

          <!-- Email -->
          <div class="mb-3 position-relative">
            <input
              type="text"
              class="form-control rounded-pill"
              placeholder="Email"
              v-model="email"
            />
            <p v-if="err.email" class="text-danger small ms-3 text-start">{{ err.email }}</p>
          </div>

          <!-- Password -->
          <div class="mb-3 position-relative">
            <input
              type="password"
              class="form-control rounded-pill"
              placeholder="Password"
              v-model="password"
            />
            <p v-if="err.password" class="text-danger small ms-3 text-start">{{ err.password }}</p>
          </div>

          <!-- Options -->
          <div class="d-flex justify-content-between align-items-center mb-3 small">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" checked />
              <label class="form-check-label">Remember me</label>
            </div>
            <a href="#" class="text-decoration-none">Forgot password?</a>
          </div>

          <!-- Button -->
          <button
            type="submit"
            class="btn btn-primary w-100 rounded-pill py-2 fw-bold"
            :disabled="isLoading"
          >
            <div v-if="isLoading" class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else>
              Log In
            </div>
          </button>
        </form>

        <!-- Signup -->
        <p class="small mt-3">
          Don’t have an account?
          <router-link to="/register" class="fw-bold text-decoration-none">Sign Up</router-link>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/Auth'
import { required, isEmail, validate } from '@/utils/Validate.js'
import { nofity } from '@/utils/toast'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const auth = useAuthStore()

const err = reactive({
  email: '',
  password: ''
})

// Form validation
function validator() {
  err.email = validate(email.value, [
    v => required(v, 'Email is required'),
    v => isEmail(v, 'Invalid email format')
  ])

  err.password = required(password.value, 'Password is required')

  return !err.email && !err.password
}

// Login handler
async function handleLogin() {
  if (isLoading.value) return
  if (!validator()) return

  isLoading.value = true

  try {
    await auth.login(email.value, password.value)
    nofity.success('Login successfully', '/')
  } catch (e) {
    const message = e?.response?.data?.message || 'Email or password is incorrect'
    nofity.error(message)

    setTimeout(() => {
      isLoading.value = false
    }, 2500)

    return
  }

  // only enable after successful login
  isLoading.value = false
}
</script>

<style scoped>
.background-container {
  min-height: 100vh;
  background: radial-gradient(circle at top left, #8191f1, transparent),
              radial-gradient(circle at bottom right, #f1a7f1, transparent);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 380px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(15px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-form {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  padding: 2rem;
}

.form-control {
  padding-left: 45px;
}

.btn-primary {
  background: linear-gradient(to right, #4bc0c8, #6a11cb);
  border: none;
}
</style>
