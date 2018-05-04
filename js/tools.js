$(document).ready(function() {

    $('.nav-mobile-link').click(function(e) {
        $('html').toggleClass('nav-mobile-open');
        e.preventDefault();
    });

    $('body').on('click', 'nav a, .up-link', function(e) {
        var curItem = $($(this).attr('href'));
        if (curItem.length > 0) {
            $.scrollTo(curItem, {duration: 500});
            $('html').removeClass('nav-mobile-open');
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
        initialSlide: startIndex,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false
                }
            }
        ]
    }).on('setPosition', function(event, slick) {
        var curIndex = $('.reviews-list').slick('slickCurrentSlide');
        $('.reviews-authors-item.active').removeClass('active');
        $('.reviews-authors-item').eq(curIndex).addClass('active');
    });

    startIndex = Math.floor($('.it-authors-item').length / 2);
    $('.it-authors-item:first').addClass('active');
    $('.it-authors-list').slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        arrows: false,
        initialSlide: startIndex
    });

    $('.it-authors-item a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curIndex = $('.it-authors-item').index(curItem);
            if ($('.it-authors-list').hasClass('slick-slider')) {
                $('.it-authors-list').slick('slickGoTo', curIndex);
                $('.it-list').slick('slickGoTo', curIndex);
            }
            $('.it-authors-item.active').removeClass('active');
            curItem.addClass('active');
        }
        e.preventDefault();
    });

    $(window).on('load resize', function() {
        var curHeight = 0;
        $('.it-item-text-descr-wrap').css({'min-height': 0});
        $('.it-item-text-descr-wrap').each(function() {
            if (curHeight < $(this).height()) {
                curHeight = $(this).height();
            }
        });
        $('.it-item-text-descr-wrap').css({'min-height': curHeight});

        curHeight = 0;
        $('.it-item-text-author-name').css({'min-height': 0});
        $('.it-item-text-author-name').each(function() {
            if (curHeight < $(this).height()) {
                curHeight = $(this).height();
            }
        });
        $('.it-item-text-author-name').css({'min-height': curHeight});

        curHeight = 0;
        $('.it-item-text-author-post').css({'min-height': 0});
        $('.it-item-text-author-post').each(function() {
            if (curHeight < $(this).height()) {
                curHeight = $(this).height();
            }
        });
        $('.it-item-text-author-post').css({'min-height': curHeight});
    });

    $('.it-list').slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        asNavFor: '.it-authors-list',
        initialSlide: startIndex,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: false
                }
            }
        ]
    }).on('setPosition', function(event, slick) {
        var curIndex = $('.it-list').slick('slickCurrentSlide');
        $('.it-authors-item.active').removeClass('active');
        $('.it-authors-item').eq(curIndex).addClass('active');
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
        $('.contest-list').addClass('contest-step-theme');
        e.preventDefault();
    });

    $('.contest-theme-item').click(function(e) {
        var curItem = $(this);
        if (!curItem.hasClass('active')) {
            $('.contest-theme-item.active').removeClass('active');
            curItem.addClass('active');
            $('.contest-theme-item-next').addClass('active');
            $('.contest-theme-item-next-icon').html(curItem.find('.contest-theme-item-icon').html());
            $('.contest-theme-item-next-theme').html(curItem.find('.contest-theme-item-title').html());
            $('.contest-text-textarea textarea').attr('placeholder', curItem.data('placeholder'));
            $('.contest-text-textarea-mobile').html(curItem.data('placeholder'));
            $('.contest-text-header-theme').html(curItem.find('.contest-theme-item-title').html());
            var canvas = document.getElementById('photo-editor');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            var img = new Image();
            img.onload = function() {
                context.drawImage(img, 0, 0, 580, 580);
            };
            img.src = curItem.data('border');
            $('.contest-photo-upload-field input').val(null);
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
            $('.contest-photo').removeClass('active');
        }
        e.preventDefault();
    });

    $('.contest-menu-back-from-photo').click(function() {
        $('.contest-list').removeClass('contest-step-photo').addClass('contest-step-theme');
    });

    $('.contest-photo-upload-field input').on('change', function(e) {
        var file = this.files[0];
        var reader = new FileReader;
        reader.onload = function(event) {
            if (file.type.match("image.*")) {
                var exifOrientation = 0;
                EXIF.getData(file, function () {
                    switch (this.exifdata.Orientation) {
                        case 1:
                            exifOrientation = 0;
                            break;
                        case 2:
                            exifOrientation = 0;
                            break;
                        case 3:
                            exifOrientation = 180;
                            break;
                        case 4:
                            exifOrientation = 180;
                            break;
                        case 5:
                            exifOrientation = 90;
                            break;
                        case 6:
                            exifOrientation = 90;
                            break;
                        case 7:
                            exifOrientation = -90;
                            break;
                        case 8:
                            exifOrientation = -90;
                            break;
                        default:
                            exifOrientation = 0
                    }
                });
                var dataUri = event.target.result;
                var canvas = document.getElementById('photo-editor');
                var context = canvas.getContext('2d');
                var img = new Image();
                img.onload = function() {
                    var curTheme = $('.contest-theme-item.active');
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    var imgTheme = new Image();
                    imgTheme.onload = function() {
                        var imgWidth  = img.width;
                        var imgHeight = img.height;
                        var newWidth  = 580;
                        var newHeight = 580;
                        var newX = -290;
                        var newY = -290;
                        if (imgWidth > imgHeight) {
                            var diffHeight = newHeight / imgHeight;
                            newWidth = imgWidth * diffHeight;
                            newX = -(newWidth - 580) / 2 - 290;
                        } else {
                            var diffWidth = newWidth / imgWidth;
                            newHeight = imgHeight * diffWidth;
                            newY = -(newHeight - 580) / 2 - 290;
                        }
                        var TO_RADIANS = Math.PI/180;
                        context.save();
                        context.translate(290, 290);
                        context.rotate(exifOrientation * TO_RADIANS);
                        context.drawImage(img, newX, newY, newWidth, newHeight);
                        context.restore();
                        context.translate(0, 0);

                        context.drawImage(imgTheme, 0, 0, 580, 580);
                        $('.contest-photo').addClass('active');
                    };
                    imgTheme.src = curTheme.data('border');
                };
                img.src = dataUri;
            }
        }
        reader.readAsDataURL(file);
    });

    $('.contest-photo-reload').click(function(e) {
        var canvas = document.getElementById('photo-editor');
        var context = canvas.getContext('2d');
        var curTheme = $('.contest-theme-item.active');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var imgTheme = new Image();
        imgTheme.onload = function() {
            context.drawImage(imgTheme, 0, 0, 580, 580);
            $('.contest-photo-upload-field input').val(null);
            $('.contest-photo').removeClass('active');
        };
        imgTheme.src = curTheme.data('border');
        e.preventDefault();
    });

    $('.contest-photo-item-next').click(function(e) {
        if ($('.contest-photo').hasClass('active')) {
            var canvas = document.getElementById('photo-editor');
            var img = $('.contest-text-photo img');
            img.attr('src', canvas.toDataURL('image/jpeg'));
            $('.contest-list').removeClass('contest-step-photo').addClass('contest-step-text');
        }
        e.preventDefault();
    });

    $('.contest-menu-back-from-text').click(function() {
        $('.contest-list').removeClass('contest-step-text').addClass('contest-step-photo');
    });

    $('.contest-text-textarea textarea').keyup(function() {
        if ($(this).val() != '') {
            $('.contest-text-next').addClass('active');
        } else {
            $('.contest-text-next').removeClass('active');
        }
    });

    $('.contest-text-next, .contest-text-next-mobile').click(function(e) {
        if ($(this).hasClass('active')) {
            $('.contest-list').removeClass('contest-step-text').addClass('contest-step-auth');
            // data to vk
            var curThemeID = $('.contest-theme-item.active').data('id');
            var curThemeTitle = $('.contest-theme-item.active').find('.contest-theme-item-title').html();
            var curImg = $('.contest-text-photo img').attr('src');
            var curText = $('.contest-text-textarea textarea').val();
            if (curText == '') {
                curText = $('.contest-text-textarea textarea').attr('placeholder');
            }
            var dataTransfer = {
                "themeID": curThemeID,
                "curThemeTitle": curThemeTitle,
                "curIMG": curImg,
                "curText": curText
            };
            $.ajax({
                type: 'POST',
                url: 'files/canvas.json',
                dataType: 'json',
                data: dataTransfer,
                cache: false
            }).done(function(data) {
                console.log(data.p);
            });
        }
        e.preventDefault();
    });

    $('.contest-menu-back-from-auth').click(function() {
        $('.contest-list').removeClass('contest-step-auth').addClass('contest-step-text');
    });

    $('.contest-auth-link').click(function(e) {
        // auth to vk
        $('.contest-list').removeClass('contest-step-auth').addClass('contest-step-share');
        e.preventDefault();
    });

    var localstream;

    $('.contest-photo-camera-field').click(function() {
        $('.contest-photo').addClass('camera');
        window.navigator = window.navigator || {};
         navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || null;
        if (navigator.getUserMedia !== null) {
            var createSrc = window.URL ? window.URL.createObjectURL : function(stream) { return stream; };
            navigator.getUserMedia(
                {
                    audio: false,
                    video: true
                },
                function(stream) {
                    var video = document.getElementById('camera-stream');
                    video.src = createSrc(stream);
                    localstream = stream;
                    video.play();
                },
                function(err){
                    alert('Ошибка: ' + err.name, err);
                    $('.contest-photo').removeClass('camera');
                }
            );
        } else {
            $('.contest-photo').removeClass('camera');
        }
    });

    $('.contest-camera-btn').click(function(e) {
        var video = document.getElementById('camera-stream');
        video.pause();
        var canvas = document.getElementById('photo-editor');
        var context = canvas.getContext('2d');
        var curTheme = $('.contest-theme-item.active');
        var imgTheme = new Image();
        imgTheme.onload = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            var imgWidth  = video.videoWidth;
            var imgHeight = video.videoHeight;
            var newWidth  = 580;
            var newHeight = 580;
            var newX = 0;
            var newY = 0;
            if (imgWidth > imgHeight) {
                var diffHeight = newHeight / imgHeight;
                newWidth = imgWidth * diffHeight;
                newX = -(newWidth - 580) / 2;
            } else {
                var diffWidth = newWidth / imgWidth;
                newHeight = imgHeight * diffWidth;
                newY = -(newHeight - 580) / 2;
            }
            context.drawImage(video, newX, newY, newWidth, newHeight);
            context.drawImage(imgTheme, 0, 0, 580, 580);
            $('.contest-photo').addClass('active').removeClass('camera');
            video.src = '';
            localstream.getTracks()[0].stop();
        }
        imgTheme.src = curTheme.data('border');
        e.preventDefault();
    });

    $('.contest-theme-list').jScrollPane({autoReinitialise: true});

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