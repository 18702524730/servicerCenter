<template>
    <div class="recordbox">
        
        <single-state :order_id="order_id" :registration="registration"></single-state>
        <span class="recordback" @click="back">返回</span>
    </div>
</template>
<script>
import SingleState from '@/views/service/myServiceOrder/Detail/State.vue'
const detailUrl = '/api/findBsOrderDetailById';
export default {
    
    data() {
        return {
            order_id:'',
            registration:''
        }
    },
    components:{
        SingleState
    },
    created() {
        this.order_id = this.$route.params.id;
        console.log(this.order_id)
        this.infoDetail()
    },
    methods: {
        infoDetail(){
	    	this.$http.get(detailUrl+'?order_id=' + this.order_id)
	    	.then((resp) => {
	    		this.registration = resp.data.acceptMaterials;
	    	}).catch((error) => {
	        console.log(error);
	      });
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less">
.recordbox {
    position: relative;
    .recordback {
        position: absolute;
        right: 30px;
        top: 20px;
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        background-color: #f5f5f5;
        color: #000;
        border-radius: 4px;
        font-size: 14px;
    }
}
</style>


