var emp = emp || {}

emp =(()=>{
	
	let setpath=()=>{
		 _ = $.ctx();
		    js = $.js();
		    compojs = js+'/component/compo.js';
		    r_cnt = '#right_content';
		    l_cnt = '#left_content';
		    
		
	};
	 let init =()=>{
		 setpath();
		onCreate();
	};
	let onCreate=()=>{
		
		setContentView();
	};
	let setContentView=()=>{
		$.When(
				
				$.getScript(compojs)
				).done(()=>{
					
					
				}).fail(()=>{
					 alert('emp/emp.js 를 찾지  못했습니다.');
				});
		
	};
	
	let nav=()=>{
		setpath();
		$(l_cnt+' ul').empty();
		let arr = [
			{txt : '고객 목록', name : 'custlist' },
			{txt : '상품 등록', name : 'custjoin' },
			{txt : '상품 목록', name : 'prodlist' },
			{txt : '상품 수정', name : 'custupdata' },
			{txt : '상품 삭제', name : 'custdel' },
			{txt : '상품 통계', name : 'prodsta' }
		];
		$.each(arr,(i,j)=>{
			 $('<li><a  href="#">'+j.txt+'</a></li>')
             .attr('name', j.name)
             .appendTo(l_cnt+' ul.nav')
             .click(function(){
                 let that = $(this).attr('name');
                 $(this).addClass('active');
                 $(this).siblings().removeClass('active');
                 switch(that){
                 case 'custlist':
                	 $(r_cnt).html(compo.cust_list);
                	 
                     break;
                 case 'custjoin':
                	 
                      break;
                 case 'prodlist':
                	 
                      break;
                 case 'custupdata':
                	 
                      break;
                 case 'custdel':
                      break;
                 case 'prodsta':
                     break;
                 }
            });
		});
		$('ul li[name=custlist]').addClass('active');
	}
	return {init:init,
			nav:nav}
})();