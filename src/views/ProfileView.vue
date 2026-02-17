<template>
  <Navbar />
  <div class="d-flex">
    <Sidebar />


    <div class="profile-card p-5 rounded-4 shadow-lg bg-white container-fluid">
      <!-- Avatar & name -->
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="profile-pic-wrapper position-relative">
          <img
            :src="avatar"
            class="rounded-circle border border-white shadow-sm"
            width="100"
            height="100"
          />

          <button
            class="camera-btn position-absolute bottom-0 end-0 bg-success rounded-circle border-0 p-2"
          >
          
            <i class="bi bi-camera-fill text-white"></i>
          </button>
        </div>

        <div>
          <h2 class="fw-bold mb-1">
            {{ firstName }} {{ lastName }}
          </h2>
          <div class="text-muted">
            User ID :  {{ id }}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="d-flex gap-2 mb-3">
        <router-link to="/editProfile" class="btn btn-outline-dark">Edit Profile</router-link>
        <router-link to="/" class="btn btn-outline-secondary">View Article</router-link>
      </div>

      <!-- Info -->
      <div class=" align-items-center gap-3 mb-3 flex-wrap">
        <div class="text-success">
          <i class="bi bi-globe me-1"></i> Email :  {{ email }}
        </div><br>
        <div class="text-purple">
          <i class="bi bi-clock-history me-1"></i>
          Joined : {{ new Date(registeredAt).toLocaleDateString()}}
        </div>
      </div>

      <!-- About -->

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import { useAuthStore } from '@/stores/Auth'
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.user) {
    await auth.profile()
  }
})

const user = computed(() => auth.user || {})

const avatar = computed(() =>
  user.value.avatar || 'https://i.pravatar.cc/150'
)

const firstName = computed(() => user.value.firstName || '')
const lastName  = computed(() => user.value.lastName || '')
const email     = computed(() => user.value.email || '')
const id   = computed(() => user.value.id || '-')
const registeredAt = computed(()=> user.value.registeredAt || '-')
</script>

<style scoped>
.profile-card {
  max-width: 800px;
  margin: auto
}

.profile-pic-wrapper {
  width: 100px;
  height: 100px;
}

.camera-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-purple {
  color: #a67ff3;
}
</style>
