import babelpolyfill from 'babel-polyfill'
import Vue from 'vue';
import './assets/css/reset.css';
import ElementUI from 'element-ui';
import './assets/css/element-variables.scss';
import './assets/css/common.scss';
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools      = true;

//import mock from './mock/data.js';

import router from 'router/';
import 'register/';
import store from 'store/';

import App from './App';

window.spVue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
