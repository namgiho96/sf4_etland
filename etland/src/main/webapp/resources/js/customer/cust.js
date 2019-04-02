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
    				+'</tr>'
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
			table += '</table>'
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
			
			let html = '<div class="pagination">';
			$('<div class="pagination">').appendTo('#cust_lst');
			 if (d.pxy.existPrev) {
					html += '<a href="#">&laquo;</a>'
				}
			 
			    for (let i = d.pxy.startpage;i<=d.pxy.endpage; i++) {
					if (d.pxy.pageNum) {
						 html += '<a href="#" class="page active">'+i+'</a>';
					} else {
						 html += '<a href="#" class="page">'+i+'</a>';
					}
				}
			    if(d.pxy.existnext){
					html += '<a href="#" class="posblock">&raquo;</a>';
				}
			    html += '</div>';
			    $(html).appendTo('#content_2');
    	});
    };
    
    
   
    
    /*
     * <div style="height: 50px"></div>      
    <div class="center">
      <div class="pagination">
      
      <form id="form" name="form">
     <c:if test="${pagination.existPrev}">
          <a href='${ctx}/customer.do?cmd=cust_list&page=list&page_num=${pagination.prevBlock}'>&laquo;</a>
      </c:if>
      
      <c:forEach begin="${pagination.startPage}" end="${pagination.endPage}" varStatus="status">
      
      <c:choose>
      
        <c:when test="${pagination.pageNum eq status.index}" >
            <a href="#"class='page active'>${status.index}</a>
        </c:when>
        
        <c:otherwise>
            <a href="#"class='page'>${status.index}</a>
        </c:otherwise>
        
      </c:choose>
      
      </c:forEach>
      
      <c:if test="${pagination.existNext}">
        <a href='${ctx}/customer.do?cmd=cust_list&page=list&page_num=${pagination.nextBlock}' >&raquo;</a>
      </c:if>
      </form>
      </div>    
    </div>
     * 
     * 
     * 
     * */
    
    
	return {init:init,
			list:list}
})();
	