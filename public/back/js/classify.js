$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render()

    function render() {

        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },

            //调用后台数据渲染
            success: function (res) {
                var htmlSrt = template("tale", res);
                $("tbody").html(htmlSrt);

                //    分页器渲染
                $(".pagination").bootstrapPaginator({
                    //设置版本号
                    bootstrapMajorVersion: 3,
                    // 显示第几页
                    currentPage: res.page,
                    // 总页数
                    totalPages: Math.ceil(res.total / res.size),
                    //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
                    onPageClicked: function (a, b, c, page) {
                        // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                        currentPage = page;

                        render();
                    }
                })
            }
        })
    }

    $('#addition').click(function () {
        $('#forbid').modal("show");
    });

    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 校验字段, 一定要先配置 input 的 name
        fields: {
          categoryName: {
            validators: {
              notEmpty: {
                message: "请输入一级分类名称"
              }
            }
          }
        }
      });

    $("#form").on("success.form.bv", function( e ){

        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            dataType:"json",
            data:$("#form").serialize(),
            success:function(res){
                if(res.success){
                    $('#forbid').modal("hide");

                    currentPage = 1;

                    render();

                    //重置表格内容
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })

})