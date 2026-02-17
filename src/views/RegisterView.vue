<template>
    <div class="background-container d-flex justify-content-center align-items-center">
        <div class="login-card p-4 shadow">

            <!-- Header -->
            <div class="d-flex align-items-center justify-content-center gap-2 mb-4">
                <!-- <div class="bg-white p-2 rounded">
        </div> -->
                <!-- <h5 class="mb-0 fw-semibold">Finance Advisor</h5> -->
            </div>

            <!-- Form -->
            <div class="glass-form p-4 text-center">
                <h4 class="fw-bold text-primary">Welcome</h4>
                <p class="text-muted small mb-4">Please Register to access your account</p>

                <form @submit.prevent="handleRegister">
                    <div>
                        <input type="text" class="form-control rounded-pill mb-3" placeholder="First Name" required
                            v-model="firstName" />
                        <input type="text" class="form-control rounded-pill mb-3" placeholder="Last Name" required
                            v-model="lastName" />
                    </div>
                    <!-- Email -->
                    <div class="mb-3 position-relative">
                        <input type="email" class="form-control rounded-pill" placeholder="Email" required
                            v-model="email" />
                    </div>

                    <!-- Password -->
                    <div class="mb-3 position-relative">
                        <input type="password" class="form-control rounded-pill" placeholder="Password" required
                            v-model="password" />
                    </div>
                    <div class="mb-3 position relative">
                        <input type="password" class="form-control rounded-pill mb-3" placeholder="Confirm Password" required
                            v-model="confirmPassword" />
                    </div>

                    <!-- Button -->
                    <button class="btn btn-primary w-100 rounded-pill py-2 fw-bold">
                        Register
                    </button>
                </form>

                <!-- Signup -->
                <p class="small mt-3">
                    Already have an account?
                    <router-link to="/login" class="fw-bold text-decoration-none">Sign In</router-link>
                </p>
            </div>
        </div>
    </div>

</template>
<script setup>
import router from '@/router/index.js'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/Auth'
let email = ref('')
let password = ref('')
let firstName = ref('')
let lastName = ref('')
let confirmPassword = ref('')
let auth = useAuthStore()

async function handleRegister() {
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }
    await auth.register(firstName.value, lastName.value, email.value, password.value, confirmPassword.value);
    router.push('/login');
}
</script>
<style scoped>
body {
    min-height: 100vh;
    background: linear-gradient(135deg, #a1c4fd, #c2e9fb);
}

.background-container {
    min-height: 100vh;
    background: radial-gradient(circle at top left, #8191f1, transparent),
        radial-gradient(circle at bottom right, #f1a7f1, transparent);
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
}

.input-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #4a69bd;
}

.form-control {
    padding-left: 45px;
}

.btn-primary {
    background: linear-gradient(to right, #4bc0c8, #6a11cb);
    border: none;
}
</style>