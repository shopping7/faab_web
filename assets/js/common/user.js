$(function () {

    //1 获取用户数据
    $.post({
        url : "http://localhost:9200/user/info",
        data : "",
        headers: {
            'Content-Type': 'application/json'
        },
        xhrFields: {
            withCredentials: true
        },
        success : function(result) {
            showProfile(result.data);
        },
        error : function() {
            alert("获取用户信息失败!")
        }
    });

    function showProfile(data) {
        var str = '<strong>姓名</strong>\n' +
                '                        <p>' + data.username + '</p>\n' +
                '                        <strong>性别</strong>\n' +
                '                        <p>' + data.sex + '</p>\n' +
                '                        <strong>邮箱</strong>\n' +
                '                        <p>' + data.email + '</p>\n' +
                '                        <strong>联系号码</strong>\n' +
                '                        <p>' + data.phone + '</p>\n' +
                '                        <strong>属性</strong>\n' +
                '                        <address>' + data.attr + '</address>';
            //追加到table中
            $("#personal_info").append(str);
            var name = '<strong>'+data.username+'</strong>';
            $(".showName").append(name);
    }






    //下载文件
    // $("#get_File_btn").click(function () {
    //     $.ajax({
    //         url : "http://localhost:9000/user/getFile",
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         async : false,
    //         type : "POST",
    //         dataType : 'json',
    //         processData: false,
    //         contentType: false,
    //         data :new FormData(document.getElementById('get_File_Form')),
    //         xhrFields: {
    //             withCredentials: true
    //         },
    //         success : function(result) {
    //             console.log("上传成功");
    //         },
    //         error : function() {
    //             alert("失败!")
    //         }
    //     });
    // });




});