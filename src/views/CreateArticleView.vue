<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
        <div class="container-fluid ">
            <span class="navbar-brand fw-bold">📰 Article Dashboard</span>
            <div class="d-flex align-items-center gap-3"></div>
        </div>
    </nav>

    <div class="d-flex ">
        <Sidebar />
        <div class="flex-grow-1 content">
            <div class="row justify-content-center mb-4">
                <div class="col-12 col-md-10 col-lg-6">
                    <div class="card p-4 glass-form shadow-sm">

                        <h5 class="fw-bold mb-3">Create New Article</h5>

                        <form @submit.prevent="handleCreate">

                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input type="text" class="form-control" placeholder="Enter article title"
                                    v-model="form.title" />
                            </div>
                            <small class="text-danger">{{ errors.title }}</small>

                            <!-- Category -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-select" v-model="form.categoryId">
                                    <option disabled value="">Choose category</option>
                                    <option v-for="category in categoriesStore.categories" :key="category.id"
                                        :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                                <small class="text-danger">{{ errors.categoryId }}</small>

                            </div>

                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input type="file" class="form-control" @change="handleFile" />
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" rows="5" v-model="form.content"
                                    placeholder="Write your article content..."></textarea>
                                <small class="text-danger">{{ errors.content }}</small>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <router-link to='/articles' type="reset" class="btn btn-outline-danger">
                                    Cancel
                                </router-link>
                                <button type="submit"
                                    class="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2 submit-btn"
                                    :disabled="isLoading">
                                    <span v-if="isLoading" class="d-inline-flex align-items-center gap-2">
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                        Saving...
                                    </span>

                                    <span v-else>
                                        Published
                                    </span>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/stores/category'
import api from '@/API/http'
import router from '@/router/index.js'
import { validateArticle, hasError } from '@/utils/Validate'
import { nofity } from '@/utils/toast'


const categoriesStore = useCategoryStore()

const file = ref(null)
const isSubmitting = ref(false)
const submitted = ref(false)
let isLoading = ref(false)
const form = ref({
    title: '',
    categoryId: '',
    content: ''
})
const errors = ref({
    title: '',
    categoryId: '',
    content: ''
})


onMounted(async () => {
    await categoriesStore.fetchCategories(1, 100)
})

const handleCreate = async () => {

    submitted.value = true
    errors.value = validateArticle(form.value)
    if (isLoading.value) return
    isLoading = true;
    if (hasError(errors.value)) {
        return
    }

    try {
        isSubmitting.value = true

        const res = await api.post('/articles', form.value)
        nofity.success('Published Successfully', '/articles')
        const articleID = res.data.data.id

        if (file.value) {
            const formData = new FormData()
            formData.append('thumbnail', file.value)
            await api.post(`/articles/${articleID}/thumbnail`, formData)
        }
        router.push('/articles')
    } catch (error) {
        console.error(error)
    } finally {
        isSubmitting.value = false
    }
}
const handleFile = (event) => {
    const selectFile = event.target.files[0]

    if (selectFile) {
        file.value = selectFile
    }
}
</script>

<style scoped>
.glass-form {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 25px;
}

.btn-primary {
    background: linear-gradient(to right, #4bc0c8, #6a11cb);
    border: none;
}
</style>
