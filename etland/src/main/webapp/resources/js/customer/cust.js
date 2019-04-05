var cust = cust ||{}


cust =(()=>{

	let setpath=()=>{
		 _ = $.ctx();
	     js = $.js();
	     compojs = js+'/component/compo.js';
	     r_cnt = '#right_content';
	     l_cnt = '#left_content';
	}
	 let init =()=>{
		setpath(); 
		onCreate();
	};
	let onCreate=()=>{
		setContentView();
	};
	let setContentView=()=>{
		$.getScript(js+'/prod/prod.js');
		mypage();
	};
	let mypage=()=>{
		
		$.getScript(compojs);
		$(r_cnt).html(compo.cust_mypage());
		$(l_cnt+' ul').empty();
		  let arr=[{
               txt : '마이페이지', name : 'mypage'},	  
              {txt : '회원탈퇴', name : 'del'}, 
              {txt : '정보수정', name : 'update'}, 
              {txt : '쇼핑몰', name : 'shop'}, 
              {txt : '구매내역', name : 'history'},
              {txt : '장바구니', name : 'basket'
         }];
		$.each(arr,(i,j)=>{
			 $('<li><a  href="#">'+j.txt+'</a></li>')
			  .attr('name', j.name)
              .appendTo(l_cnt+' ul.nav')
              .click(function(){
                  let that = $(this).attr('name');
                  $(this).addClass('active');
                  $(this).siblings().removeClass('active');
                  switch(that){
                  case 'mypage':
                	  $(r_cnt).html(compo.cust_mypage());
                      break;
                  case 'update':
              		  $(r_cnt).html(compo.cust_update());
              		 $('form button[type=submit]').click(e=>{ 
                 		  e.preventDefault();
                 		 update();
                 		  login();
                 	  });
                       break;
                  case 'del':
                       break;
                  case 'shop':
                	  alert('shop : 클릭함');
                	  prod.init();
                       break;
                  case 'history':
                       break;
                  case 'basket':
                      break;
                  }
             });
			  $('#srch_grp').show();
		})
		$('ul li[name=mypage]').addClass('active');
		
			$('#srch_btn').on('click',e=>{
				let srchword = $('input[type=text]').val();
				
				 if($.fn.nullChecker([srchword])){
					 alert('빈칸을 입력해주세요');
				 }else{
					 let arr = {
							 srchword:srchword,
							 page : '1'
							 
					 }
					 search(arr);
				 }
		});
	};
	
	let search =x=>{
		
		 setpath();
		 $.getJSON(_+'/phones/'+x.srchword+'/'+x.page,d=>{
			 alert('getJson들어왔다요');
			$('#right_content').empty();
			$('<div class="grid-item" id="pro_lst">'
   				+'<h1><font style="font-size: 30px">조회 결과</font>'
   				+'</h1>'
   				+'<button id="grid_btn">그리드로 보기</button>'
   			    +'</div>'
   			    +'<div class="grid-item" id="content_2"></div>')
   			    .appendTo('#right_content');
			
			let table ='<table><tr><th>No.</th>'
			+'<th>상품번호</th>'
			+'<th>상품명</th>'
			+'<th>공급사</th>'
			+'<th>카테고리이름</th>'
			+'<th>수량</th>'
			+'<th>판매금액</th>'
			+'</tr>';
   		$.each(d.ls,(i,j)=>{
   			table += '<tr><td>'+j.no+'</td>'
				+'<td>'+j.productID+'</td>'
				+'<td>'+j.productName+'</td>'
				+'<td>'+j.supplierID+'</td>'
				+'<td>'+j.categoryName+'</td>'
				+'<td>'+j.unit+'</td>'
				+'<td>'+j.price+'</td>'
				+'</tr>'
   		});
   		table += '</table>';
			$(table)
			.attr('id','prd_tab')
			.css({'font-family':'arial, sans-serif',
				'border-collapse':'collapse',
				'width':'100%',
				'text-align': 'center',
				'display': 'inline-block'
			})
			.addClass('pagination center')
			.appendTo('#content_2');
		
		let pxy = d.pxy;
		let html = '<div class="pagination">';
		
		$('<div class="pagination" id="content_3">').appendTo('#prd_tab');
		
		if(pxy.existPrev){
			$('<a>&laquo;</a>')
			.appendTo('#content_3')
			.click(function(){
				/*srch(d.pxy.prevBlock);*/
			});
		}
		 
		 	let i = 0;
		    for (i = pxy.startPage;i<=pxy.endPage; i++) {
				if (pxy.pageNum == i) {
					 $('<a  class="page active">'+i+'</a>')
					 .appendTo('#content_3')
					 .click(function(){
						/* srch($(this).text());*/
					 });
				} else {
					 $('<a class="page">'+i+'</a>')
					 .appendTo('#content_3')
					 .click(function(){
						 /*srch($(this).text());*/
					 });
				}
			}
		    
		    if(pxy.existNext){
		    	$('<a>&raquo;</a>')
				.appendTo('#content_3')
				.click(function(){
					/*srch(pxy.nextBlock);*/
				});
			}
		    $('#grid_btn').click(e=>{
		    	setpath();
		    	let url = _+'/phones/'+x.srchword+'/grid/'+x.page;
		    	
		    	$.getJSON(url,d=>{
		    		$('#right_content').empty();
					$('<div class="grid-item" id="pro_lst">'
		   				+'<h1><font style="font-size: 30px">조회 결과</font>'
		   				+'</h1>'
		   				+'<button id="grid_btn">그리드로 보기</button>'
		   			    +'</div>'
		   			    +'<div class="grid-item" id="content_2"></div>')
		   			    .appendTo('#right_content');
		    		alert('그리드 보기 클릭');
			        let a = [1,2,3]
			    	  let i =0;
			        	$('<div id="grid"/>').appendTo('#content_2');
			    	  for(i=0;i<3;i++){
			    		  $('<div class="row progrid"></div>').appendTo('#grid')
			    		   $.each(a,(x,y)=>{
					            $('<div class="col-md-4">'
					                      +'<div class="thumbnail">'
					                        +'<a href="#" target="_blank">'
					                          +'<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRanydDprvV35nlbHP2RwvjdyPrYgOgjevy7W_efJ2tTEVZvKKF" alt="Lights" style="width:100%">'
					                          +'<div class="caption">'
					                            +'<p>Lorem ipsum donec id elit non mi porta gravida at eget metus.</p>'
					                          +'</div>'
					                        +'</a>'
					                      +'</div>'
					                    +'</div>').appendTo('.progrid')
					        })   
			    	  }
		    	});
		    	     
		    });
		 });
		 
	}
    let update =()=>{
   	 let data = {
   			 customerID : $('form input[name=cid]').val(),
   			 customerName : $('form input[name=cname]').val(),
   			 password : $('form input[name=cpass]').val(),
   			 ssn : $('form input[name=cssn]').val(),
   			 phone : $('form input[name=cphone]').val(),
   			 city : $('form input[name=ccity]').val(),
   			 address : $('form input[name=cadr]').val(),
   			 postalCode : $('form input[name=cptc]').val()
   	 }; 
   	 $.ajax({
   		 url : _+'/customers/'+data.customerID,
   		 type : 'put',
   		 dataType : 'json',
   		 data : JSON.stringify(data),
   		 contentType : 'application/json',
   		 success : d =>{
   			 if (d.msg==='SUCCESS') {
   				 alert('수정 완료헸습니다');
   				 $(r_cnt).empty();
   				 $(compo.cust_login_form())
                    .appendTo(r_cnt);
   				 $('form button[type=submit]').click(e=>{ 
              		  e.preventDefault();
              		  login();
              	  });
				}else{
					alert('수정실패!!');
				}
            },
            error : e=>{
                 alert('실패');
            }
   	 });
    };
   let ls =x=>{
	   setpath();
    	$.getJSON($.ctx()+'/customers/page/'+x,d=>{
    		
    		$('#right_content').empty();
    		$('<div class="grid-item" id="cust_lst">'
    				+'<h1><font style="font-size: 30px">사원 리스트</font>'
    				+'</h1>'
    			    +'</div>'
    			    +'<div class="grid-item" id="content_2"></div>')
    			    .appendTo('#right_content');
			let table ='<table><tr><th>No.</th>'
			+'<th>아이디</th>'
			+'<th>이름</th>'
			+'<th>생년월일</th>'
			+'<th>성별</th>'
			+'<th>전화</th>'
			+'<th>주소</th>'
			+'<th>우편번호</th>'
			+'</tr>';
    		$.each(d.ls,(i,j)=>{
    			table += '<tr><td>'+j.no+'</td>'
				+'<td>'+j.customerID+'</td>'
				+'<td>'+j.customerName+'</td>'
				+'<td>'+j.ssn+'</td>'
				+'<td>'+'남'+'</td>'
				+'<td>'+j.phone+'</td>'
				+'<td>'+j.address+'</td>'
				+'<td>'+j.postalCode+'</td>'
				+'</tr>'
    		});
			table += '</table>';
				$(table)
				.attr('id','cust_tab')
				.css({'font-family':'arial, sans-serif',
					'border-collapse':'collapse',
					'width':'100%',
					'text-align': 'center',
					'display': 'inline-block'
				})
				.addClass('pagination center')
				.appendTo('#cust_lst');
			
			let pxy = d.pxy;
			let html = '<div class="pagination">';
			
			$('<div class="pagination" id="content_3">').appendTo('#cust_lst');
			
			if(pxy.existPrev){
				$('<a>&laquo;</a>')
				.appendTo('#content_3')
				.click(function(){
					ls(d.pxy.prevBlock);
				});
			}
			 
			 	let i = 0;
			    for (i = pxy.startPage;i<=pxy.endPage; i++) {
					if (pxy.pageNum == i) {
						 $('<a  class="page active">'+i+'</a>')
						 .appendTo('#content_3')
						 .click(function(){
							 ls($(this).text());
						 });
					} else {
						 $('<a class="page">'+i+'</a>')
						 .appendTo('#content_3')
						 .click(function(){
							 ls($(this).text());
						 });
					}
				}
			    
			    if(pxy.existNext){
			    	$('<a>&raquo;</a>')
					.appendTo('#content_3')
					.click(function(){
						ls(pxy.nextBlock);
					});
				}
    	});
    };
    
	return {init:init,
			ls:ls}
})();
	