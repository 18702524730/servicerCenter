<script type="text/babel">
	import { Option } from 'element-ui'

	export default {
		extends: Option,

		name: 'SebeOption',

		// 与element的option.vue的componentName同名以覆盖
		componentName: 'ElOption',

		props: {
			filterLabel: [String, Number],
		},
		methods: {
			// 复制自option.vue
			queryChange(query) {
				// query 里如果有正则中的特殊字符，需要先将这些字符转义
				let parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
				this.visible = new RegExp(parsedQuery, 'i').test(this.filterLabel || this.currentLabel) || this.created;
				if (!this.visible) {
					// this.parent.filteredOptionsCount--;
          this.select.filteredOptionsCount--;
        }
			},
		},
	};
</script>
