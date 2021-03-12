$(function () {

    //获取所有属性
    $.get("http://localhost:9200/attrs",{},function (result) {
        showData(result.data);
        showSelectData(result.data);
        showUserAttr(result.data);
    });
    //attrs.html展示数据
    function showData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td class='txt-oflo'>" + data[i].attr + "</td>" +
                "<td class='txt-oflo'>"+data[i].info+"</td>" +
                "<td class=\"txt-oflo\">" +
                "            <span class=\"js-sweetalert\">\n" +
                "                <button class=\"btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float\" data-type="+ data[i].attr +"><i class=\"zmdi zmdi-edit\"></i></button>\n" +
                "            </span>" +
                "            <span class=\"js-deletealert\">\n" +
                "                <button class=\"btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float\" data-type="+ data[i].attr +"><i class=\"zmdi zmdi-delete\"></i></button>\n" +
                "            </span>" +
                "</tr>";
            //追加到table中
            $("#tab").append(str);
        }
    }

    function showSelectData(data) {
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = '<tr>\n' +
                '      <td>\n' +
                '          <div>\n' +
                '               <span>'+data[i].attr+'</span>\n' +
                '          </div>\n' +
                '       </td>\n' +
                '      <td>\n' +
                '         <div class="switch">\n' +
                '             <label>\n' +
                '                <input type="checkbox" name="newSelectAttr" value='+data[i].attr+'>\n' +
                '                <span class="lever"></span>\n' +
                '             </label>\n' +
                '         </div>\n' +
                '      </td>\n' +
                ' </tr>'
            //追加到table中
            $("#select_attr").append(str);
        }
    }

    //addUser.html
    function showUserAttr(data){
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = '<tr>\n' +
                '      <td>\n' +
                '          <div>\n' +
                '               <span>' + data[i].attr + '</span>\n' +
                '          </div>\n' +
                '       </td>\n' +
                '      <td>\n' +
                '         <div class="switch">\n' +
                '             <label>\n' +
                '                <input type="checkbox" name="UserSelectAttr" value=' + data[i].attr + '>\n' +
                '                <span class="lever"></span>\n' +
                '             </label>\n' +
                '         </div>\n' +
                '      </td>\n' +
                ' </tr>'
            $("#select_user_attr").append(str);
        }
    }

    //添加属性
    $("#addAttrButton").click(function () {
        $.post({
            url : "http://localhost:9200/addAttr",
            data : JSON.stringify($("#addAttrForm").serializeJSON()),
            headers: {
                'Content-Type': 'application/json'
            },
            success : function(data) {
                alert("添加属性成功!")
                window.location.reload();
            },
            error : function() {
                alert("添加属性失败!")
            }
        })
    });

    //获取所有对象
    $.get("http://localhost:9200/users",{},function (result) {
        showUsers(result.data);
    });
    function showUsers(data) {
        // var str = "";//定义用于拼接的字符串
        // for(var i=0; i < data.length;i++){
            // str = '<div class="col-lg-4 col-md-6 col-sm-12">\n' +
            //     '                <div class="card all-patients">\n' +
            //     '                    <div class="body">\n' +
            //     '                        <div class="row">\n' +
            //     '                            <div class="col-md-4 col-sm-4 text-center m-b-0">\n' +
            //     '                                <a href="#" class="p-profile-pix"><img src="assets/images/patients/random-avatar3.jpg" alt="user" class="img-thumbnail img-fluid"></a>\n' +
            //     '                            </div>\n' +
            //     '                            <div class="col-md-8 col-sm-8 m-b-0">\n' +
            //     '                                <h5 class="m-b-0">'+data[i].username+
            //     '                                    <span class="js-deletealert edit">\n' +
            //     '                                        <button class=" btn-default waves-effect" style="margin: 0px;border:none;" data-type='+data[i].username+'>\n' +
            //     '                                            <i class="zmdi zmdi-delete" style="color:#0275d8"></i>\n' +
            //     '                                        </button>\n' +
            //     '                                    </span>\n' +
            //     '                                    <a href="user_detail.html?username='+encodeURI(data[i].username)+'" class="edit"><i class="zmdi zmdi-edit"></i></a>' +
            //     '                                </h5> ' +
            //     '                                <small>邮箱:'+data[i].email+'</small>\n<br>' +
            //     '                                <span style="word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;">属性：'+data[i].attr+'</span><br>' +
            //     '                                <small>' +
            //     '                                    电话:'+data[i].phone+'\n' +
            //     '                                </small>\n' +
            //     '                            </div>\n' +
            //     '                        </div>\n' +
            //     '                    </div>\n' +
            //     '                </div>\n' +
            //     '            </div>'
            // str = ''
        var str = "";//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = "<tr>" +
                "<td>" + (i+1) + "</td>" +
                "<td class='txt-oflo'>" + data[i].username + "</td>" +
                "<td class='txt-oflo'>"+data[i].attr+"</td>" +
                "<td class=\"txt-oflo\">" +
                "        <a href='user_detail.html?username="+encodeURI(data[i].username)+"' class=\"edit\"><i class=\"zmdi zmdi-edit\"></i></a>" +
                "            <span class=\"js-deletealert edit\">\n" +
                "              <button class=\" btn-default waves-effect\" style=\"margin: 0px;border:none;\" data-type="+data[i].username+">\n" +
                "                   <i class=\"zmdi zmdi-delete\" style=\"color:#0275d8\"></i>\n" +
                "              </button>\n" +
                "        </span>\n" +
                "</tr>";
            //追加到table中
            $("#allUser").append(str);
        }
    };

    //添加新用户
    $("#addUserButton").click(function () {
        // var data1 = JSON.stringify($("#addUserForm").serializeJSON())
        // console.log(data1);
        var checkbox=document.getElementsByName('newSelectAttr');
        var attr = getSelectAttr(checkbox);
        var username = $("#addUserName").val();
        // console.log(attr)
        // console.log($("#addUserName").val())
        $.post({
            url : "http://localhost:9200/addUser",
            data : JSON.stringify({"username":username,"attr":attr}),
            headers: {
                'Content-Type': 'application/json'
            },
            xhrFields: {
                withCredentials: true
            },
            success : function(data) {
                alert("添加用户成功!");
                window.location.reload();
            },
            error : function() {
                alert("添加用户失败!")
            }
        })
    });


    function getSelectAttr(obj){
        var arr=new Array();
        for(var i=0;i<obj.length;i++){
            if(obj[i].checked==true){
                arr.push(obj[i].value);
            }
        }
        return arr;
    }

    //获取所有ul名单
    $.get("http://localhost:9200/user/files",{},function (result) {
        console.log(result.data);
        showUl(result.data);
    });

    function showUl(data){
        var str = '';
        for(var i=0; i<data.length;i++){
            str = '<tr>\n' +
                '                                    <td>'+(i+1)+'</td>\n' +
                '                                    <td>'+data[i]+'</td>\n' +
                '                                    <td><span class="js-deletealert edit deleteBlack">\n' +
                '                                        <button class="btn-default waves-effect " style="margin: 0px;border:none;" data-type='+data[i]+'>\n' +
                '                                            <i class="zmdi zmdi-delete" style="color:#0275d8"></i>\n' +
                '                                        </button>\n' +
                '                                    </span></td>\n' +
                '                                </tr>'
            $("#black_table").append(str)
        }
    }

    $(document).on("click", ".deleteBlack button", function (e) {
        var fileName = $(this).data('type');
        console.log(fileName);
        deleteBlackConfirmMessage(fileName);
    })

    function deleteBlackConfirmMessage(fileName) {
        swal({
            title: "确定删除该文件?",
            text: "确定删除【"+fileName+"】文件!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的，删除!",
            closeOnConfirm: false,
            html: true,
        }, function () {
            $.ajax({
                url : "http://localhost:9200/deleteFile",
                xhrFields: {
                    withCredentials: true
                },
                async : false,
                type : "POST",
                contentType : 'application/json',
                dataType : 'json',
                data :JSON.stringify({"fileName" : fileName}),
                success : function(result) {
                    swal("成功删除!", "该文件成功删除.", "success");
                    window.location.reload();
                },
                error : function() {
                    alert("删除文件失败!")
                }
            });

        });
    }

    $("#trance_btn").click(function () {
        var fileName = $("#tranceFileName").val();
        console.log(fileName);
        $.ajax({
            url : "http://localhost:9200/trance",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"fileName" : fileName}),
            success : function(result) {
                showBlacks(result.data);
            },
            error : function() {
                alert("获取文件失败!")
            }
        });
    });

    //追溯用户id
    function showBlacks(data){
        str = '<div class="card">' +
            '<div class="col-lg-12 col-md-12 col-sm-12">\n' +
            '                <div class="card">\n' +
            '                    <div class="body">\n' +
            '                        <div class="member-card verified">                            \n' +
            '                            <div class="thumb-xl member-thumb">\n' +
            '                                <img src="assets/images/random-avatar4.jpg" class="img-thumbnail rounded-circle" alt="profile-image">                               \n' +
            '                            </div>\n' +
            '\n' +
            '                            <div class="">\n' +
            '                                <h4 class="m-b-5 m-t-20">'+data.username+'</h4>\n' +
            '                                <p class="text-muted">Dentist<span> <a href="#" class="text-pink">'+data.email+'</a> </span></p>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <p class="text-muted">'+data.attr+'</p>                           \n' +
            '                            <a href="user_detail.html?username='+encodeURI(data.username)+'"  class="btn btn-raised btn-sm">查看详情</a>\n' +
            '                            <button type="button" value='+data.username+' id="isAddBlack" class="btn btn-raised g-bg-cyan">撤销用户</button>\n'+
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>' +
            '</div>';
        $("#showBlack").append(str);
    }

    $(document).on("click", "#isAddBlack", function (e) {
        var username = this.value;
        $.ajax({
            url : "http://localhost:9200/addBlack",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"username" : username}),
            success : function(result) {
                alert("成功加入黑名单")
            },
            error : function() {
                alert("失败!")
            }
        });
    })


});