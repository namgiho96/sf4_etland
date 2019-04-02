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
		})
		$('ul li[name=mypage]').addClass('active');
		
	};
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
   let list = ()=>{
	   alert('리스트 1~');
	   setpath();
    	$.getJSON(_+'/customers/page/1',d=>{
    		$(r_cnt).empty();
    		$(compo.cust_list()).appendTo(r_cnt);
    		$.each(d,(i,j)=>{
    			$('#cust_tab').append('<tr>'
    					+'<td>'+j.no+'</td>'
                        +'<td>'+j.customerID+'</td>'
                        +'<td>'+j.customerName+'</td>'
                        +'<td>'+j.ssn+'</td>'
                        +'<td>남자</td>'
                        +'<td>'+j.phone+'</td>'
                        +'<td>'+j.postalCode+'</td>'
                        +'<td>'+j.address+'</td>'
                        +'<td>'+j.city+'</td>'
                        +'</tr>');
    		});
    	});
    };
    
    
	return {init:init,
			list:list}
})();
	