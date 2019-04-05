"use strict";
var prod =  prod || {} ;

prod =(()=>{
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
			$.when(
				$.getScript(compojs)
			).done(()=>{
				carousel();
				post();
				
			})
			.fail(()=>{
              alert('prod/prod.js 를 찾지  못했습니다.');
          });
			
		};
		let post =()=>{
			setpath();
			 $(r_cnt).html(compo.prod_post());
			 $('#prd_post_btn').click(e=>{
				 e.preventDefault();
				 
				 let freebies = [];
				 $(".checks:checked").each(function(i){
					 freebies.push($(this).val());
				 });
				 let pname = $('#product_name').val();
				 let price = $('#price').val();
				 let unit = $('#unit').val();
				 
				 if($.fn.nullChecker([pname,price,unit])){
					 alert('빈칸을 입력해주세요');
				 }else{
					 alert('성공 널이 아닙니다');
				 }
				 
				 let data = {categoryID:$('#category_name option:selected').val(),
							productName:pname,
							price:price,
							unit:$('#unit').val(),
							supplierID:$('#supplier_name').val(),
							color:$('input[name=color]:checked').val(),
							freebies:freebies,
							comment:$('#comment').text()};
				 $.ajax({
					 url: $.ctx()+'/phones',
					 type: 'POST',
					 data: JSON.stringify(data),
					 dataType:'json',
					 contentType:'application/json',
					 success:d=>{
							alert('성공');
							/*lst(1);*/
						},
						error:e=>{
							alert('에러');
						}
				 })
			 });
			$('#img_upload_btn').click(function(){
				setpath();
				alert('업로드 눌렀다');
				let ok = (this.files[0].name.match(/jsp|gif|png|jpeg/i)) ? true : false;
				if (ok) {
					/*let fd = new FormData();
					fd.append(this.files[0]);*/
					$('#img_upload').attr('action',_+'/phones/files')
					$.ajax({
						url : $('#img_upload').attr('action'),
						type : 'POST',
						dataType : 'text',
						enctype : "mulitpart/form-data",
						beforSubmit : function (){
							alert('로딩');
						},
						success : d=>{
							alert('파일업로드 성공');
						},
					}).submit();
				} else {
					alert('gif,png,jpg,jpeg 파일만 업로드 할수있습니다');
				}
				
			});
			
		};
		let get=()=>{
			
		};
		let put=()=>{
			
		};
		let del=()=>{
			
		};
		
		let carousel =()=>{
			$(r_cnt).html(compo.cust_carousel());
			$('div #myCarousel').after(compo.prod_post());
		};
		
		return {init:init,
			post,post}
	})();