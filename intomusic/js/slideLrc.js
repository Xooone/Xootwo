(function($){
    $.lrc = {
        handle: null, /* ��ʱִ�о�� */
        list: [], /* lrc��ʼ�ʱ�������� */
        regex: /^[^\[]*((?:\s*\[\d+\:\d+(?:\.\d+)?\])+)([\s\S]*)$/, /* ��ȡ��������� */
        regex_time: /\[(\d+)\:((?:\d+)(?:\.\d+)?)\]/g, /* ��ȡ���ʱ���� */
        regex_trim: /^\s+|\s+$/, /* �������߿ո� */
        callback: null, /* ��ʱ��ȡ����ִ��ʱ��ص����� */
        interval: 0.3, /* ��ʱˢ��ʱ�䣬��λ���� */
        format: '<li>{html}</li>', /* ģ�� */
        prefixid: 'lrc', /* ����ID */
        hoverClass: 'hover', /* ѡ�нڵ��className */
        hoverTop: 100, /* ��ǰ��ʾ��븸�ڵ�ĸ߶� */
        duration: 0, /* �����ص��������õĽ���ʱ�� */
        __duration: -1, /* ��ǰ��������ʱ�� */
        /* ��ʿ�ʼ�Զ�ƥ�� */
        start: function(txt, callback) {
            if(typeof(txt) != 'string' || txt.length < 1 || typeof(callback) != 'function') return;
            /* ֹͣǰ��ִ�еĸ��� */
            this.stop();
            this.callback = callback;
            var item = null, item_time = null, html = '';
            /* ������ʵ�ʱ��������� */
            txt = txt.split("\n");
            for(var i = 0; i < txt.length; i++) {
                item = txt[i].replace(this.regex_trim, '');
                if(item.length < 1 || !(item = this.regex.exec(item))) continue;
                while(item_time = this.regex_time.exec(item[1])) {
                    this.list.push([parseFloat(item_time[1])*60+parseFloat(item_time[2]), item[2]]);
                }
                this.regex_time.lastIndex = 0;
            }

            /* ��Ч��� */
            if(this.list.length > 0) {
                /* ��ʱ�������� */
                this.list.sort(function(a,b){ return a[0]-b[0]; });
                if(this.list[0][0] >= 0.1) this.list.unshift([this.list[0][0]-0.1, '']);
                this.list.push([this.list[this.list.length-1][0]+1, '']);
                for(var i = 0; i < this.list.length; i++)
                    html += this.format.replace(/\{html\}/gi, this.list[i][1]);

                /* ��ֵ��ָ������ */
                $('#'+this.prefixid+'_list').html(html).animate({ marginTop: 0 }, 100).show();
                /* ����û�и�ʵĲ� */
                $('#'+this.prefixid+'_nofound').hide();
                /* ��ʱ���ûص������������������� */
                this.handle = setInterval('$.lrc.jump($.lrc.callback());', this.interval*1000);
            }else{ /* û�и�� */
                $('#'+this.prefixid+'_list').hide();
                $('#'+this.prefixid+'_nofound').show();
            }
        },
        /* ����ָ��ʱ��ĸ�� */
        jump: function(duration) {
            if(typeof(this.handle) != 'number' || typeof(duration) != 'number' || !$.isArray(this.list) || this.list.length < 1) return this.stop();

            if(duration < 0) duration = 0;
            if(this.__duration == duration) return;
            duration += 0.2;
            this.__duration = duration;
            duration += this.interval;

            var left = 0, right = this.list.length-1, last = right
            pivot = Math.floor(right/2),
                tmpobj = null, tmp = 0, thisobj = this;

            /* ���ֲ��� */
            while(left <= pivot && pivot <= right) {
                if(this.list[pivot][0] <= duration && (pivot == right || duration < this.list[pivot+1][0])) {
                    //if(pivot == right) this.stop();
                    break;
                }else if( this.list[pivot][0] > duration ) { /* left */
                    right = pivot;
                }else{ /* right */
                    left = pivot;
                }
                tmp = left + Math.floor((right - left)/2);
                if(tmp == pivot) break;
                pivot = tmp;
            }

            if(pivot == this.pivot) return;
            this.pivot = pivot;
            tmpobj = $('#'+this.prefixid+'_list').children().removeClass(this.hoverClass).eq(pivot).addClass(thisobj.hoverClass);
            tmp = tmpobj.next().offset().top-tmpobj.parent().offset().top - this.hoverTop;
            tmp = tmp > 0 ? tmp * -1 : 0;
            this.animata(tmpobj.parent()[0]).animate({marginTop: tmp + 'px'}, this.interval*1000);
        },
        /* ִֹͣ�и��� */
        stop: function() {
            if(typeof(this.handle) == 'number') clearInterval(this.handle);
            this.handle = this.callback = null;
            this.__duration = -1;
            this.regex_time.lastIndex = 0;
            this.list = [];
        },
        animata: function(elem) {
            var f = j = 0, callback, _this={},
                tween = function(t,b,c,d){ return -c*(t/=d)*(t-2) + b; }
            _this.execution = function(key, val, t) {
                var s = (new Date()).getTime(), d = t || 500,
                    b = parseInt(elem.style[key]) || 0,
                    c = val-b;
                (function(){
                    var t = (new Date()).getTime() - s;
                    if(t>d){
                        t=d;
                        elem.style[key] = tween(t,b,c,d) + 'px';
                        ++f == j && callback && callback.apply(elem);
                        return true;
                    }
                    elem.style[key] = tween(t,b,c,d)+'px';
                    setTimeout(arguments.callee, 10);
                })();
            }
            _this.animate = function(sty, t, fn){
                callback = fn;
                for(var i in sty){
                    j++;
                    _this.execution(i,parseInt(sty[i]),t);
                }
            }
            return _this;
        }
    };
})(jQuery);