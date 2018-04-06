$(document).ready(function() {

    $('body').on('click', 'nav a, .up-link', function(e) {
        var curItem = $($(this).attr('href'));
        if (curItem.length > 0) {
            $.scrollTo(curItem, {duration: 500});
            e.preventDefault();
        }
    });

    var startIndex = Math.round($('.reviews-authors-item').length / 2);
    $('.reviews-authors-item:first').addClass('active');
    $('.reviews-authors-list').slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        arrows: false,
        initialSlide: startIndex
    });

    $('.reviews-authors-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curIndex = $('.reviews-authors-item').index(curItem);
            if ($('.reviews-authors-list').hasClass('slick-slider')) {
                $('.reviews-authors-list').slick('slickGoTo', curIndex);
                $('.reviews-list').slick('slickGoTo', curIndex);
            }
            $('.reviews-authors-item.active').removeClass('active');
            curItem.addClass('active');
        }
        e.preventDefault();
    });

    $('.reviews-list').slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        asNavFor: '.reviews-authors-list',
        initialSlide: startIndex
    }).on('setPosition', function(event, slick) {
        var curIndex = $('.reviews-list').slick('slickCurrentSlide');
        $('.reviews-authors-item.active').removeClass('active');
        $('.reviews-authors-item').eq(curIndex).addClass('active');
    });

    $('.video-play').click(function(e) {
        $('.video').addClass('play');
        player.playVideo();
        e.preventDefault();
    });

    $(window).on('load resize scroll', function() {
        if ($(window).scrollTop() > $(window).height()) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }
    });

    updateTimer();

    $('.contest-link-start').click(function(e) {
        $('.contest-list').addClass('contest-step-auth');
        e.preventDefault();
    });

    $('.contest-auth-link').click(function(e) {
        $('.contest-list').removeClass('contest-step-auth').addClass('contest-step-theme');
        e.preventDefault();
    });

    $('.contest-theme-item').click(function(e) {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.contest-theme-item.active').removeClass('active');
            curItem.addClass('active');
            $('.contest-theme-item-next').addClass('active');
            $('.contest-theme-item-next-icon img').attr('src', 'images/contest-theme-' + curItem.data('id') + '-icon-active.png');
            $('.contest-theme-item-next-theme').html(curItem.find('.contest-theme-item-title').html());
            $('.contest-photo-border').css({'background-image': 'url(images/contest-photo-border-' + curItem.data('id') + '.png)'});
        } else {
            curItem.removeClass('active');
            $('.contest-theme-item-next-icon img').attr('src', 'images/blank.gif');
            $('.contest-theme-item-next-theme').html('');
            $('.contest-theme-item-next').removeClass('active');
        }
    });

    $('.contest-theme-item-next').click(function(e) {
        if ($(this).hasClass('active')) {
            $('.contest-list').removeClass('contest-step-theme').addClass('contest-step-photo');
        }
        e.preventDefault();
    });

});

function updateTimer() {
    var minutes = 60;
    var hours   = minutes * 60;
    var days    = hours * 24;

    var curTimer = $('.timer');
    var timerLeft = Math.floor((new Date(curTimer.data('timestamp')) - (new Date())) / 1000);

    var timerDays = Math.floor(timerLeft / days);
    if (timerDays < 0) {
        timerDays = 0;
    }
    curTimer.find('.timer-item').eq(0).find('.timer-item-value').html(timerDays);

    timerLeft -= timerDays * days;

    var timerHours = Math.floor(timerLeft / hours);
    if (timerHours < 0) {
        timerHours = 0;
    }
    curTimer.find('.timer-item').eq(1).find('.timer-item-value').html(timerHours);

    timerLeft -= timerHours * hours;

    var timerMinutes = Math.floor(timerLeft / minutes);
    if (timerMinutes < 0) {
        timerMinutes = 0;
    }
    curTimer.find('.timer-item').eq(2).find('.timer-item-value').html(timerMinutes);

    timerLeft -= timerMinutes * minutes;

    if (timerLeft < 0) {
        timerLeft = 0;
    }

    curTimer.find('.timer-item').eq(3).find('.timer-item-value').html(timerLeft);

    setTimeout(updateTimer, 1000);
}