import {defineStore} from 'pinia';
import {ref, computed } from 'vue';
import api from '@/API/http';

export const useAuthStore = defineStore('auth',() => {
    let user = ref(null);
    let token = ref(localStorage.getItem('token')); //reusedvairiable
    let isLoggedIn = computed(() => !!token.value);

    async function  login(email, password) {
       try{
        const res = await api.post('/auth/login' , {email , password})
        console.log(res)
        user.value = res.data.data.user;
        token.value = res.data.data.token;
        localStorage.setItem('token' , token.value);
    } catch (error) {
        throw error.response
    }
    }

    async function logout(){
        let res = await api.delete('/auth/logout');
        console.log(res);
        user.value = null;
        token.value = null;
        localStorage.removeItem('token');

    }
    async function register(firstName, lastName, email, password, confirmPassword){
    const res = await api.post('/auth/register', {firstName, lastName, email, password, confirmPassword})
    console.log(res)
    user.value = res.data.data.user;
    token.value = res.data.data.token;
    localStorage.setItem('token', token.value);
}
    async function profile() {
    const res = await api.get('/auth/profile')

    user.value = res.data.data
    return res.data.data
  }

    return{ user, token, isLoggedIn , login , logout , register, profile}
})