import { useAuthStore } from '@/stores/Auth'
import AboutView from '@/views/AboutView.vue'
import ArticleView from '@/views/ArticleView.vue'
import CreateArticleView from '@/views/CreateArticleView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import EditArticleView from '@/views/EditArticleView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import FinaceExpertView from '@/views/FinaceExpertView.vue'
import ExpertCardView from '@/views/ExpertCardView.vue'
import AdminReportView from '@/views/AdminReportView.vue'
import DetailView from '@/views/DetailView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CategoryView from '@/views/CategoryView.vue'
import EditProfileView from '@/views/EditProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { 
    path:'/',
    name: 'home',
    component: HomeView,
    meta: {require: true}


  },
  {
      path:'/login',
      name:'login',
      component:LoginView,

   },
   {
    path:'/register',
    name: 'register',
    component: RegisterView
   },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/articles',
      name: 'articles',
      component:ArticleView,
      meta: {require: true}
    },
    {
      path: '/createArticle',
      name: 'createArticle',
      component: CreateArticleView,
      meta: {require: true}
    },
    {
      path: '/editArticle/:id',
      name: 'editArticle',
      component: EditArticleView,
      meta: {require: true}
    },
    {
      path: '/financeExpert',
      name: 'financeExpert',
      component: FinaceExpertView,
      meta: {require: true}
    },
    {
      path: '/expertCard',
      name: 'expertCard',
      component: ExpertCardView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminReportView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
      meta: {require: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {require: true}
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView,
      meta: {require: true}
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfileView,
      meta: { require: true}
    }
  ],
})
router.beforeEach((to, from)=> {
  let auth = useAuthStore();
  if(!auth.isLoggedIn && to.meta.require){
    return {name: 'login'}
  }
  return true;
})

export default router
