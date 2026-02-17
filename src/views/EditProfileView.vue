<template>
  <Navbar />

  <div class="d-flex">
    <Sidebar />

    <div class="profile-card p-5 rounded-4 shadow-lg bg-white w-100">

      <h4 class="fw-bold mb-4">Edit Profile</h4>

      <form @submit.prevent="handleSubmit">

        <div class="row">

          <div class="col-md-6 mb-3">
            <label class="form-label">First name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.firstName"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Last name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.lastName"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              v-model="form.email"
            
            />
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-primary">
            Save changes
          </button>

          <router-link
            to="/profile"
            class="btn btn-outline-secondary"
          >
            Cancel
          </router-link>
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useAuthStore } from '@/stores/Auth'
import api from '@/API/http'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  about: ''
})

onMounted(async () => {

  if (!auth.user) {
    await auth.profile()
  }

  const u = auth.user

  form.firstName = u.firstName || ''
  form.lastName  = u.lastName || ''
  form.email     = u.email || ''
  form.role      = u.role || ''
  form.company   = u.company || ''
  form.location  = u.location || ''
  form.about     = u.about || ''
})

async function handleSubmit() {
  try {

    const res = await api.put('/auth/profile', {
      firstName: form.firstName,
      lastName: form.lastName,
      role: form.role,
      company: form.company,
      location: form.location,
      about: form.about
    })

    auth.user = res.data.data

    router.push('/profile')

  } catch (err) {
    console.error(err)
  }
}
</script>

<style scoped>
.profile-card {
  max-width: 800px;
  margin: auto;
}
</style>
