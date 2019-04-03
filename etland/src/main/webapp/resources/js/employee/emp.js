var emp = emp || {}

emp =(()=>{
	
	let setpath=()=>{
		 _ = $.ctx();
		    js = $.js();
		    compojs = js+'/component/compo.js';
		    r_cnt = '#right_content';
		    l_cnt = '#left_content';
		    custjs = js+'/customer/cust.js';
		    
		
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
                	 $.getScript(custjs);
                	 $(r_cnt).html(cust.ls(1));
                     break;
                 case 'custjoin':
                	 $(r_cnt).empty();
                	 $(r_cnt).html(compo.prod_post());
                	 
                      break;
                 case 'prodlist':
                	 $(r_cnt).html(prodls(1));
                	 
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
	
	let prodls =x=>{
		setpath();
		$.getJSON($.ctx()+'/phones/page/'+x,d=>{
			$('#right_content').empty();
			$('<div class="grid-item" id="prod_lst">'
    				+'<h1><font style="font-size: 30px">상품 리스트</font>'
    				+'</h1>'
    			    +'</div>'
    			    +'<div class="grid-item" id="content_2"></div>')
    			    .appendTo('#right_content');
			let table ='<table><tr><th>No.</th>'
				+'<th>상품아이디</th>'
				+'<th>상품이름</th>'
				+'<th>공급아이디</th>'
				+'<th>카테고리아이디</th>'
				+'<th>unit</th>'
				+'<th>가격</th>'
				+'<th>사진번호</th>'
				+'</tr>';
			$.each(d.ls,(i,j)=>{
    			table += '<tr><td>'+j.no+'</td>'
				+'<td>'+j.productID+'</td>'
				+'<td>'+j.productName+'</td>'
				+'<td>'+j.supplierID+'</td>'
				+'<td>'+j.categoryID+'</td>'
				+'<td>'+j.unit+'</td>'
				+'<td>'+j.price+'</td>'
				+'</tr>'
    		});
			table += '</table>';
			$(table)
			.attr('id','prod_tab')
			.css({'font-family':'arial, sans-serif',
				'border-collapse':'collapse',
				'width':'100%',
				'text-align': 'center',
				'display': 'inline-block'
			})
			.addClass('pagination center')
			.appendTo('#prod_lst');
			
			let pxy = d.pxy;
			let html = '<div class="pagination">';
			
			$('<div class="pagination" id="content_3">').appendTo('#prod_lst');
			
			 if (pxy.existPrev) {
				 $('<a>&laquo;</a>')
					.appendTo('#content_3')
					.click(function(){
						prodls(pxy.prevBlock);
					});
				}
			 
			 	let i = 0;
			 	
			    for (i = pxy.startPage;i<=pxy.endPage; i++) {
					if (pxy.pageNum == i) {
						
						 $('<a  class="page active">'+i+'</a>')
						 .appendTo('#content_3')
						 .click(function(){
							 prodls($(this).text());
						 });
					} else {
						 $('<a class="page">'+i+'</a>')
						 .appendTo('#content_3')
						 .click(function(){
							 prodls($(this).text());
						 });
					}
				}
			    if(pxy.existNext){
			    	$('<a>&raquo;</a>')
					.appendTo('#content_3')
					.click(function(){
						prodls(pxy.nextBlock);
					});
				}
		});
		
		
		
		
		
	}
	return {init:init,
			nav:nav,
			prodls,prodls}
})();