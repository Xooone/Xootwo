


(function() {
    $('.a1').click(function () {
        var a1Div=document.createElement("div");
        a1Div.setAttribute('class','a1div');
        var a1img=document.createElement('img');
        a1img.src='images/wechatp.jpg';

        var a1btn=document.createElement('button');

        a1Div.appendChild(a1img);
        a1Div.appendChild(a1btn);
        $('.a1').append(a1Div);
        a1btn.onclick=function(ev)
        {
            var oEvent=ev||event;
            $('.a1div').remove();
            oEvent.stopPropagation();
        }
    });
   /* $('#show-list').click(function(){

        $('.music_list').removeClass("music_list");

    })*/

    //
    var config = {
        viewFactor : 0.15,
        duration   : 800,
        distance   : "0px",
        scale      : 0.8
    };

    window.sr = ScrollReveal( config );

    if (sr.isSupported()) {
        document.documentElement.classList.add('sr');
    }
    var musicS = {
        reset    : true,
        origin   : "top",
        distance : "24px",
        duration : 1500,
        scale    : 1.05
    };

    var intro1 = {
        reset    : true,
        origin   : "left",
        distance : "1000px",
        duration : 800,
        delay    : 800,
        scale    : 1
    };
    var intro2={
        reset     : true,
        origin    : "right",
        distance  : "1000px",
        duration  : 800,
        delay      :800,
        scale      : 1
    }
    var bottom={
        reset     : true,
        origin    :"bottom",
        distance   :"200px",
        duration    :500,
        delay        :500,
        scale        :0.5
    }
    sr.reveal( ".demo",{ reset: true, viewOffset: { top: 64 } } );
    sr.reveal( ".musicS", musicS );
    sr.reveal( ".intro1", intro1 );
    sr.reveal(".intro2", intro2);
    sr.reveal('.bottom',bottom);
    sr.reveal('.banner',bottom);



    var head = document.querySelector(".head1");
    var navsign  = document.querySelector(".navsign");

    window.addEventListener( "scroll", scrollBrain, false );

    var body = document.body,
        html = document.documentElement;

    var height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );

    function scrollBrain(){

        if ( window.pageYOffset >= navsign.offsetTop + 64 ){
            return head.classList.add("visible")
        }
        if ( head.classList.contains("visible") ){
            return head.classList.remove("visible");
        }
        if ( window.pageYOffset >= 0.85 * ( height - window.clientHeight ) ) {
            _gaq.push([ '_trackEvent', 'Behavior', 'Scroll', 'Viewed the entire page.']);
        }
    }


})();







