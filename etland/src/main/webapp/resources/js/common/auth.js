var auth = auth || {};
auth.permission = (()=>{
    //let _ = $.ctx();
    //let js = $.js();
    //let compojs = $.js()+'/component/compo.js';
    let rightCtnt = $('#right_content');
    
    let init = ()=>{
        onCreate();
    };
    let onCreate = ()=>{
        setContentView();
    };
    let setContentView = ()=>{
        
    };
        let login = ()=>{
        $.getScript($.js()+'/component/compo.js')
        .done(()=>{
            rightCtnt.html(compo.cust_login_form());
            $('form button[type=submit]').click(()=>{
                let data = {
                        customerID : $('form input[name=uname]').val(),
                        password : $('form input[name=psw]').val()
                };
                $.ajax({
                    url : $.ctx()+'/cust/login/',
                    type : 'post',
                    data : JSON.stringify(data),
                    dataType : 'json',
                    contentType : 'application/json',
                    success : d =>{},
                    error : e=>{}
                });
            });
            $('#left_content > .nav').empty();
            let arr = [
                {name :'login',text :'로그인'},
                {name :'sign',text :'회원가입'},
                {name :'regist',text :'사원등록'},
                {name :'access',text :'사원로그인'}];
        
            $.each(arr,(i,j)=>{
                $('<li><a>'+j.text+'</a></li>')
                .appendTo('#left_content > .nav')
                .attr('name',j.name)
                .click(function(){
                    let that = $(this).attr('name');
                    switch(that){
                    case 'login':
                        rightCtnt.empty();
                        $(compo.cust_login_form()).appendTo('#right_content');
                        $('form button[type=submit]').click(()=>{
                            alert('버튼누름');
                        });
                        break;
                    case 'sign':
                        rightCtnt.empty();
                        $(compo.cust_join_form()).appendTo('#right_content');
                        break;
                    case 'regist':
                        rightCtnt.empty();
                        $(compo.cust_login_form()).appendTo('#right_content');
                        break;
                    case 'access':
                        rightCtnt.empty();
                        $(compo.cust_login_form()).appendTo('#right_content');
                        break;
                    }
                });
            })
        })
        .fail(()=>{
            alert('component/compo.js 를 찾지 못했다.');
        });
    };
    let join = ()=>{
        $.getScript($.js()+'/component/compo.js')
        .done(()=>{
            $('#right_content').html(compo.cust_join_form());
        })
        .fail(()=>{
            alert('component/compo.js 를 찾지 못했다.');
        });
    };
    let mypage = ()=>{};
    return {
        login : login,
        join : join,
        mypage : mypage
    };
})();