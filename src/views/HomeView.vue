<template>
  <Navbar />

  <div class="d-flex">
    <Sidebar />

    <div class="flex-grow-1 content p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold">Article List</h3>

        <div class="d-flex gap-2 align-items-center">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
          option            
        </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button" @click="Sort('desc')">
                  Desc
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" @click="Sort('asc')">
                  Asc
                </button>
              </li>
            </ul>
          </div>

          <input
            type="text"
            class="form-control"
            placeholder="Search Articles"
            v-model="search"
          />
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card p-3">
            <h6>Total Articles</h6>
            <h3 class="fw-bold">120</h3>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-3">
            <h6>Published</h6>
            <h3 class="fw-bold text-success">85</h3>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-3">
            <h6>Draft</h6>
            <h3 class="fw-bold text-warning">35</h3>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <BaseCard :articles="articleStore.articles" />
        <BasePagination/>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseCard from '@/components/UI/BaseCard.vue';
import Sidebar from '@/components/layout/Sidebar.vue'
import { onMounted, ref, watch } from 'vue';
import { useArticleStore } from '@/stores/article';
import Navbar from '@/components/layout/Navbar.vue';
import BasePagination from '@/components/UI/BasePagination.vue';
const search = ref('');
const sortDir = ref('desc');
const articleStore = useArticleStore();


watch(search, async (value) => {
  await articleStore.fetchArticles({
    search: value,
    sortDir: sortDir.value
  });
});
const Sort = async (order) => {
  sortDir.value = order;
  await articleStore.fetchArticles({
    search: search.value,
    sortDir: order
  });
};


onMounted( () => {
     articleStore.fetchArticles({
       search: search.value,
       sortDir: sortDir.value
     });
});
</script>
