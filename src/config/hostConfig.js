var rootConfig = {
  rootUrl: 'https://sp.ipsebe.com/iprp_servicer',
  indexUrl: 'https://sp.ipsebe.com',
  cartUrl: 'https://cart.ipsebe.com',
  czUrl:'https://cz.ipsebe.com',
  userUrl: 'https://user.ipsebe.com',
  wxUrl:'https://wechat.ipsebe.com',
  spUrl: 'https://sp.ipsebe.com',
  toolsUrl: 'https://tools.ipsebe.com',
  adminUrl: 'https://admin.ipsebe.com/iprp_operator',
  wwwUrl: 'https://www.ipsebe.com',
  otherUrl: 'https://www.ipsebe.com',
};
//localhost和ip的简单正则匹配
if (location.host.indexOf('localhost') === 0 || /^\d{1,3}\.[^]*/.test(location.host)) {
	rootConfig = {
	  rootUrl: '//' + location.host + '/iprp_servicer',//ajax根路径
	  indexUrl: '//' + location.host + '/iprp_servicer',
	  cartUrl: '//' + location.host + '/portalsite-cnsebe',
	  czUrl:'//' + location.host + '/cz',
	  userUrl: '//' + location.host + '/iprp_portal',
	  wxUrl:'//' + location.host,
	  spUrl: '//' + location.host + '/sp',
	  toolsUrl: '//' + location.host + '/tools',
	  adminUrl: '//' + location.host + '/iprp_operator',
	  wwwUrl: '//' + location.host,
	  otherUrl: '//' + location.host + '/other',
	};
}
if (location.host.indexOf('test') === 0) {
	rootConfig = {
	  rootUrl: '//testsp.ipsebe.com/iprp_servicer',
	  indexUrl: '//testsp.ipsebe.com',
	  cartUrl: '//testcart.ipsebe.com',
	  czUrl:'//testcz.ipsebe.com',
	  userUrl: 'https://testuser.ipsebe.com',
	  wxUrl:'//testwechat.ipsebe.com',
	  spUrl: '//testsp.ipsebe.com',
	  toolsUrl: '//testtools.ipsebe.com',
	  adminUrl: '//testadmin.ipsebe.com/iprp_operator',
	  wwwUrl: 'https://testwww.ipsebe.com',
	  otherUrl: 'https://testwww.ipsebe.com',
	};
}
if (location.host.indexOf('pre') === 0) {
	rootConfig = {
	  rootUrl: '//presp.ipsebe.com/iprp_servicer',
	  indexUrl: '//presp.ipsebe.com',
	  cartUrl: '//precart.ipsebe.com',
	  czUrl:'//precz.ipsebe.com',
	  userUrl: '//preuser.ipsebe.com',
	  wxUrl:'//prewechat.ipsebe.com',
	  spUrl: '//presp.ipsebe.com',
	  toolsUrl: '//pretools.ipsebe.com',
	  adminUrl: '//preadmin.ipsebe.com/iprp_operator',
	  wwwUrl: 'https://prewww.ipsebe.com',
	  otherUrl: 'https://prewww.ipsebe.com',
	};
}

export default rootConfig;
