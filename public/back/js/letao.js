$(function(){

    //使用表单校验插件
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',//校验成功
          invalid: 'glyphicon glyphicon-remove',//校验失败
          validating: 'glyphicon glyphicon-refresh'//校验中
        },
      
        //3. 指定校验字段
        fields: {
          //校验用户名，对应name表单的name属性
          username: {
            validators: {
              //不能为空
              notEmpty: {
                message: '用户名不能为空'
              },
              //长度校验
              stringLength: {
                min: 2,
                max: 6,
                message: '用户名长度必须在2到6之间'
              },
              callback:{
                message: '用户名不存在' 
              }
            }
          },
          password: {
            validators: {
              //不能为空
              notEmpty: {
                message: '密码不能为空'
              },
              //长度校验
              stringLength: {
                min: 6,
                max: 12,
                message: '用户名长度必须在6到12之间'
              },
              callback:{
                message: '密码与用户名不匹配' 
              }
            }
          },
        }
      
      });

      $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            dataType:"json",
            data:$("#form").serialize(),
            success: function(info){
                if(info.error === 1000){
                    //用户名不存在
                    $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
                    return;
                }
                if(info.error === 1001){
                    //密码错误
                    $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback");
                    return;
                }
                if(info.success){
                    location.href = "index.html";
                    return;
                }
            }

        })
    });

    //重置功能

    $('.fler').click(function(){
        $("#form").data('bootstrapValidator').resetForm(
        );
    })

});

$(function(){

  $('.classify .next').click(function(){
    $(this).next().stop().slideToggle();
  })

  $('.icon_menu').click(function(){
    $('.top_fixed').toggleClass("hideing");
    $('.left_fixed').toggleClass("hideing");
    $('.impor').toggleClass("hideing");
  })

  $('.icon_logout').click(function(){
    $('#modeka').modal("show");
  })

  // 模态框退出按钮事件
  $('#log_out').click(function(){

    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      dataType:"json",
      success:function(res){
        if(res.success) {
          location.href = "login.html";
        }
      }
    })
  })
})