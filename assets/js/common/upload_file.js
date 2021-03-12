$(function () {


    var AttrData;
    $.get("http://localhost:9200/attrs",{},function (result) {
        showPolicyAttr(result.data)
        AttrData = result.data
    });
    function showPolicyAttr(data) {
        var str = '';//定义用于拼接的字符串
        for (var i = 0; i < data.length; i++) {
            str = '<option value='+data[i].attr+'>'+data[i].attr+'</option>\n'
            //追加到table中
            $("select[name='policyAttr']").append(str);
        }
    }

    $('#addSelectInput').click(function () {
        var str = '<div class="row clearfix">\n' +
            '                            <div class="col-sm-2 col-xs-8">\n' +
            '                                <div class="form-group drop-custum">\n' +
            '                                    <select class="form-control show-tick">\n' +
            '                                        <option value="">-- 符号  --</option>\n' +
            '                                        <option value=" AND ">与</option>\n' +
            '                                        <option value=" OR ">或</option>\n' +
            '                                       <option value=" AND (">与(</option>\n' +
            '                                       <option value=" OR (">或(</option>\n' +
            '                                    </select>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="col-sm-3 col-xs-6">\n' +
            '                                <div class="form-group drop-custum">\n' +
            '                                    <select class="form-control show-tick" name="policyAttr">\n' +
            '                                        <option value="">-- 属性 --</option>\n' +
            '                                        <option value="Cash">Cash</option>\n' +
            '                                    </select>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="col-sm-2 col-xs-8">\n' +
            '                                <div class="form-group drop-custum">\n' +
            '                                    <select class="form-control show-tick">\n' +
            '                                        <option value=""> -- 符号 --</option>\n' +
            '                                       <option value=")">)</option>\n' +
            '                                       <option value="))">))</option>\n' +
            '                                       <option value=")))">)))</option>\n' +
            '                                    </select>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                          <button type="button" id="removeSelect" class="btn btn-raised btn-default btn-circle waves-effect waves-circle waves-float"> <i class="material-icons">remove</i> </button>\n' +
            '                        </div>'
        $('#addSelectPosition').append(str);
        showPolicyAttr(AttrData)
    });


    $(document).on("click", "#removeSelect", function (e) {
        var obj = this.parentNode;
        obj.parentNode.removeChild(obj);
    })



    //上传文件
    $("#upload_btn").click(function () {
        var str = ''
        $( "select option:selected" ).each(function() {
            str += this.value;
        });
        console.log(str);
        var formData = new FormData(document.getElementById('upload_file_form'))
        formData.append("policy",str)
        $.ajax({
            url : "http://localhost:9200/user/uploadFile",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            dataType : 'json',
            processData: false,
            contentType: false,
            data :formData,
            xhrFields: {
                withCredentials: true
            },
            success : function(result) {
                alert("上传成功");
                window.location.reload();
            },
            error : function() {
                alert("上传失败!")
            }
        });
    });

    $("#test_select").click(function () {
        var str = ''
        $( "select option:selected" ).each(function() {
            str += this.value;
        });
        console.log(str);
    });

    //获取所有file名单
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
                '                                    <td><span class="js-deletealert edit getFile">\n' +
                '                                        <button class="btn-default waves-effect " style="margin: 0px;border:none;" data-type='+data[i]+'>\n' +
                '                                            <i class="material-icons" style="color:#0275d8">get_app</i>\n' +
                '                                        </button>\n' +
                '                                    </span></td>\n' +
                '                                </tr>'
            $("#file_table").append(str)
        }
    }

    $(document).on("click", ".getFile button", function (e) {
        const fileName = $(this).data('type');
        console.log(fileName);
        $.ajax({
            url : "http://localhost:9200/user/getFile",
            xhrFields: {
                withCredentials: true
            },
            async : false,
            type : "POST",
            contentType : 'application/json',
            dataType : 'json',
            data :JSON.stringify({"fileName" : fileName}),
            success : function(result) {
                if(result.data){
                    window.open(result.data);
                }else{
                    alert("您没有权限!")
                }
            },
            error : function() {
                alert("获取文件失败!")
            }
        });
    });





})