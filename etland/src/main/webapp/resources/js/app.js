var app = app || {};
app = (()=>{
	let init=x=>{
		app.$.init(x);
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.when(
			$.getScript($.js()+'/component/compo.js'),
			$.getScript($.js()+'/common/auth.js'),
			$.getScript($.js()+'/employee/emp.js'),
			$.getScript($.js()+'/customer/cust.js')
		).done(()=>{
			auth.init();
		});
	};
	return {init: init,
		onCreate: onCreate};
})();
app.$ = {
		init : (x)=>{
			$.getScript(x+'/resources/js/router.js',()=>{
				$.extend(new Session(x));
				app.onCreate();
			})
		}
	};






