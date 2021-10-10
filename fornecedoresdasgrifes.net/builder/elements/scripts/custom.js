
$(window).load(function () {

    "use strict";

    //------------------------------------------------------------------------
    //						PRELOADER SCRIPT
    //------------------------------------------------------------------------
    $('#preloader').delay(400).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('#preloader .loading-data').fadeOut(); // will first fade out the loading animation


    //------------------------------------------------------------------------
    //						NORMALIZE CAROUSEL HEIGHTS
    //------------------------------------------------------------------------
    $('#carousel-full-header .item').carouselHeights();
    $('#carousel-testimonials .item').carouselHeights();


    //------------------------------------------------------------------------
    //						COUNTER SCRIPT
    //------------------------------------------------------------------------
    $('.timer').counterUp({
        delay: 20,
        time: 2500
    });


    //------------------------------------------------------------------------
    //						COUNTDOWN OPTIONS SCRIPT
    //------------------------------------------------------------------------    
    if ($('div').is('.countdown')) {
        var deadline = $('.countdown').data('deadline');
        var dtformat = $('.countdown').data('countdown-format');
        // format countdown
        if (deadline == null || deadline == undefined || deadline == '') {
            deadline = new Date();
            deadline.setDate(deadline.getDate() + 5);
            deadline = Globalize.format(deadline, "dd MMMM yyyy HH:mm:ss");
        }
        else {
            var _split = deadline.split(' ');
            var _sdate = _split[0].split('/');
            var _stime = _split[1].split(':');
            if (_sdate.length == 3 && _stime.length == 3) {
                var _ddate = new Date(_sdate[2], parseInt(_sdate[1]) - 1, _sdate[0], _stime[0], _stime[1], _stime[2]);
                if (_ddate != undefined && _ddate != null)
                    deadline = Globalize.format(_ddate, "dd MMMM yyyy HH:mm:ss");
                else
                    deadline = Globalize.format(new Date(), "dd MMMM yyyy HH:mm:ss");
            }
            else
                deadline = Globalize.format(new Date(), "dd MMMM yyyy HH:mm:ss");
        }
        // set format if empty
        if (dtformat == null || dtformat == undefined || dtformat == '')
            dtformat = 'dd:hh:mm:ss';
        // load countdown
        $(".countdown").jCounter({
            date: deadline,
            timezone: "America/Sao_Paulo",
            format: dtformat,
            twoDigits: 'on',
            fallback: function () { }
        });
    }


    //------------------------------------------------------------------------
    //						NAVBAR SLIDE SCRIPT
    //------------------------------------------------------------------------ 		
    $(window).scroll(function () {
        if ($(window).scrollTop() > $("nav").height()) {
            $("nav.navbar-slide").addClass("show-menu");
        } else {
            $("nav.navbar-slide").removeClass("show-menu");
            $(".navbar-slide .navMenuCollapse").collapse({ toggle: false });
            $(".navbar-slide .navMenuCollapse").collapse("hide");
            $(".navbar-slide .navbar-toggle").addClass("collapsed");
        }
    });


    //------------------------------------------------------------------------
    //						NAVBAR HIDE ON CLICK (COLLAPSED) SCRIPT
    //------------------------------------------------------------------------ 		
    $('.nav a').on('click', function () {
        if ($('.navbar-toggle').css('display') != 'none') {
            $(".navbar-toggle").click()
        }
    });

})




$(document).ready(function () {

    "use strict";



    //------------------------------------------------------------------------
    //						ANCHOR SMOOTHSCROLL SETTINGS
    //------------------------------------------------------------------------
    $('a.goto, .navbar .nav a').smoothScroll({ speed: 1200 });




    //------------------------------------------------------------------------
    //						FULL HEIGHT SECTION SCRIPT
    //------------------------------------------------------------------------
    $(".screen-height").css("min-height", $(window).height());
    $(window).resize(function () {
        $(".screen-height").css("min-height", $(window).height());
    });




    //------------------------------------------------------------------------	
    //                    MAGNIFIC POPUP(LIGHTBOX) SETTINGS
    //------------------------------------------------------------------------  
    setTimeout(function () {
        $('.portfolio-list li').magnificPopup({
            delegate: 'a:not(.btn, .link-item)',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }, 100);


    //------------------------------------------------------------------------	
    //                    COLLAPSE NO DUPLICATE FIX SETTINGS
    //------------------------------------------------------------------------  
    $(".accordion-container .panel").each(function (index, item) {
        var itemRefName = 'accordion-item-' + index;
        $('.panel-heading', item).attr('href', '.' + itemRefName);
        $('.panel-collapse', item).addClass(itemRefName);
    });
    

    //------------------------------------------------------------------------
    //						VIDEO BACKGROUND SETTINGS
    //------------------------------------------------------------------------
    if ($('.video-bg')[0]) {
        $(function () {
            var BV = new $.BigVideo({ container: $('.video-bg'), useFlashForFirefox: false });
            BV.init();
            if (navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|IEMobile/i)) {
                BV.show('images/video_gag.jpg');
            } else {
                if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
                    BV.show('video/video_bg.ogv', { doLoop: true, ambient: true });
                } else {
                    BV.show('video/video_bg.mp4', { doLoop: true, ambient: true, altSource: 'video/video_bg.ogv' });
                }
                BV.getPlayer().on('loadedmetadata', function () {
                    $('#big-video-wrap video').fadeIn('slow');
                });
            }
        });
    }




    //------------------------------------------------------------------------------------------
    //                     INITIALIZATION WOW.JS
    //------------------------------------------------------------------------------------------
    var wow = new WOW();
    wow.init();
    

    //------------------------------------------------------------------------------------
    //						SUBSCRIBE FORM MAILCHIMP INTEGRATIONS SCRIPT
    //------------------------------------------------------------------------------------		
    $('#subscribe_form').submit(function () {
        $('#subscribe_submit').button('loading');
    });

    //------------------------------------------------------------------------------------
    //						SUBSCRIBE 2 FIELDS FORM MAILCHIMP INTEGRATIONS SCRIPT
    //------------------------------------------------------------------------------------		
    $('#subscribe_form_2').submit(function () {
        $('#subscribe_submit_2').button('loading');
    });
    
    //------------------------------------------------------------------------------------
    //								CONTACT FORM SCRIPT
    //------------------------------------------------------------------------------------	

    $('#contact_form').submit(function () {
        $('#contact_submit').button('loading');
    });

});


//------------------------------------------------------------------------
//						NORMALIZE CAROUSEL HEIGHTS FUNCTION
//------------------------------------------------------------------------

$.fn.carouselHeights = function () {

    var items = $(this), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    var normalizeHeights = function () {

        items.each(function () { //add heights to array
            heights.push($(this).height());
        });
        tallest = Math.max.apply(null, heights); //cache largest value
        items.each(function () {
            $(this).css('min-height', tallest + 'px');
        });
    };

    normalizeHeights();

    $(window).on('resize orientationchange', function () {
        //reset vars
        tallest = 0;
        heights.length = 0;

        items.each(function () {
            $(this).css('min-height', '0'); //reset min-height
        });
        normalizeHeights(); //run it again 
    });

};