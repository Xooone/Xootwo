var music=document.getElementById("bgMusic");
$(".music_btn").click(function(){
if(music.paused){
	music.play();
$(".music_btn").addClass("zhongduan");
}else{
	music.pause();
$(".music_btn").removeClass("zhongduan");}
});


  
  
  
