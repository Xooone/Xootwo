(function ($) {
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = false,
        playlist = [
            {
                title: '贝壳兔兔',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/beiketutu.mp3',
                ogg: '',
                lrc: 'song/beiketutu.lrc'
            },
            {
                title: '给雪寒',
                artist: '',
                album: '',
                cover: 'images/2.jpg',
                mp3: 'song/geixuehan.mp3',
                ogg: '',
                lrc: 'song/geixuehan.lrc'
            },
            {
                title: '老婆开心就好',
                artist: '',
                album: '',
                cover: 'images/3.jpg',
                mp3: 'song/laopokaixinjiuhao.mp3',
                ogg: '',
                lrc: ''
            },
            {
                title: '流连',
                artist: '',
                album: '',
                cover: 'images/3.jpg',
                mp3: 'song/liulian.mp3',
                ogg: '',
                lrc: ''
            },
            {
                title: '这样的一个你',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/zheyangyigeni.mp3',
                ogg: '',
                lrc: 'song/zheyangyigeni.lrc'
            },
            {
                title: '德为先',
                artist: '',
                album: '',
                cover: 'images/3.jpg',
                mp3: 'song/deweixian.mp3',
                ogg: '',
                lrc: 'song/deweixian.lrc'
            },
            {
                title: '望柚子',
                artist: '',
                album: '',
                cover: 'images/2.jpg',
                mp3: 'song/wangyouzi.mp3',
                ogg: '',
                lrc: ''
            },
            {
                title: '一起来嗨皮儿',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/yiqilaihaipier.mp3',
                ogg: '',
                lrc: 'song/yiqilaihaipier.lrc'
            },
            {
                title: 'VR Hero',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/vrhero.mp3',
                ogg: '',
                lrc: 'song/vrhero.lrc'
            },
            {
                title: '北辰吟',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/beiyingcheng.mp3',
                ogg: '',
                lrc: ''
            },
            {
                title: '船歌与水饺',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/chuanggeyushuijiao.mp3',
                ogg: '',
                lrc: ''
            },
            {
                title: '让我们勇敢去追',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/ranwomenyongganquzui.mp3',
                ogg: '',
                lrc: 'song/ranwomenyongganquzui.lrc'
            },
            {
                title: '七姑娘',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/qiguniang.mp3',
                ogg: '',
                lrc: 'song/qiguniang.lrc'
            },
            {
                title: '我的你',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/wodeni.mp3',
                ogg: '',
                lrc: 'song/wodeni.lrc'
            },
            {
                title: '我是斌仔',
                artist: '',
                album: '',
                cover: 'images/playbg.png',
                mp3: 'song/imbin.mp3',
                ogg: '',
                lrc: 'song/imbin.lrc'
            }
        ];


    // Load playlist
    for (var i = 0; i < playlist.length; i++) {
        var item = playlist[i];
        $('#playlist').append('<li>' + item.artist + ' - ' + item.title + '</li>');
    }

    var time = new Date(),
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
        trigger = false,
        audio, timeout, isPlaying, playCounts;

    var play = function () {
        audio.play();
        $('.playback').addClass('playing');
        timeout = setInterval(updateProgress, 500);
        isPlaying = true;
    }

    var pause = function () {
        audio.pause();
        $('.playback').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
    }

    // Update progress
    var setProgress = function (value) {
        var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
            ratio = value / audio.duration * 100;

        $('.timer').html(parseInt(value / 60) + ':' + currentSec);
        $('.progress .pace').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }

    var updateProgress = function () {
        setProgress(audio.currentTime);
    }

    // Progress slider
    $('.progress .slider').slider({
        step: 0.1, slide: function (event, ui) {
            $(this).addClass('enable');
            setProgress(audio.duration * ui.value / 100);
            clearInterval(timeout);
        }, stop: function (event, ui) {
            audio.currentTime = audio.duration * ui.value / 100;
            $(this).removeClass('enable');
            timeout = setInterval(updateProgress, 500);
        }
    });

    // Volume slider
    var setVolume = function (value) {
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    }

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({
        max: 1, min: 0, step: 0.01, value: volume, slide: function (event, ui) {
            setVolume(ui.value);
            $(this).addClass('enable');
            $('.mute').removeClass('enable');
        }, stop: function () {
            $(this).removeClass('enable');
        }
    }).children('.pace').css('width', volume * 100 + '%');

    $('.mute').click(function () {
        if ($(this).hasClass('enable')) {
            setVolume($(this).data('volume'));
            $(this).removeClass('enable');
        } else {
            $(this).data('volume', audio.volume).addClass('enable');
            setVolume(0);
        }
    });

    // Switch track
    var switchTrack = function (i) {
        if (i < 0) {
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        if (isPlaying == true) play();
    }

    // Shuffle
    var shufflePlay = function () {
        var time = new Date(),
            lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) ++currentTrack;
        switchTrack(currentTrack);
    }

    // Fire when track ended
    var ended = function () {
        pause();
        audio.currentTime = 0;
        playCounts++;
        if (continous == true) isPlaying = true;
        if (repeat == 1) {
            play();
        } else {
            if (shuffle === 'true') {
                shufflePlay();
            } else {
                if (repeat == 2) {
                    switchTrack(++currentTrack);
                } else {
                    if (currentTrack < playlist.length) switchTrack(++currentTrack);
                }
            }
        }
    }

    var beforeLoad = function () {
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) + '%');
    }

    // Fire when track loaded completely
    var afterLoad = function () {
        if (autoplay == true) play();
    }

    // Load track
    var loadMusic = function (i) {
        var songList;
        var songName = $('.tag').html().replace(/\s/g, "");
        for (var i  in playlist) {
            if (playlist[i].title.replace(/\s/g, "") == songName) {
                songList = i;
            }

        }
        var item = playlist[songList],
            newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('#player');
        if (item.lrc == '') {
            //alert('没有歌词')
            $('.yinghua_lf_b_text').html('歌词制作中');
            $('.yinghua_lf_b_text').css('font-size', '20px').css('color', '#2bd4a1');
        } else {
            var reTemp = $.ajax({
                url: item.lrc,
                async: false
            });
            $('.yinghua_lf_b_text').html(reTemp.responseText);

        }


        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        //$('.tag').html(item.title+'<span class="artist">'+item.artist+'</span><span class="album">'+item.album+'</span>');
        $('#playlist li').removeClass('playing').eq(i).addClass('playing');
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('canplay', afterLoad, false);
        audio.addEventListener('ended', ended, false);
    }

    var lrcPross, ircTime;

    loadMusic(currentTrack);
    $('.playback').on('click', function () {
        if ($(this).hasClass('playing')) {
            pause();
            clearInterval(ircTime);

        } else {
            play();
           songPlay();

        }

    });
    $('.gushi_btn').on('click', function () {
        $(this).find("em").toggleClass("em");
        if ($(this).find("em").hasClass('em')) {
            play();
            songPlay();

        } else {
            pause();
            clearInterval(ircTime);

        }

    });
    //autoPlay

    play();
    ircTime = setInterval(function () {
        var tempS = parseInt(audio.currentTime);
        lrcPross = tempS;
        lrcslider(lrcPross);
    }, 300);
    $(".yinghua_lf_t em").toggleClass("em");
    $(".playbtn").toggleClass("playbtnh");


    $('.yinghua_lf_t em').click(function () {
        $(".yinghua_lf_t em").toggleClass("em");
        $(".playbtn").toggleClass("playbtnh");
        if ($(this).hasClass('em')) {
            play();
            songPlay();

        } else {
            pause();
            clearInterval(ircTime);
        }

    });


    //设置
    function songPlay(){
        ircTime = setInterval(function () {
            var tempS = parseInt(audio.currentTime);
            lrcPross = tempS;
            lrcslider(lrcPross);
        }, 300)
    }

    $('.playbtn').click(function () {
        $(".playbtn").toggleClass("playbtnh");
        $(".yinghua_lf_t em").toggleClass("em");
    });

    $('.rewind').on('click', function () {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(--currentTrack);
        }
    });
    $('.fastforward').on('click', function () {
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    });

    $('#playlist li').each(function (i) {
        var _i = i;
        $(this).on('click', function () {
            switchTrack(_i);
        });
    });


    if (shuffle === 'true') $('.shuffle').addClass('enable');
    if (repeat == 1) {
        $('.repeat').addClass('once');
    } else if (repeat == 2) {
        $('.repeat').addClass('all');
    }

    $('.repeat').on('click', function () {
        if ($(this).hasClass('once')) {
            repeat = localStorage.repeat = 2;
            $(this).removeClass('once').addClass('all');
        } else if ($(this).hasClass('all')) {
            repeat = localStorage.repeat = 0;
            $(this).removeClass('all');
        } else {
            repeat = localStorage.repeat = 1;
            $(this).addClass('once');
        }
    });

    $('.shuffle').on('click', function () {
        if ($(this).hasClass('enable')) {
            shuffle = localStorage.shuffle = 'false';
            $(this).removeClass('enable');
        } else {
            shuffle = localStorage.shuffle = 'true';
            $(this).addClass('enable');
        }
    });
    $('#pross').click(function (ev) {
        //alert(123);
        var pDiv = $('#pross').get(0);
        //alert(pDiv.offsetLeft);
        var oEvent = ev || event;
        var target = oEvent.clientX - pDiv.offsetLeft;
        var targetp = parseFloat(target / pDiv.offsetWidth).toFixed(2) * 100;
        $('.progress .pace').css('width', targetp + '%');
        $('.progress .slider a').css('left', targetp + '%');

        //audio.load();
        audio.currentTime = audio.duration * (targetp / 100);
        //alert(typeof audio.src)
        //alert(audio.currentTime);
    })


    $('.yinghua_lf_b_text').css('text-align', 'center');
    //解析歌词

    var lrcArray = $('.yinghua_lf_b_text').html().replace(/\.\d{2}/g, '').replace(/\[+ti:/, '')
        .replace(/\]/, '').replace(/\[+ar:/, '').replace(/\]/, '')
        .replace(/\[+al:/, '').replace(/\]/, '').replace(/\[+by:/, '').replace(/\]/, '').split('\n');

    var lrcTemp = [], lrcJsonText = [], lrcMin = [], secondPart = [], thirdPart = [], forthPart = [], lrcTitle = [];
    for (var i in lrcArray) {
        if (lrcArray[i] !== '') {
            lrcTemp.push(lrcArray[i]);
        }
    }
    //alert(lrcTemp);

    for (var i in lrcTemp) {
        var lrcJsonTimeTemp = lrcTemp[i].match(/\[\d*:\d*((\.|\:)\d*)*\]/g);
        var nowLrc = lrcTemp[i].replace(/\[\d*:\d*((\.|\:)\d*)*\]/g, '');

        if (lrcJsonTimeTemp) {
            lrcJsonText.push(nowLrc);
            for (var i in lrcJsonTimeTemp) {
                lrcMin.push(lrcJsonTimeTemp[i])
            }

            if (lrcJsonTimeTemp.length == 2) {
                secondPart.push(nowLrc);
            }
            else if (lrcJsonTimeTemp.length == 3) {
                thirdPart.push(nowLrc);
                secondPart.push(nowLrc);
            }
            else if (lrcJsonTimeTemp.length == 4) {
                forthPart.push(nowLrc);
                thirdPart.push(nowLrc);
                secondPart.push(nowLrc);
            }

        } else {
            lrcTitle.push(nowLrc);
        }
    }

    for (var i in secondPart) {
        lrcJsonText.push(secondPart[i])
    }
    for (var i in thirdPart) {
        lrcJsonText.push(thirdPart[i])
    }
    for (var i in forthPart) {
        lrcJsonText.push(forthPart[i])
    }

    //alert(lrcJsonText)

    var lrcTime = [];
    for (var k = 0, h = lrcMin.length; k < h; k++) { //第一遍循环，JSON存储歌词，数组存储时间

        min = Number(String(lrcMin[k].match(/\[\d*/i)).slice(1));

        sec = Number(String(lrcMin[k].match(/\:\d*/i)).slice(1));

        lrcTime[k] = min * 60 + sec;
    }
    lrcTime.sort(function (a, b) {
        return a - b
    });


    var oLrc = [];
    for (var i in lrcTitle) {
        var oTitle = '<li>' + lrcTitle[i] + '</li>';
        oLrc.push(oTitle);
    }
    for (var i = 0; i < lrcJsonText.length; i++) {
        var oLi = '<li class=' + lrcTime[i] + '>' + lrcJsonText[i] + '</li>';
        oLrc.push(oLi)
    }

    var sUl = document.createElement('ul');
    sUl.className = 'lrcul';
    sUl.style.position = 'relative';
    sUl.innerHTML = oLrc.join("");
    //alert(sUl.innerHTML)
    $('.yinghua_lf_b_text').html('');
    $('.yinghua_lf_b_text').append(sUl);


    var lrcNow = 0;


    function lrcslider(now) {
        var lrcLis = document.getElementsByClassName('lrcul')[0].getElementsByTagName('li');
        for (var i = 0; i < lrcLis.length; i++) {


            if (parseInt(lrcLis[i].className) == now) {
                lrcNow = i;
                //lrcLis[i].style.opacity = 1;

                $('.lrcul').animate({top: -25 * (i - 3)}, 1000);
            }
            else {
                lrcLis[i].style.color = 'black';
                lrcLis[i].style.opacity = 0.5;
                lrcLis[i].style.fontSize = 15 + 'px';

            }
        }
        lrcLis[lrcNow].style.fontSize = 18 + 'px';
        lrcLis[lrcNow].style.color = '#f5c757';
        lrcLis[lrcNow].style.opacity = 1;
    }



    //手机端样式修改

    $('.phone-play-btn').get(0).onmousemove=function(){
        var theWindowWidth=document.body.clientWidth;
        if(theWindowWidth < 767){
            $('.phone-play-btn').css('background','');
            $('.ge_img').css('opacity',0);
        }

    }
    $('.phone-play-btn').get(0).onmouseout= function () {
        var theWindowWidth=document.body.clientWidth;
        if(theWindowWidth < 767){

            $('.phone-play-btn').css('background','none');
            $('.ge_img').css('opacity',1);
        }
    }


})
(jQuery);

