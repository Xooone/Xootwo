window.onload=function(){
	var oban=$(".gushi_btn img").height();
	$(".gushi_btn").css("margin-top",-oban/2);
};

$(".huan em").click(function(){
	$(".huan").removeClass("huanh");
	var audioEle =$(this).parent().find('.audio1');
	var oAudioE = $(this).parent().find(".audio1")[0];
	/*点击的当前音频索引值*/
	var oAudioIndex = audioEle.attr('data-index');
	/*点击的当前音频播放状态值*/
	var oAudioAttr = audioEle.attr('data-status');
	/*点击的当前音频背景*/
	var oAudioBg =$(this).parent();
	var oAudio = $(this).parent().parent().parent().parent().parent();
	var oAudioLength = $(this).parent().parent().parent().parent().parent().find(".audio1").length;
	
	for(var i=0;i<oAudioLength;i++){
		if(i == oAudioIndex){
			if(oAudioAttr=='1'){
				oAudio.find(".audio1")[i].pause();
				oAudio.find(".audio1").eq(i).attr('data-status','0');
				oAudioBg.removeClass("huanh");
			}else{
				oAudio.find(".audio1")[i].play();
				oAudio.find(".audio1").eq(i).attr('data-status','1');
				oAudioBg.addClass("huanh");
			}
		}else{
			oAudio.find(".audio1")[i].pause();
			oAudio.find(".huan").eq(i).remove("huanh");
			oAudio.find(".audio1").eq(i).attr('data-status','0');
		}
	}
	
});



$('.gushi_t a').click(function(){
	var index = $(this).index();
	$(this).addClass('ahover').siblings().removeClass('ahover');
	$(".gushi_b_con").eq(index).show().addClass('active').siblings().removeClass('active').hide();
	/*暂停所有播放中的音乐*/
	var allAudio = $(".gushi_b").find(".audio1").length;
	for(var i=0;i<allAudio;i++){
		$(".gushi_b").find(".audio1")[i].pause();
		$(".gushi_b").find(".huan").eq(i).remove("huanh");
		$(".gushi_b").find(".audio1").eq(i).attr('data-status','0');
	}
	});