/**
 * datetimepicker农历扩展插件
 * Created by daizhi on 2017/2/13.
 */

var S=navigator.userAgent.indexOf("MSIE")!=-1&&!window.opera;
function M(C){
    return document.getElementById(C)
} function R(C){
    return document.createElement(C)
} var P=[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42448,83315,21200,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448];
var K="甲乙丙丁戊己庚辛壬癸";
var J="子丑寅卯辰巳午未申酉戌亥";
var O="鼠牛虎兔龙蛇马羊猴鸡狗猪";
var L=["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];
var D=[0,21208,43467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];
var B="日一二三四五六七八九十";
var H=["正","二","三","四","五","六","七","八","九","十","十一","腊"];
var E="初十廿卅";
var V={
    "0101":"*1元旦节","0214":"情人节","0305":"学雷锋纪念日","0308":"妇女节","0312":"植树节","0315":"消费者权益日","0401":"愚人节","0501":"*1劳动节","0504":"青年节","0601":"国际儿童节","0701":"中国共产党诞辰","0801":"建军节","0910":"中国教师节","1001":"*3国庆节","1224":"平安夜","1225":"圣诞节"
} ;
var T={
    "0101":"*2春节","0115":"元宵节","0505":"*1端午节","0815":"*1中秋节","0909":"重阳节","1208":"腊八节","0100":"除夕"
} ;
function U(Y){
    function c(j,i){
        var h=new Date((31556925974.7*(j-1900)+D[i]*60000)+Date.UTC(1900,0,6,2,5));
        return(h.getUTCDate())
    } function d(k){
        var h,j=348;
        for(h=32768;h>8;h>>=1){
            j+=(P[k-1900]&h)?1:0
        } return(j+b(k))
    } function a(h){
        return(K.charAt(h%10)+J.charAt(h%12))
    } function b(h){
        if(g(h)){
            return((P[h-1900]&65536)?30:29)
        } else{
            return(0)
        }
    } function g(h){
        return(P[h-1900]&15)
    } function e(i,h){
        return((P[i-1900]&(65536>>h))?30:29)
    } function C(m){
        var k,j=0,h=0;
        var l=new Date(1900,0,31);
        var n=(m-l)/86400000;
        this.dayCyl=n+40;
        this.monCyl=14;
        for(k=1900;k<2050&&n>0;k++){
            h=d(k);
            n-=h;
            this.monCyl+=12
        } if(n<0){
            n+=h;
            k--;
            this.monCyl-=12
        } this.year=k;
        this.yearCyl=k-1864;
        j=g(k);
        this.isLeap=false;
        for(k=1;k<13&&n>0;k++){
            if(j>0&&k==(j+1)&&this.isLeap==false){
                --k;
                this.isLeap=true;
                h=b(this.year)
            } else{
                h=e(this.year,k)
            } if(this.isLeap==true&&k==(j+1)){
                this.isLeap=false
            } n-=h;
            if(this.isLeap==false){
                this.monCyl++
            }
        } if(n==0&&j>0&&k==j+1){
            if(this.isLeap){
                this.isLeap=false
            } else{
                this.isLeap=true;
                --k;
                --this.monCyl
            }
        } if(n<0){
            n+=h;
            --k;
            --this.monCyl
        } this.month=k;
        this.day=n+1
    } function G(h){
        return h<10?"0"+h:h
    } function f(i,j){
        var h=i;
        return j.replace(/dd?d?d?|MM?M?M?|yy?y?y?/g,function(k){
            switch(k){
                case"yyyy":var l="000"+h.getFullYear();
                    return l.substring(l.length-4);
                case"dd":
                    return G(h.getDate());
                case"d":
                    return h.getDate().toString();
                case"MM":
                    return G((h.getMonth()+1));
                case"M":
                    return h.getMonth()+1
                        }
                    } )
    } function Z(i,h){
        var j;
        switch(i,h){
            case 10:j="初十";
                break;
            case 20:j="二十";
                break;
            case 30:j="三十";
                break;
            default:j=E.charAt(Math.floor(h/10));
                j+=B.charAt(h%10)
        } return(j)
    } this.date=Y;
    this.solarYear=f(Y,"yyyy");
    this.solarMonth=f(Y,"M");
    this.solarDate=f(Y,"d");
    this.solarWeekDay=Y.getDay();
    this.solarWeekDayInChinese="星期"+B.charAt(this.solarWeekDay);
    var X=new C(Y);
    this.lunarYear=X.year;
    this.shengxiao=O.charAt((this.lunarYear-4)%12);
    this.lunarMonth=X.month;
    this.lunarIsLeapMonth=X.isLeap;
    this.lunarMonthInChinese=this.lunarIsLeapMonth?"闰"+H[X.month-1]:H[X.month-1];
    this.lunarDate=X.day;
    this.showInLunar=this.lunarDateInChinese=Z(this.lunarMonth,this.lunarDate);
    if(this.lunarDate==1){
        this.showInLunar=this.lunarMonthInChinese+"月"
    } this.ganzhiYear=a(X.yearCyl);
    this.ganzhiMonth=a(X.monCyl);
    this.ganzhiDate=a(X.dayCyl++);
    this.jieqi="";
    this.restDays=0;
    if(c(this.solarYear,(this.solarMonth-1)*2)==f(Y,"d")){
        this.showInLunar=this.jieqi=L[(this.solarMonth-1)*2]
    } if(c(this.solarYear,(this.solarMonth-1)*2+1)==f(Y,"d")){
        this.showInLunar=this.jieqi=L[(this.solarMonth-1)*2+1]
    } if(this.showInLunar=="清明"){
        this.showInLunar="清明节";
        this.restDays=1
    } this.solarFestival=V[f(Y,"MM")+f(Y,"dd")];
    if(typeof this.solarFestival=="undefined"){
        this.solarFestival=""
    } else{
        if(/\*(\d)/.test(this.solarFestival)){
            this.restDays=parseInt(RegExp.$1);
            this.solarFestival=this.solarFestival.replace(/\*\d/,"")
        }
    } this.showInLunar=(this.solarFestival=="")?this.showInLunar:this.solarFestival;
    var tIndex=this.lunarIsLeapMonth?"00":G(this.lunarMonth)+G(this.lunarDate);
    if(Object.prototype.toString.call(tIndex) === "[object String]" && tIndex.indexOf("."))
        tIndex=tIndex.substring(0,tIndex.indexOf("."));
    this.lunarFestival=T[tIndex];
    if(typeof this.lunarFestival=="undefined"){
        this.lunarFestival=""
    } else{
        if(/\*(\d)/.test(this.lunarFestival)){
            this.restDays=(this.restDays>parseInt(RegExp.$1))?this.restDays:parseInt(RegExp.$1);
            this.lunarFestival=this.lunarFestival.replace(/\*\d/,"")
        }
    } if(this.lunarMonth==12&&this.lunarDate==e(this.lunarYear,12)){
        this.lunarFestival=T["0100"];
        this.restDays=1
    } this.showInLunar=(this.lunarFestival=="")?this.showInLunar:this.lunarFestival;
    this.showInLunar=(this.showInLunar.length>4)?this.showInLunar.substr(0,2)+"...":this.showInLunar
} var Q=(function(){
    var X={
    } ;
    X.lines=0;
    X.dateArray=new Array(42);
    function Y(a){
        return(((a%4===0)&&(a%100!==0))||(a%400===0))
    } function G(a,b){
        return[31,(Y(a)?29:28),31,30,31,30,31,31,30,31,30,31][b]
    } function C(a,b){
        a.setDate(a.getDate()+b);
        return a
    } function Z(a){
        var f=0;
        var c=new U(new Date(a.solarYear,a.solarMonth-1,1));
        var d=(c.solarWeekDay-1==-1)?6:c.solarWeekDay-1;
        X.lines=Math.ceil((d+G(a.solarYear,a.solarMonth-1))/7);
        for(var e=0;e<X.dateArray.length;e++){
            if(c.restDays!=0){
                f=c.restDays
            } if(f>0){
                c.isRest=true
            } if(d-->0||c.solarMonth!=a.solarMonth){
                X.dateArray[e]=null;
                continue
            } var b=new U(new Date());
            if(c.solarYear==b.solarYear&&c.solarMonth==b.solarMonth&&c.solarDate==b.solarDate){
                c.isToday=true
            } X.dateArray[e]=c;
            c=new U(C(c.date,1));
            f--
        }
    } return{
        init:function(a){
            Z(a)
        } ,getJson:function(){
            return X
        }
    }
} )();

function UTCDate() {
    return new Date(Date.UTC.apply(Date, arguments));
}

//重写fill函数
(function($){
$.fn.datetimepicker.Constructor.prototype.fill=function () {
    if (!this.date || !this.viewDate) {
        return;
    }
    var d = new Date(this.viewDate),
        year = d.getUTCFullYear(),
        month = d.getUTCMonth(),
        dayMonth = d.getUTCDate(),
        hours = d.getUTCHours(),
        startYear = this.startDate.getUTCFullYear(),
        startMonth = this.startDate.getUTCMonth(),
        endYear = this.endDate.getUTCFullYear(),
        endMonth = this.endDate.getUTCMonth() + 1,
        currentDate = (new UTCDate(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate())).valueOf(),
        today = new Date();

    this.setTitle('.datetimepicker-days', $.fn.datetimepicker.dates[this.language].months[month] + ' ' + year)
    if (this.formatViewType === 'time') {
        var formatted = this.getFormattedDate();
        this.setTitle('.datetimepicker-hours', formatted);
        this.setTitle('.datetimepicker-minutes', formatted);
    } else {
        this.setTitle('.datetimepicker-hours', dayMonth + ' ' + $.fn.datetimepicker.dates[this.language].months[month] + ' ' + year);
        this.setTitle('.datetimepicker-minutes', dayMonth + ' ' + $.fn.datetimepicker.dates[this.language].months[month] + ' ' + year);
    }
    this.picker.find('tfoot th.today')
        .text($.fn.datetimepicker.dates[this.language].today || $.fn.datetimepicker.dates['en'].today)
        .toggle(this.todayBtn !== false);
    this.picker.find('tfoot th.clear')
        .text($.fn.datetimepicker.dates[this.language].clear || $.fn.datetimepicker.dates['en'].clear)
        .toggle(this.clearBtn !== false);
    this.updateNavArrows();
    this.fillMonths();
    var prevMonth = UTCDate(year, month - 1, 28, 0, 0, 0, 0),
        day = $.fn.datetimepicker.DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
    prevMonth.setUTCDate(day);
    prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.weekStart + 7) % 7);

    var nextMonth = new Date(prevMonth);
    nextMonth.setUTCDate(nextMonth.getUTCDate() + 35);
    nextMonth = nextMonth.valueOf();
    var html = [];
    var classes;
    while (prevMonth.valueOf() < nextMonth) {
        if (prevMonth.getUTCDay() === this.weekStart) {
            html.push('<tr>');
        }
        classes = this.onRenderDay(prevMonth);
        if (prevMonth.getUTCFullYear() < year || (prevMonth.getUTCFullYear() === year && prevMonth.getUTCMonth() < month)) {
            classes.push('old');
        } else if (prevMonth.getUTCFullYear() > year || (prevMonth.getUTCFullYear() === year && prevMonth.getUTCMonth() > month)) {
            classes.push('new');
        }
        // Compare internal UTC date with local today, not UTC today
        if (this.todayHighlight &&
            prevMonth.getUTCFullYear() === today.getFullYear() &&
            prevMonth.getUTCMonth() === today.getMonth() &&
            prevMonth.getUTCDate() === today.getDate()) {
            classes.push('today');
        }
        if (prevMonth.valueOf() === currentDate) {
            classes.push('active');
        }
        if ((prevMonth.valueOf() + 86400000) <= this.startDate || prevMonth.valueOf() > this.endDate ||
            $.inArray(prevMonth.getUTCDay(), this.daysOfWeekDisabled) !== -1 ||
            $.inArray(prevMonth.toDateString(), this.datesDisabled) !== -1) {
            classes.push('disabled');
        }
        //获取当前时间详细信息包括节日信息
        var c=new U(prevMonth);
        var ct="";
        ct+="农历&nbsp;"+c.lunarMonthInChinese+"月"+c.lunarDateInChinese+"&nbsp;" + c.solarFestival + c.lunarFestival;
        html.push('<td class="' + classes.join(' ') + '">' + prevMonth.getUTCDate()+'<br><p  title='+ct+'>'+c.showInLunar + '</p></td>');
        if (prevMonth.getUTCDay() === this.weekEnd) {
            html.push('</tr>');
        }
        prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
    }
    this.picker.find('.datetimepicker-days tbody').empty().append(html.join(''));

    html = [];
    var txt = '', meridian = '', meridianOld = '';
    var hoursDisabled = this.hoursDisabled || [];
    d = new Date(this.viewDate)
    for (var i = 0; i < 24; i++) {
        d.setUTCHours(i);
        classes = this.onRenderHour(d);
        if (hoursDisabled.indexOf(i) !== -1) {
            classes.push('disabled');
        }
        var actual = UTCDate(year, month, dayMonth, i);
        // We want the previous hour for the startDate
        if ((actual.valueOf() + 3600000) <= this.startDate || actual.valueOf() > this.endDate) {
            classes.push('disabled');
        } else if (hours === i) {
            classes.push('active');
        }
        if (this.showMeridian && $.fn.datetimepicker.dates[this.language].meridiem.length === 2) {
            meridian = (i < 12 ? $.fn.datetimepicker.dates[this.language].meridiem[0] : $.fn.datetimepicker.dates[this.language].meridiem[1]);
            if (meridian !== meridianOld) {
                if (meridianOld !== '') {
                    html.push('</fieldset>');
                }
                html.push('<fieldset class="hour"><legend>' + meridian.toUpperCase() + '</legend>');
            }
            meridianOld = meridian;
            txt = (i % 12 ? i % 12 : 12);
            if (i < 12) {
                classes.push('hour_am');
            } else {
                classes.push('hour_pm');
            }
            html.push('<span class="' + classes.join(' ') + '">' + txt + '</span>');
            if (i === 23) {
                html.push('</fieldset>');
            }
        } else {
            txt = i + ':00';
            html.push('<span class="' + classes.join(' ') + '">' + txt + '</span>');
        }
    }
    this.picker.find('.datetimepicker-hours td').html(html.join(''));

    html = [];
    txt = '';
    meridian = '';
    meridianOld = '';
    var minutesDisabled = this.minutesDisabled || [];
    d = new Date(this.viewDate);
    for (var i = 0; i < 60; i += this.minuteStep) {
        if (minutesDisabled.indexOf(i) !== -1) continue;
        d.setUTCMinutes(i);
        d.setUTCSeconds(0);
        classes = this.onRenderMinute(d);
        if (this.showMeridian && $.fn.datetimepicker.dates[this.language].meridiem.length === 2) {
            meridian = (hours < 12 ? $.fn.datetimepicker.dates[this.language].meridiem[0] : $.fn.datetimepicker.dates[this.language].meridiem[1]);
            if (meridian !== meridianOld) {
                if (meridianOld !== '') {
                    html.push('</fieldset>');
                }
                html.push('<fieldset class="minute"><legend>' + meridian.toUpperCase() + '</legend>');
            }
            meridianOld = meridian;
            txt = (hours % 12 ? hours % 12 : 12);
            html.push('<span class="' + classes.join(' ') + '">' + txt + ':' + (i < 10 ? '0' + i : i) + '</span>');
            if (i === 59) {
                html.push('</fieldset>');
            }
        } else {
            txt = i + ':00';
            html.push('<span class="' + classes.join(' ') + '">' + hours + ':' + (i < 10 ? '0' + i : i) + '</span>');
        }
    }
    this.picker.find('.datetimepicker-minutes td').html(html.join(''));

    var currentYear = this.date.getUTCFullYear();
    var months = this.setTitle('.datetimepicker-months', year)
        .end()
        .find('.month').removeClass('active');
    if (currentYear === year) {
        // getUTCMonths() returns 0 based, and we need to select the next one
        // To cater bootstrap 2 we don't need to select the next one
        months.eq(this.date.getUTCMonth()).addClass('active');
    }
    if (year < startYear || year > endYear) {
        months.addClass('disabled');
    }
    if (year === startYear) {
        months.slice(0, startMonth).addClass('disabled');
    }
    if (year === endYear) {
        months.slice(endMonth).addClass('disabled');
    }

    html = '';
    year = parseInt(year / 10, 10) * 10;
    var yearCont = this.setTitle('.datetimepicker-years', year + '-' + (year + 9))
        .end()
        .find('td');
    year -= 1;
    d = new Date(this.viewDate);
    for (var i = -1; i < 11; i++) {
        d.setUTCFullYear(year);
        classes = this.onRenderYear(d);
        if (i === -1 || i === 10) {
            classes.push($.fn.datetimepicker.old);
        }
        html += '<span class="' + classes.join(' ') + '">' + year + '</span>';
        year += 1;
    }
    yearCont.html(html);
    this.place();
}}(jQuery));
