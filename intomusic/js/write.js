


(function () {

    //write

    var formDiv=$('.phone_form').get(0);
    var formInps=formDiv.getElementsByTagName('input');
    //var re=/^(1[0-9]{2}[0-9]{8})|(15[89][0-9]{8})$/;
    var re=/^(1[2-9]{1}[0-9]{9})$/;



    formInps[0].onblur= function () {

        if(this.value==''){
            $('.hint').fadeIn(500);
            $('.hint').html("必填");
            //$(this).css('border','2px red solid');
        }
    }
    formInps[1].onkeydown=function(ev){
        var oEvent = ev || event;
        if (oEvent.keyCode != 9 &&oEvent.keyCode != 8 && (oEvent.keyCode < 48 || oEvent.keyCode > 57))
        {
            return false;
        }

    }
    formInps[1].onblur= function () {
        if(this.value=="")
        {
            $('.hint').fadeIn(500);
            $('.hint').html("请输入您的手机号");
            //$(this).css('border','2px red solid');

        }
        else if(!re.test(this.value))
        {
            $('.hint').fadeIn(500);
            $('.hint').html("您的手机号码输入有误");
            //$(this).css('border','2px red solid');

        }
        else
        {
            $('.hint').fadeOut(500);
        }

    }
    $('.yufu').click(function(ev){
        var oEvent=ev||event;
        for(var i=0; i<formInps.length; i++){
            if(formInps[i].value==""){
                $('.hint').fadeIn(500);
                $('.hint').html("请确认后在提交");
            }
            else if(!re.test(formInps[1].value)){
                $('.hint').fadeIn(500);
                $('.hint').html("请确认后在提交");
            }
            else{
                var tempV=[];
                for(var i=0; i<formInps.length;i++){
                    tempV.push(formInps[i].value)
                }
                //alert(tempV);
                $.ajax({
                    url: '',
                    async:true,
                    data:{
                        name:tempV[0],
                        contact:tempV[1],
                        purpose:tempV[2],
                        style:tempV[3],
                        invite:tempV[4],
                    },
                    dataType: 'json',
                    success: function(data){
                        alert(data)
                    },
                    error:function(){
                        alert('提交失败');
                    }
                });



            }

        }
    })

})()


