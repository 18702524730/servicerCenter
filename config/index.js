// see https://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		env                     : require('./prod.env'),
		index                   : path.resolve(__dirname, '../dist/index.html'),
		assetsRoot              : path.resolve(__dirname, '../dist'),
		assetsSubDirectory      : 'static',
		assetsPublicPath        : './',
		productionSourceMap     : false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev comtestssion-webpack-plugin
		productionGzip          : false,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport    : process.env.npm_config_report
	},
	dev  : {
		env               : require('./dev.env'),
		port              : 9002,
		autoOpenBrowser   : true,
		assetsSubDirectory: 'static',
		assetsPublicPath  : '/',
		proxyTable        : {
			'/iprp_servicer'  : {
				target      : 'https://testsp.ipsebe.com',
				// target      : 'http://192.168.1.23:8087',//xks
				changeOrigin: true,
				pathRewrite : {
					'^/iprp_servicer': '/iprp_servicer'
					// '^/iprp_servicer': ''
				},
				cookieDomainRewrite: "",
			},
			'/iprp_portal'  : {
				target      : 'https://testuser.ipsebe.com',
				changeOrigin: true,
				pathRewrite : {
					'^/iprp_portal': ''
				},
				cookieDomainRewrite: "",
			},
			'/portalsite-cnsebe'  : {
				target      : 'https://testcart.ipsebe.com',
				changeOrigin: true,
				pathRewrite : {
					'^/portalsite-cnsebe': ''
				},
				cookieDomainRewrite: "",
			},
			//微信二维码
      '/weixin': {
          target: 'https://testwechat.ipsebe.com',
          changeOrigin: true,
          pathRewrite: {
              '^/weixin': '/weixin'
          },
          cookieDomainRewrite: "",
      },
      '/other': {
          target: 'https://testwww.ipsebe.com',
          changeOrigin: true,
          pathRewrite: {
              '^/other': ''
          },
          cookieDomainRewrite: "",
	  },
      // 跳转sebeAll项目
      '/sebe': {
          target: 'https://testwww.ipsebe.com',
          changeOrigin: true,
          pathRewrite: {
              '^/sebe': '/sebe'
          },
          cookieDomainRewrite: "",
      }
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap      : false
	}
}
