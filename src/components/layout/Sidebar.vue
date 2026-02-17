<template>
    <div class="sidebar p-3">
      <h5 class="text-white mb-4">Admin Panel</h5>
      <router-link to="/"  href="#"><i class="bi bi-speedometer2 me-2"></i> Dashboard</router-link>
      <router-link to="/articles" href="#" class="nav-link"><i class="bi bi-file-earmark-text me-2"></i> Articles</router-link>
      <router-link to="/profile" href="#"><i class="bi bi-people me-2"></i> Users</router-link>
      <router-link to="/category" href="#"><i class="bi bi-tags me-2"></i> Categories</router-link>
      <a href="#"><i class="bi bi-gear me-2"></i> Settings</a>
      <hr class="border-secondary" />
      <button @click="handleLogout" class="btn btn-danger"><i class="bi bi-box-arrow-left me-2"></i> Logout</button>
    </div>

</template>
<script setup>
import { useAuthStore } from '@/stores/Auth';
import router from '@/router/index.js'
let auth = useAuthStore();
async function handleLogout() {
   auth.logout();
  router.push('/login');
  }
</script>
<style scoped>
 .sidebar {
      width: 240px;
      min-height: 100vh;
      background: #111827;
    }

</style>