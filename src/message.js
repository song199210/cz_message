import "./message.css";

;(function(){
    let vueMessage={};
    vueMessage.install=function(Vue,options){
        Vue.prototype.cz_message=(function(){
            let msgFuns=function(){
                this.creDiv=null;
                return this;
            }
            msgFuns.prototype={
                cz_animate(anObj1,funs){
                    const _that=this;
                    let keyList1=Object.keys(anObj1);
                    let anObj2={};
                    let keyStyle=null;
                    keyList1.forEach((item)=>{
                        anObj1[item]=parseInt(anObj1[item]);
                        keyStyle=window.getComputedStyle(_that.creDiv)[item];
                        anObj2[item]=typeof keyStyle == "undefined"?"":parseInt(keyStyle);
                    });
                    for(let i=0;i<keyList1.length;i++){
                        (function(key){
                            if(anObj1[key]>anObj2[key]){
                                let n=0;
                                let clearInt=setInterval(()=>{
                                    keyStyle=window.getComputedStyle(_that.creDiv)[key];
                                    _that.creDiv.style[key]=(parseInt(keyStyle)+1)+"px";
                                    if(parseInt(keyStyle) == anObj1[key]){
                                        clearInterval(clearInt);
                                        typeof funs == "undefined"?"":funs();
                                    }
                                },5);
                            }else{
                                let n=0;
                                let clearInt=setInterval(()=>{
                                    keyStyle=window.getComputedStyle(_that.creDiv)[key];
                                    _that.creDiv.style[key]=(parseInt(keyStyle)-1)+"px";
                                    if(parseInt(keyStyle) == anObj1[key]){
                                        clearInterval(clearInt);
                                        typeof funs == "undefined"?"":funs();
                                    }
                                },5);
                            }
                        })(keyList1[i]);
                    }
                },
                cMsgDiv(type,title,bgType,time){
                    let _that=this;
                    console.log(this.creDiv)
                    if(!(this.creDiv == null)){
                        return false;
                    }
                    this.creDiv=document.createElement("div");
                    this.creDiv.setAttribute("class","df_message");
                    let htmlStr=`<div class="df_message_content">
                        <span class="glyphicon ${type} ${bgType}"></span>
                        <span class="df_message_title">${title}</span>
                    </div>`;
                    this.creDiv.innerHTML=htmlStr;
                    document.body.appendChild(this.creDiv);
                    _that.cz_animate({top:"30px"},function(){
                        _that.closeMsgDiv(time);
                    });
                },
                closeMsgDiv(time){
                    if(!time){
                        time=1500;
                    }
                    clearTimeout(tout);
                    let _that=this;
                    if(_that.creDiv == null){
                        return false;
                    }
                    let tout=setTimeout(()=>{
                        clearTimeout(tout);
                        this.cz_animate({top:"-50px"},function(){
                            document.body.removeChild(_that.creDiv);
                            _that.creDiv=null;
                        });
                    },time)
                },
                success(title,time){
                    this.cMsgDiv('glyphicon-ok',title,"success",time);
                },
                info(title,time){
                    this.cMsgDiv('glyphicon-info-sign',title,"info",time);
                },
                warn(title,time){
                    this.cMsgDiv('glyphicon-warning-sign',title,"warn",time);
                },
                error(title,time){
                    this.cMsgDiv('glyphicon-remove',title,"error",time);
                }
            }
            return new msgFuns();
        })();
    }
    if (typeof exports == "object") {
        module.exports = vueMessage
      } else if (typeof define == "function" && define.amd) {
        define([], function(){ return vueMessage })
      } else if (window.Vue) {
        window.vueMessage = vueMessage;
        Vue.use(vueMessage);
      }
})();