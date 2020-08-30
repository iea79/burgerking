/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= app.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= app.mdWidth && $(window).width() < app.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= app.smWidth && $(window).width() < app.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < app.smWidth; } // < 768
function isIOS() { return app.iOS(); } // for iPhone iPad iPod
function isTouch() { return app.touchDevice(); } // for touch device


$(document).ready(function() {
    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	// Запрет "отскока" страницы при клике по пустой ссылке с href="#"
	$('[href="#"]').click(function(event) {
		event.preventDefault();
	});

    // Inputmask.js
    // $('[name=tel]').inputmask("+9(999)999 99 99",{ showMaskOnHover: false });
    // formSubmit();

    // checkOnResize();

    mouseMoveParallax();

    let wowOffset = $(window).height() / 4;

    let wow = new WOW({
        boxClass:     'wow',
        animateClass: 'slideUp', // animation css class (default is animated)
        offset:       wowOffset,          // distance to the element when triggering the animation (default is 0)
    });
    wow.init();


    let wow2 = new WOW({
        boxClass:     'wow2',      // animated element css class (default is wow)
        animateClass: 'bounceUp', // animation css class (default is animated)
        offset:       wowOffset,          // distance to the element when triggering the animation (default is 0)
    });
    wow2.init();

});


function parallax() {
    if (isXsWidth()) return false;
    let item = $('.parallaxItem');
    var el = document.querySelector('body');
    app.pageFs = window.getComputedStyle(el, null).getPropertyValue('font-size').replace('px', '')*1;
    let top = $(window).scrollTop()/app.pageFs;
    let speed;

    // console.log(app.pageFs);
    item.each(function(index, el) {
        top = $(window).scrollTop()/app.pageFs;
        speed = $(this).data('speed');
        $(el).attr('style', 'transform: translateY(-'+(top*speed/10)+'em)');
    });
}

function mouseMoveParallax() {
    let wrapper = $('.parallaxBox');
    let item = wrapper.find('.parallaxMouse');
    let speed = 0;
    let offsetX;
    let offsetY;

    if (isXsWidth()) return false;

    wrapper.on('mousemove', function(even) {
        // console.log(even.screenX);
        // console.log(even.clientX - $(window).width() / 2);
        offsetX = -(even.clientX - $(window).width() / 2);
        offsetY = -(even.clientY - $(window).width() / 2);

        if (isXsWidth()) {
            item.removeAttr('style');
        } else {
            item.each(function(index, el) {
                speed = $(el).data('speed');
                $(el).attr('style', 'transform: translate3d('+(offsetX*speed/1000)+'em, '+(offsetY*speed/1000)+'em , 0)');
            });
        }

    });

    wrapper.on('mouseleave', function(even) {
        item.each(function(index, el) {
            speed = $(el).data('speed');
            $(el).attr('style', 'transform: translate3d(0, 0 , 0)');
        });
    });
}


$(window).resize(function(event) {
    let windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (app.resized == windowWidth) { return; }
    app.resized = windowWidth;

	// checkOnResize();
});

function checkOnResize() {
    // fontResize();
}

// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
function stikyMenu() {
    let HeaderTop = $('header').offset().top + $('.home').innerHeight();
    let currentTop = $(window).scrollTop();

    setNavbarPosition();

    $(window).scroll(function(){
        setNavbarPosition();
    });

    function setNavbarPosition() {
        currentTop = $(window).scrollTop();

        if( currentTop > HeaderTop ) {
            $('header').addClass('stiky');
        } else {
            $('header').removeClass('stiky');
        }

        $('.navbar__link').each(function(index, el) {
            let section = $(this).attr('href');

            if ($('section').is(section)) {
                let offset = $(section).offset().top;

                if (offset <= currentTop && offset + $(section).innerHeight() > currentTop) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            }
        });
    }
};

function openMobileNav() {
    $('.navbar__toggle').on('click', function() {
        var wrapp = $('.nav');

        wrapp.toggleClass('open');
    });
};
openMobileNav();

// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
function srollToId() {
    $('[data-scroll-to]').click( function(){
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 1200) {
    	var fontSize = 60;
    }
	$('body').css('fontSize', fontSize + '%');
}

// Проверка направления прокрутки вверх/вниз
function checkDirectionScroll() {
    var tempScrollTop, currentScrollTop = 0;

    $(window).scroll(function(){
        currentScrollTop = $(window).scrollTop();

        if (tempScrollTop < currentScrollTop ) {
            app.pageScroll = "down";
        } else if (tempScrollTop > currentScrollTop ) {
            app.pageScroll = "up";
        }
        tempScrollTop = currentScrollTop;

    });
}
checkDirectionScroll();

// Видео youtube для страницы
// function uploadYoutubeVideo() {
//     if ($(".js-youtube")) {
//
//         $(".js-youtube").each(function () {
//             // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
//             $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
//
//             // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
//             $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));
//
//         });
//
//         $('.video__play, .video__prev').on('click', function () {
//             // создаем iframe со включенной опцией autoplay
//             let wrapp = $(this).closest('.js-youtube'),
//                 videoId = wrapp.attr('id'),
//                 iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";
//
//             if ($(this).data('params')) iframe_url += '&' + $(this).data('params');
//
//             // Высота и ширина iframe должны быть такими же, как и у родительского блока
//             let iframe = $('<iframe/>', {
//                 'frameborder': '0',
//                 'src': iframe_url,
//             })
//
//             // Заменяем миниатюру HTML5 плеером с YouTube
//             $(this).closest('.video__wrapper').append(iframe);
//
//         });
//     }
// };


var preview = {
    id: 427323376,
};

var player1 = new Vimeo.Player('short-video', preview);

$('#previwe').on('show.bs.modal', function() {
    player1.play();
});

$('#previwe').on('hide.bs.modal', function() {
    player1.pause();
});

// var fullVideo = {
//     id: 445510302,
// };
//
// var player2 = new Vimeo.Player('video', fullVideo);
//
// $('#play').on('show.bs.modal', function() {
//     player2.play();
// });
//
// $('#play').on('hide.bs.modal', function() {
//     player2.pause();
// });

function playVideo(box) {
    let section = $(box),
        fullscr = $('.rezultat__full'),
        preview = {
            id: 451083510,
            // loop: false,
            volume: 0,
            // controls: true,
            // autoplay: false,
            // width: '100%'
        },
        player = new Vimeo.Player('video', preview),
        played = false,
        top = $(window).scrollTop(),
        start = section.offset().top - 100;



    // console.log(top);
    // console.log(start);

    $(window).scroll(function(){
        top = $(window).scrollTop();
        start = section.offset().top - 100;

        if (top > start && top < (start + section.height())) {
            if (played === false) {
                player.play();
                played = true;
                player.setVolume(0);
                console.log('play');
            }
        } else {
            played = false;
            player.pause();
            console.log('pause');
        }
    });


    fullscr.on('click', function(e) {
        player.requestFullscreen();
    });


    player.on('fullscreenchange', function(e) {
        console.log(e.fullscreen);
        if (e.fullscreen) {
            player.setVolume(1);
        } else {
            player.setVolume(0);
        }
        // player.requestFullscreen();
        // player.setVolume(1);
    });

    // fullscr.on('click', function() {
    //     modal.modal('show');
    // });
    //
    // modal.on('show.bs.modal', function() {
    //     video.appendTo('.videoModal .modal-content');
    //     player.setVolume(1);
    //     // player.play();
    //     played = true;
    // });
    //
    // modal.on('hide.bs.modal', function() {
    //     video.prependTo('.rezultat__video');
    //     player.setVolume(0);
    // });

}

playVideo('#final');
