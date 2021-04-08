<template>
    <div id="app">
        <!-- <transition name="bounce"> -->
            <router-view></router-view>
        <!-- </transition> -->
    </div>
</template>

<script>
	export default {
		name      : 'app',
		components: {},
		data(){
			return {
                timer:null
            }
		},
        methods:{
        },
        beforeDestroy(){
            // clearInterval(this.timer)
        },
        mounted(){
            // let url = window.location.href;
            // if(url.indexOf('stopInterval')==-1){
            //     setTimeout(()=>{
            //         window.open('http://localhost:9002/#/index/general?stopInterval=1')
            //     },500)
            //     console.log(111)
            // }
            
            // clearInterval(this.timer)
            // if(url.indexOf('stopInterval')==-1){
            //     let num = 1;
            //     let fisrt = true;
            //     this.timer=setInterval(()=>{
            //         num++
            //         if(num%10==0){
            //             if(first){
            //                 fisrt = false
            //                 window.open('http://localhost:9002/#/index/general?stopInterval=1')
            //             }else{
            //                 window.open('http://localhost:9002/#/index/general?stopInterval=1','_self')
            //             }
                        
            //         }
            //     },1000)
            // }
        },
	}
</script>

<style lang='less'>
	#app{width: 100%;min-width: 1280px;}
    *{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin:0px;
        padding:0px;
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
        -webkit-animation:bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-out .2s;
        -webkit-animation: bounce-out .2s;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
</style>
