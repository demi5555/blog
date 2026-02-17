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

                        <h5 class="fw-bold mb-3">Edit Article</h5>

                        <form @submit.prevent="handleEdit">

                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter article title"
                                    v-model="form.title"
                                />
                            </div>

                            <!-- Category -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-select" v-model="form.categoryId">
                                    <option disabled value="">Choose category</option>
                                    <option
                                        v-for="category in categoryStore.categories"
                                        :key="category.id"
                                        :value="category.id"
                                    >
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>

                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input
                                    type="file"
                                    class="form-control"
                                    @change="handleFile"
                                />
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea
                                    class="form-control"
                                    rows="5"
                                    v-model="form.content"
                                    placeholder="Write your article content..."
                                ></textarea>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <router-link to='/articles' type="reset" class="btn btn-outline-danger">
                                    Cancel
                                </router-link>
                                <button type="submit" class="btn btn-primary">
                                    Update Article
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
import { useArticleStore } from '@/stores/article'
import api from '@/API/http'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore()
let id = route.params.id;
let file = ref(null);
const form = ref({
    title: '',
    categoryId: '',
    content: ''
})
onMounted(async () => {
     categoryStore.fetchCategories(1,100)
     try{
        let res = await api.get(`/articles/${id}`);
        let article = res.data.data; 
        form.value.title = article.title;
        form.value.categoryId = article.category.id;
        form.value.content = article.content;
     }catch(error){
        console.error( error);
     }
})
// const handleEdit = async () => {
//         // console.log(res);

//     try{
//         let res = await api.put(`/articles/${articleID.value}`, form.value);
//         let articleID = res.data.data.id;
//         console.log(res.data.data.id);

//         console.log(file.value);
//     if(file.value){
//     let formData = new FormData();
//     formData.append('thumbnail', file.value);
//     let res = api.post(`/articles/${articleID}/thumbnail`, formData);
//     console.log(res);
//     }
//     }catch(error){
//         console.error( error);
// }}
// async function handleEditArticle(id){
//     alert('Edit article with ID: ' + id);
//     let res = await api.put('/articles/' + id, form.value);
//     await articleStore.fetchOwnedArticles();

// }
const handleEdit = async () => {
    try {
        const res = await api.put(`/articles/${id}`, form.value);
        console.log(res);
        // const articleID = res.data.data.id

        // 2. upload thumbnail (if exists)
        if (file.value) {
            const formData = new FormData()
            formData.append('thumbnail', file.value)

            await api.post(`/articles/${id}/thumbnail`, formData)
        }

        // 3. go back to articles page
        router.push('/articles')

    } catch (error) {
        console.error(error)
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
