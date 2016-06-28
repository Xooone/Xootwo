// $(function() {
// 	$('.yufu').click(function(){

// 		$(".box").show();
// 		$(".alert_one").show();
// 		$("body").css("overflow","hidden");
//     var val = $('form').serialize();
//     $.post('http://wx.tenmaker.com/tenmaker/server/intomusic/activity/enroll', val, function(data) {console.log(data)});

//     e || e.preventDefault();
//     alert('提交成功！');

// 	});
// 	$('.daihui a').click(function(){

// 		$(".box").hide();
// 		$(".alert_one").hide();
// 		$("body").css("overflow","auto");

// 	});
// 	$('.saoma').click(function(){

// 		$(".box").show();
// 		$(".alert_four").show();
// 		$("body").css("overflow","hidden");

// 	});
// 	$('.zhuce').click(function(){

// 		$(".box").show();
// 		$(".alert_two").show();
// 		$("body").css("overflow","hidden");

// 	});
// 	$('.cha').click(function(){

// 		$(".box").hide();
// 		$(".alert_two").hide();
// 		$(".alert_four").hide();
// 		$("body").css("overflow","auto");

// 	});
// //	短信验证码
// 	var $input = $(".fake-box input");
//             $("#pwd-input").on("input", function() {
//                 var pwd = $(this).val().trim();
//                 for (var i = 0, len = pwd.length; i < len; i++) {
//                     $input.eq("" + i + "").val(pwd[i]);
//                 }
//                 $input.each(function() {
//                     var index = $(this).index();
//                     if (index >= len) {
//                         $(this).val("");
//                     }
//                 });
//                 if (len == 6) {
//                     //执行其他操作
//                 }
//             });
// 	});

// //倒计时
// var countdown=60;
// function settime(obj) {
//     if (countdown == 0) {
//         obj.removeAttribute("disabled");
//         obj.value="发送";
//         countdown = 60;
//          document.getElementById("SunNav").className="send";

//         return;
//     } else {
//         obj.setAttribute("disabled", true);
//         obj.value="" + countdown + "s后重新发送";
//         countdown--;
//         document.getElementById("SunNav").className="send_hover";
//     }
// setTimeout(function() {
//     settime(obj) }
//     ,1000)
// }
//
$(function() {

/*  $('.yufu').click(function(e){

    // $(".box").show();
    // $(".alert_one").show();
    // $("body").css("overflow","hidden");
    //
    /!*var val = $('form').serialize();
    $.post('http://wx.tenmaker.com/tenmaker/server/intomusic/activity/enroll', val, function(data) {console.log(data)});

    e || e.preventDefault();
    alert('提交成功！');*!/
  });*/
  $('.daihui a').click(function(){

    $(".box").hide();
    $(".alert_one").hide();
    $("body").css("overflow","auto");

  });
  $('.saoma').click(function(){

    $(".box").show();
    $(".alert_four").show();
    $("body").css("overflow","hidden");

  });
  $('.zhuce').click(function(e){

    // $(".box").show();
    // $(".alert_two").show();
    // $("body").css("overflow","hidden");
    e || e.preventDefault();
    alert('内测中，敬请期待！');

  });
  $('.cha').click(function(){

    $(".box").hide();
    $(".alert_two").hide();
    $(".alert_four").hide();
    $("body").css("overflow","auto");

  });
//  短信验证码
  var $input = $(".fake-box input");
            $("#pwd-input").on("input", function() {
                var pwd = $(this).val().trim();
                for (var i = 0, len = pwd.length; i < len; i++) {
                    $input.eq("" + i + "").val(pwd[i]);
                }
                $input.each(function() {
                    var index = $(this).index();
                    if (index >= len) {
                        $(this).val("");
                    }
                });
                if (len == 6) {
                    //执行其他操作
                }
            });
  });

//倒计时
var countdown=60;
function settime(obj) {
    if (countdown == 0) {
        obj.removeAttribute("disabled");
        obj.value="发送";
        countdown = 60;
         document.getElementById("SunNav").className="send";

        return;
    } else {
        obj.setAttribute("disabled", true);
        obj.value="" + countdown + "s后重新发送";
        countdown--;
        document.getElementById("SunNav").className="send_hover";
    }
setTimeout(function() {
    settime(obj) }
    ,1000)
}

