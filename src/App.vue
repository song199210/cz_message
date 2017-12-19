<template>
    <div id="app">
        <h1>{{title}}</h1>
        <button type="button" @click="showMsg('success')">打开success消息框</button>
        <button type="button" @click="showMsg('info')">打开info消息框</button>
        <button type="button" @click="showMsg('warn')">打开warn消息框</button>
        <button type="button" @click="showMsg('error')">打开error消息框</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title:"测试"
            }
        },
        methods:{
            showMsg(type){
                if(type == "success"){
                    this.cz_message.success("测试success",5000);
                }else if(type == "info"){
                    this.cz_message.info("测试info");
                }else if(type == "warn"){
                    this.cz_message.warn("测试warn");
                }else if(type == "error"){
                    this.cz_message.error("测试error");
                }
            }
        }
    }
</script>