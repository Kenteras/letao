$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render()

    function render() {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            dataType: "json",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success:function(res){
                var htmlStr = template("taletwo", res)
                $('tbody').html(htmlStr);

                $('.pagination').bootstrapPaginator({

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
               $('#addition').click(function(){
                   $('#forbid').modal("show");
               })

               $.ajax({
                type: "get",
                url: "/category/queryTopCategoryPaging",
                dataType: "json",
                data: {
                    page: 1,
                    pageSize: 10
                },
    
                //调用后台数据渲染
                success: function (res) {
                    var htmlSrt = template("tale", res);
                    $(".dropdown-menu").html(htmlSrt);
                }
             })

             $("#fileupload").fileupload({
                dataType:"json",
                //e：事件对象
                //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
                done:function (e, data) {
                  console.log(data);
                  $('#img').attr("src",data.result.picAddr);
                }
          });

          $('.dropdown-menu').on("click", "a", function(){

            $('#span').text($(this).text());

          })
})