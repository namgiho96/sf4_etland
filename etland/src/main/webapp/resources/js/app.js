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
			$.getScript($.js()+'/customer/cust.js'),
			$.getScript($.js()+'/employee/emp.js')
		).done(()=>{
			
			$('#nav').children().eq(0).html('<a href="#section1">로그인</a>');
			$('#nav').children().eq(1).html('<a href="#section2">회원가입</a>');
			$('#nav').children().eq(2).html('<a href="#section3">사원접속</a>');
			$('#nav').children().eq(3).html('<a href="#section4">사원등록</a>');
			cust.permission.login();
			nav_move();
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

function nav_move(){
	
	
	$('#nav').children().eq(0).click(()=>{
		$('#right_content').html(compo.cust_login_form());
	});
	$('#nav').children().eq(1).click(()=>{
		$('#right_content').html(compo.cust_join_form());
	});
	
	$('#nav').children().eq(2).click(()=>{
		$('#right_content').html(compo.emp_access_form());
	});
	
	$('#nav').children().eq(3).click(()=>{
		$('#right_content').html(compo.emp_register_form());
	});
}






