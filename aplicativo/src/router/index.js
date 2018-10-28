import Vue from 'vue'
import Router from 'vue-router'

//pages
import Home from '@/components/Home'
import Login from '@/components/Login'
import About from '@/components/About'
import Upas from '@/components/Upas'
import Upa from '@/components/Upa'
import Fluxo from '@/components/Fluxo'
import Ajuda from '@/components/Ajuda'
import Administrativo from '@/components/Administrativo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/upas',
      name: 'Upas',
      component: Upas
    },
    {
      path: '/upa/:id',
      name: 'Upa',
      component: Upa
    },
    {
      path: '/fluxo',
      name: 'Fluxo',
      component: Fluxo
    },
    {
      path: '/sobre-nos',
      name: 'About',
      component: About
    },
    {
      path: '/ajuda',
      name: 'Ajuda',
      component: Ajuda
    },
    {
      path: '/administrativo',
      name: 'Administrativo',
      component: Administrativo
    }
  ]
})
