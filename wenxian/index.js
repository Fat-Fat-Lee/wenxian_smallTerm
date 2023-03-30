import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../components/User.vue'
import Super from '../components/Super.vue'
import Passage from '../components/Passage.vue'
import Welcome from '../components/Welcome.vue'
import Myupload from '../components/Myupload.vue'
import Claim from '../components/Claim.vue'
import fromweb from '../components/Fromweb.vue'
import Result from '../components/Result.vue'
import upload from "element-ui/packages/upload/src/ajax";
import literature from '../components/literature.vue'
import Follow from '../components/Follow.vue'
import Collect from '../components/Collect.vue'
import Introduce from '../components/Introduce.vue'
import Statistics from '../components/Statistics.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Project from '../components/Project.vue'
import Question from "../components/Question";
import QuestionList from "../components/QuestionList";

Vue.use(VueRouter)

const routes = [

  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Login',
    children: [
      {
        path: '/Welcome',
        name: 'Welcome',
        component: Welcome,
      },
      {
        path: '/Super',
        name: 'Super',
        component: Super,
      },
      {
        path: '/User',
        name: 'User',
        component: User,
        redirect: '/Introduce',
        children: [{
          path: '/Follow',
          component: Follow
        },
          {
            path: '/Introduce',
            component: Introduce
          },
          {
            path: '/Statistics',
            component: Statistics
          },
          {
            path: '/Myupload',
            name: 'Myupload',
            component: Myupload,
          },
          {
            path: '/Claim',
            name: 'Claim',
            component: Claim,
          },
          {
            path: '/Collect',
            name: 'Collect',
            component: Collect,
          },
          {
            path:'/Project',
            name:'Project',
            component: Project,
          },
          {
            path:'/QuestionList',
            name: 'QuestionList',
            component: QuestionList,
          }
        ]
      },
      {
        path: '/Question',
        name: 'Question',
        component: Question,
      },
      {
        path: '/Passage',
        name: 'Passage',
        component: Passage,
      },
      {
        path: '/Result',
        name: 'Result',
        component: Result,
        children: []
      },
      {
        path: '/:aID',
        component: literature
      },


      // {
      //   path:'/fromweb',
      //   name:'fromweb',
      //   component: fromweb,
      // },


    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
