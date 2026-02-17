
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3 ">
        <div class="container-fluid ">
            <span class="navbar-brand fw-bold">📰 Finance Advisor</span>
            <div class="d-flex align-items-center gap-3">
                <div data-bs-toggle="dropdown" aria-expanded="false" class="dropdown ">
                    <!-- <img :src="avatar" class="rounded-circle w-25 h-25 m-auto" 
                     /> -->
                    <ul class="dropdown-menu ">
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <!-- <li><router-link to="/logout" class="dropdown-item" href="#">Login</router-link></li> -->
                        <li><a class="dropdown-item" href="#">Dashboard</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav> 
</template>
<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/Auth'

const auth = useAuthStore()

const avatar = computed(() => {
  return auth.user?.avatar || 'https://i.pravatar.cc/150'
})
</script>
