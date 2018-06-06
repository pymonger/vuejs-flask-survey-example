import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Survey from '@/components/Survey'
import NewSurvey from '@/components/NewSurvey'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/surveys/new',
      name: 'NewSurvey',
      component: NewSurvey
    },
    {
      path: '/surveys/:id',
      name: 'Survey',
      component: Survey
    }
  ]
})
