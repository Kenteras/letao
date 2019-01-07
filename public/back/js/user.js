$(function(){

    var currentId;
    var isDelete;

    var currentPage = 1;
    var pageSize = 5;

    render();
    
    function render(){

        $.ajax({
            type:"get",
            url:"/user/queryUser",
            dataType:"json",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(res){
                console.log(res);
                var htmlStr = template("table", res)
                $('tbody').html(htmlStr);

                // 分页器渲染
                $('.pagination').bootstrapPaginator({
                    // 版本号:
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: res.page,
                    //向上取整总页数
                    totalPages:Math.ceil(res.total / res.size),
                    //添加页码点击事件
                    onPageClicked: function(a, b, c, page ){
                        currentPage = page;

                        render();
                    }


                })
            }
        });
    }
                 
                //禁用和启用按钮事件
                $('.table').on("click", ".btn", function(){
                    //模态框弹出 
                    $('#forbid').modal("show");
                    //获取当前按钮的Id
                    currentId = $(this).parent().data("id");

                    //获取需修改成的状态
                    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
                });

                $("#open").click(function() {
                    $.ajax({
                      type:"post",
                      url:"/user/updateUser",
                      dataType:"json",
                      data:{
                        id:currentId,
                        isDelete:isDelete
                      },
                      success:function(res){
                          if(res.success){
                              $('#forbid').modal("hide");
      
                              // 刷新页面
                              render();

                          }
                      }
                    })
                })
})