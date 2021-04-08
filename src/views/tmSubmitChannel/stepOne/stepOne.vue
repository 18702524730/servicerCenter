<template>
	<div class="applysubmit">
		<steps :steps="steps"></steps>
		<apply-fill></apply-fill>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Steps from '../components/steps.vue'
	import ApplyFill from './components/Fill.vue'
	export default {
  	components: {
  		ApplyFill, Steps
    },
    data() {
      return {
      	steps:1,
      }
    },
    methods: {
    },
    mounted() {
    	// this.status = this.$router.query.status;
    }
  }
</script>
<style lang='less'>
.applysubmit{
	border: 1px solid #DFE2E5;
}

</style>
