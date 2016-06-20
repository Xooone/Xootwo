(function($)
{
    $.lrc={
        handle: null,
        list: [],
        regex: /^[^\[]*((?:\s*\[\d+\:\d+(?:\.\d+)?\])+)([\s\S]*)$/,
        regex_time: /\[(\d+)\:((?:\d+)(?:\.\d+)?)\]/g,
        regex_trim: /^\s+|\s+$/,
        callback: null,
        interval: 0.3,
        format: '<li>{html}</li>',
        prefixid: 'lrc',
        hoverClass: 'hover',
        hoverTop: 100,
        duration: 0,
        __duration: -1,

        start: function(txt, callback) {
            if (typeof(txt) != 'string' || txt.length < 1 || typeof(callback) != 'function') return;
            this.stop();
            this.callback = callback;
        }
    }
})(jQuery);