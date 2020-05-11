import Vue from 'vue'
import Router from 'vue-router'

const Aside = r => require.ensure([], () => r(require('@/views/Aside/index.vue')), 'aside')
const Login = r => require.ensure([], () => r(require('@/views/Login/index.vue')), 'login')
const Index = r => require.ensure([], () => r(require('@/views/Index/index.vue')), 'index')
const User = r => require.ensure([], () => r(require('@/views/User/index.vue')), 'user')
const Music = r => require.ensure([], () => r(require('@/views/Music/index.vue')), 'music')
const Commentt = r => require.ensure([], () => r(require('@/views/Comment/index.vue')), 'commentt')
const UserEdit = r => require.ensure([], () => r(require('@/views/User/edituser.vue')), 'UserEdit')
const AddMusic = r => require.ensure([], () => r(require('@/views/Music/addMusic.vue')), 'AddMusic')
const AddUser = r => require.ensure([], () => r(require('@/views/User/adduser.vue')), 'AddUser')
const editcommit = r => require.ensure([], () => r(require('@/views/Comment/editcommit.vue')), 'editcommit')
const AddSinger = r => require.ensure([], () => r(require('@/views/Music/addSinger.vue')), 'AddSinger')
const editMusic = r => require.ensure([], () => r(require('@/views/Music/editMusic.vue')), 'editMusic')
const addAblum = r => require.ensure([], () => r(require('@/views/Music/addAblum.vue')), 'addAblum')
const singerlist = r => require.ensure([], () => r(require('@/views/Music/singerlist.vue')), 'singerlist')
const eaditsinger = r => require.ensure([], () => r(require('@/views/Music/eaditsinger.vue')), 'eaditsinger')


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/aside',
      name: 'Aside',
      component: Aside,
      children: [{
          path: '/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/useredit',
          name: 'User',
          component: UserEdit
        },
        {
          path: '/editcommit',
          name: 'editcommit',
          component: editcommit
        },
        {
          path:'/adduser',
          name: 'AddUser',
          component: AddUser
        },{
          path: '/music',
          name: 'Music',
          component: Music
        },
        {
          path:'/editMusic',
          name: 'editMusic',
          component: editMusic
        },
        {
          path: '/addmusic',
          name: 'AddMusic',
          component: AddMusic
        },
        {
          path: '/comment',
          name: 'Commentt',
          component: Commentt
        },
        {
          path:'/addSinger',
          name:'AddSinger',
          component:AddSinger
        },
        {
          path:'/addAblum',
          name:'addAblum',
          component:addAblum
        },
        {
          path:'/singerlist',
          name:'singerlist',
          component:singerlist
        },
        {
          
          path:'/eaditsinger',
          name:'eaditsinger',
          component:eaditsinger
        }
      ]
    }
  ]
})
