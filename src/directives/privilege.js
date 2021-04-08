/**
 * Created by lg on 2017/9/30.
 */

import Vue from 'vue';

export default function() {
	Vue.directive('has', {
	  bind: function (el, binding) {
	    if(!has(binding.value)){
	      el.parentNode.removeChild(el);
	    }
	  }
	})
}
