import {defineStore} from 'pinia';
import {reactive, ref} from 'vue';
import api from '@/API/http';
export const useCategoryStore = defineStore('category',() => {
    let categories = ref([])
    let pagination = reactive({
        currentPage: 1,
        itemPerPage: 3,
        totalItems: 0,
        totalPages: 0,
        hasPreviousPage: false,
        hasNextPage: true


    })

    async function fetchCategories(page, per_page){
        let res = await api.get(`/categories?_page=${page}&_per_page=${per_page}`);
        categories.value = res.data.data.items;
            pagination.totalItems = res.data.data.meta.totalItems
            pagination.totalPages = res.data.data.meta.totalPages
            pagination.currentPage = res.data.data.meta.currentPage
            pagination.hasPreviousPage = res.data.data.meta.hasPreviousPage
            pagination.hasNextPage = res.data.data.meta.hasNextPage



    }
    return { categories, fetchCategories, pagination};
})
