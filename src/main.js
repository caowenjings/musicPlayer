import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import "iview/dist/styles/iview.css";// 使用 CSS
import Router from 'vue-router'
import axios from 'axios'
import Moment from 'moment'
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
Vue.use(vueParticleLine)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

Vue.use(iView);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;
// 时间格式化
Moment.locale('zh-cn')
Vue.prototype.Moment=Moment;
axios.defaults.baseURL = 'http://193.112.73.103:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
