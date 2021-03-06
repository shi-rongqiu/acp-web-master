import Vue from 'vue'
import Router from 'vue-router'
import log from '@/page/log'
import home from '@/page/home'
import index from '@/page/index'
import project from '@/page/project/project'
import useCase from '@/page/use/useCase'
import model from '@/page/model/model'
import network from '@/page/network'
import device from '@/page/device/device'
import seeDetails from '@/page/use/seeDetails'
import modelDetails from '@/page/model/modelDetails'
import projectCreate from '@/page/project/projectCreate'
import seeDeploy from '../page/project/seeDeploy'
import testing from '../page/project/testing'
import testingNode from '../page/project/testingNode'
import report from '../page/project/report'
import addModel from '../page/model/addModel'
import addGroup from '../page/use/addGroup'
import editGroup from '../page/use/editGroup'
import addExample from '../page/nouse/addExample'
import editExample from '../page/nouse/editExample'
import addDevice from '../page/device/addDevice'
import system from '../page/system/system'
import userManage from '../page/system/user'
import addUser from '../page/system/addUser'
import changePass from '../page/changePass'
import DialogProjectCreated from '../page/project/dialogProjectCreated'

Vue.use(Router)
// const router = new VueRouter({
//   //配置路由和组件之间的应用关系
//   routes,
//   mode: 'history',
//   linkActiveClass: 'active'
// })
export default new Router({
  // router,
  routes: [
    {
      path: '/',
      name: 'log',
      component: log
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        { name: 'project', path: '/index', component: project },
        { name: 'useCase', path: 'useCase', component: useCase },
        { name: 'model', path: 'model', component: model },
        { name: 'network', path: 'network', component: network },
        { name: 'seeDetails', path: 'seeDetails', component: seeDetails },
        { name: 'modelDetails', path: 'modelDetails', component: modelDetails },
        { name: 'projectCreate', path: 'projectCreate', component: projectCreate },
        { name: 'dialogProjectCreated', path: 'dialogProjectCreated', component: DialogProjectCreated },
        { name: 'report', path: 'report', component: report },
        { name: 'seeDeploy', path: 'seeDeploy', component: seeDeploy },
        { name: 'testing', path: 'testing', component: testing },
        { name: 'testingNode', path: 'testingNode', component: testingNode },
        { name: 'addModel', path: 'addModel', component: addModel },
        { name: 'addGroup', path: 'addGroup', component: addGroup },
        { name: 'editGroup', path: 'editGroup', component: editGroup },
        { name: 'addExample', path: 'addExample', component: addExample },
        { name: 'editExample', path: 'editExample', component: editExample },
        { name: 'device', path: 'device', component: device },
        { name: 'addDevice', path: 'addDevice', component: addDevice },
        { name: 'system', path: 'system', component: system },
        { name: 'user', path: 'userManage', component: userManage },
        { name: 'addUser', path: 'addUser', component: addUser },
        { name: 'changePass', path: 'changePassword', component: changePass },
      ]
    },
  ]
})
