<template>
    <div class="content_inner">
        <!-- <transition name="fade"> -->
            <router-view></router-view>
        <!-- </transition> -->
    </div>
</template>
<script>
    export default {
        name: 'Content',
        data () {
            return {

            }
        },
        methods:{

        },
        created(){

        },
        mounted(){
            
        }
    }
</script>

<style lang='less'>
.content_inner{min-height: 100%;}
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>
