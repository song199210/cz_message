import Vue from "vue";
import App from "./App";
import vueMessage from "./message.js";
Vue.use(vueMessage);
new Vue({
    el:"#app",
    template:'<App/>',
    components:{
        App
    }
});