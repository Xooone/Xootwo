$(function() {
	$('.zk').click(function(){
		$(".yinghua_lf_b_text").toggleClass("heightauto");	
		if($(".yinghua_lf_b_text").hasClass("heightauto")){
			$('.zk').html("收起");
		}
		else{
			$('.zk').html("展开");
		}
	});
});
$(function(){
	$('.showmore').click(function () {
		$('.yinghua_con').toggleClass('yinghua_stroy');
		if($('.showmore').html()=='展开'){
			$('.showmore').html("收起");

		}
		else{
			$('.showmore').html('展开');

		}
	})
})
$(function() {
	$('.like_ico').click(function(){
		$(".like_ico").toggleClass("ahover");	
	});
});

$(function() {
	
});