import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ClientsView from '../views/Clients.vue'
import ClientsDetailsView from '../components/clients/ClientDetails.vue'
import ProjectsView from '../views/Projects.vue'
import DashboardView from '../views/Dashboard.vue'
import ProjectsDetailsView from '../views/ProjectDetails.vue'
// project details
import Overview from '../components/projects/projectDetails/ProjectOverview';
import Boards from '../components/projects/projectDetails/ProjectBoards.vue';
import Members from '../components/projects/projectDetails/ProjectMembers.vue';
import Tasks from '../components/projects/projectDetails/ProjectTasks.vue';
import Calendar from '../components/projects/projectDetails/ProjectCalendar.vue';
import Invoices from '../components/projects/projectDetails/ProjectInvoice.vue'
// project details

import SettingsView from '../views/Settings.vue'
import TagsView from '../views/Tags.vue'
import InvoicesView from '../views/Invoices.vue'
import CreateInvoiceView from '../components/invoices/CreateInvoice.vue';
import InvoiceDetailsView from '../components/invoices/InvoiceDetails.vue';
import { isRouteAuthRequired } from '../utils/auth'

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
    // redirect: { name: 'login' }
  },
  {
    path: '/login',
    name: 'login',
    // component: LoginView,
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')

  },
  {
    path: '/passwordReset',
    name: 'reset',
    component: () => import(/* webpackChunkName: "reset" */ '../views/Reset.vue')

  },
  {
    path: '/initiateReset',
    name: 'intiate-reset',
    component: () => import(/* webpackChunkName: "reset" */ '../views/InitiateReset.vue')

  },
  {
    path: '/dashboard/',
    name: 'siner-dashboard',
    component: DashboardView,
    // beforeEnter: isRouteAuthRequired,
    children:[
      { path:'home', name:'home-view', component: HomeView },
            
      { path:'projects', name:'projects-view',  component: ProjectsView },
      
      { 
        path:'projects/:id', 
        name:'project-details-view', 
        component: ProjectsDetailsView, 
        // component: {
        //   default: ProjectsDetailsView,
        //   Overview,
        //   Boards,
        //   Members,
        //   Tasks,
        //   Calendar,
        //   Invoices,
        // } 
      },
      
      { path:'tags',  name:'tags-view', component: TagsView },
      
      { path: 'invoices', name: 'invoices-view', component: InvoicesView },
      
      { path: 'invoices/create', name: 'create-invoice-view', component: CreateInvoiceView },

      { path: 'invoices/edit', name: 'edit-invoice-view', component: CreateInvoiceView },
      
      { path: 'invoices/:id', name: 'invoice-details-view', component: InvoiceDetailsView },
      
      { path: 'clients', name:'clients-view', component: ClientsView },

      { path:'clients/:id', name:'client-details-view', component: ClientsDetailsView },
      
      { path:'settings', name:'settings-view', component: SettingsView },
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
