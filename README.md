# 自定义Message消息提示框组件
>这里主要用了vue插件写法来封装Message组件，动画用了简单的setInterVal来控制，感觉有点low，日后会优化；
>先来张页面效果图:
<img src="" alt="home123" />
### 引入message.js文件并使用
>这里我没有发布到npm包管理器中，所以只有message.js和message.css这两个核心文件；
```javascript
import vueMessage from "./message.js";
Vue.use(vueMessage);
```
>这里我把css文件是集成到message.js文件中;看message.js文件第一行;
用法参考如下:
```javascript
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
```