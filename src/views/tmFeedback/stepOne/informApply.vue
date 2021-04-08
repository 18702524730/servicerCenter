<template>
	<div class="applysubmit">
		<steps :steps="steps"></steps>
		<one></one>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Steps from '../components/steps.vue'
	import One from './components/one.vue'
	export default {
  	components: {
  		Steps,One
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
