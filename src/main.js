import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ViewUI from 'view-design'
import App from './App'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css'
import './permission'


Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ViewUI)


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})