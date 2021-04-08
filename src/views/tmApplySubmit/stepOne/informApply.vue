<template>
	<div class="applysubmit">
		<steps :steps="steps"></steps>
		<apply-confirm></apply-confirm>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Steps from '../components/steps.vue'
	import ApplyConfirm from './components/Confirm.vue'
	export default {
  	components: {
  		Steps,ApplyConfirm
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