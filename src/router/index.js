import { createRouter, createWebHistory } from 'vue-router'
import ReportsView from '../views/Reports.vue'
import ClientsView from '../views/Clients.vue'
import ComingSoon from '../views/ComingSoon.vue'
import ClientsDetailsView from '../components/clients/ClientDetails.vue'
import ProjectsView from '../views/Projects.vue'
import DashboardView from '../views/Dashboard.vue'
import ProjectsDetailsView from '../views/ProjectDetails.vue'
import SettingsView from '../views/Settings.vue'
import LoginView from '../views/Login.vue'
import InitiateResetView from '../views/InitiateReset.vue'
import SignupView from '../views/Signup.vue'
import ResetView from '../views/Reset.vue'
import TagsView from '../views/Tags.vue'
import InvoicesView from '../views/Invoices.vue'
import CreateInvoiceView from '../components/invoices/CreateInvoice.vue';
import InvoiceDetailsView from '../components/invoices/InvoiceDetails.vue';
// import { isRouteAuthRequired } from '../utils/auth'

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    // component: LoginView
    // redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    // component: LoginView,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    // component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    // component: SignupView
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import(/* webpackChunkName: "reset" */ '../views/Reset.vue')
    // component: ResetView

  },
  {
    path: '/initiateReset',
    name: 'intiate-reset',
    component: () => import(/* webpackChunkName: "reset" */ '../views/InitiateReset.vue'),
    // component: InitiateResetView

  },
  {
    path: '/dashboard/',
    name: 'siner-dashboard',
    // component: DashboardView,
    component: '../views/Dashboard.vue',
    // beforeEnter: isRouteAuthRequired,
    children:[
      { path: 'reports', name: 'reports', component: '../views/Reports.vue' },
      
      { path:'projects', name: 'projects-view',  component: '../views/Projects.vue' },
      
      {  path:'projects/:id',  name: 'project-details-view',  component: '../views/ProjectDetails.vue' },
       
      { path:'tags',  name:'tags-view', component: '../views/Tags.vue' },
      
      { path: 'invoices', name: 'invoices-view', component: '../views/Invoices.vue' },

      { path: 'teams', name: 'teams-view', component: '../views/ComingSoon.vue' },
      
      { path: 'invoices/create', name: 'create-invoice-view', component: '../components/invoices/CreateInvoice.vue' },

      { path: 'invoices/edit', name: 'edit-invoice-view', component: '../components/invoices/CreateInvoice.vue' },
      
      { path: 'invoices/:id', name: 'invoice-details-view', component: '../components/invoices/InvoiceDetails.vue' },
      
      { path: 'clients', name: 'clients-view', component: '../views/Clients.vue' },

      { path:'clients/:id', name:'client-details-view', component: '../components/clients/ClientDetails.vue' },
      
      { path:'settings', name:'settings-view', component: '../views/Settings.vue' },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../views/ErrorPage.vue"),
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
