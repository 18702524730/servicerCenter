<template>
	<div class="applysubmit">
		<steps :steps="steps"></steps>
		<apply-end></apply-end>
	</div>
</template>
<script>
	import Vue from 'vue'
	import Steps from '../components/steps.vue'
	import ApplyEnd from './components/End.vue'
	export default {
  	components: {
  		Steps,ApplyEnd
    },
    data() {
      return {
      	steps:4,
      }
    },
    methods: {
    },
    mounted() {
    	// this.status = this.$router.query.status;
    }
  }
</script>