var auth = auth || {};
auth = (()=>{
     let _,js,compojs,r_cnt,l_cnt;
     let init =()=>{
          _ = $.ctx();
          js = $.js();
          compojs = js+'/component/compo.js';
          r_cnt = '#right_content';
          l_cnt = '#left_content';
          onCreate();
     };
     let onCreate =()=>{
          setContentView();
     };
     let setContentView =()=>{
          $.getScript(compojs)
          .done(()=>{
             
               $(r_cnt).empty();
               $(compo.cust_login_form())
                   .appendTo(r_cnt);
               login();
              $(l_cnt+' ul.nav').empty();
              let arr=[{
                   txt : '로그인', name : 'login'
              },{
                   txt : '회원가입', name : 'join'
              },{
                   txt : '사원등록', name : 'register'
              },{
                   txt : '사원접속', name : 'access'
              }];
              
              $.each(arr,(i,j)=>{
                    $('<li><a  href="#">'+j.txt+'</a></li>')
                    .attr('name', j.name)
                    .appendTo(l_cnt+' ul.nav')
                    .click(function(){
                         let that = $(this).attr('name');
                         switch(that){
                         case 'login':
                              $(r_cnt).empty();
                              $(compo.cust_login_form())
                              .appendTo(r_cnt);
                              login(); 
                              break;
                         case 'join':
                              $(r_cnt).empty();
                              $(compo.cust_join_form())
                              .appendTo(r_cnt);
                              break;
                         case 'register':
                              $(r_cnt).empty();
                              $(compo.emp_access_form()
                                       )
                              .appendTo(r_cnt);
                              break;
                         case 'access':
                              $(r_cnt).empty();
                               $(compo.emp_register_form())
                              .appendTo(r_cnt);
                              break;
                         }
                    }); //클릭
              }); //each
          }) //done
          .fail(()=>{
              alert('component/compo.js 를 찾지  못했습니다.');
          });
     }; //setContenview이다.
     let login =()=>{
          $('form button[type=submit]').click(e=>{
              let data = {
                        customerID:$('form input[name=uname]').val(),
                        password:$('form input[name=psw]').val()};
               $.ajax({
                    url : _+'/cust/login',
                    type : 'POST',
                    dataType : 'json',
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : d =>{
                         alert('성공'+d.customerID);
                    },
                    error : e=>{
                         alert('실패');
                    }
               }); // $.ajax
           }); //클릭이벤트
     }; //login
     let join =()=>{};
     let register =()=>{};
     let access =()=>{};
     return {init:init};
})();