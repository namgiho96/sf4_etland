var cust = cust ||{}


cust =(()=>{
let _,js,compojs,r_cnt,l_cnt;
	 let init =()=>{
	 _ = $.ctx();
     js = $.js();
     compojs = js+'/component/compo.js';
     r_cnt = '#right_content';
     l_cnt = '#left_content';
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		mypage();
	};
	let mypage=()=>{
		$.getScript(compojs);
		$(r_cnt).html(compo.cust_mypage());
		
		$('#update_giho').click(()=>{
			$(r_cnt).html(compo.cust_update());
		});
	};
	return {init:init}
})();
	