$('.slider').slick({
	centerMode: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	variableWidth: true,
	infinite: false
});

$('.floating').click(function () {
	$(this).find('p').addClass('active').find('span').slideToggle();
	$(this).toggleClass('active');
});


	$('.advantage .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.advantage').css('background-image', 'url(img/bg_slider'+nextSlide+'.png)');
		if (nextSlide === 2) {
			$('.advantage').css("background-position", "40% 0%");
		} else {
			$('.advantage').css("background-position", "100% 0%");
		}
	});
	$('.reviews .slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.reviews').css('background-image', 'url(img/slider2_bg'+nextSlide+'.png)');
	});
	let scroll = $("main .key .wrapper .item").width() + $("main .key .wrapper .item").width()/14;
	$("main .key .wrapper").click(function () {
		$("main .key .wrapper").animate({scrollLeft: scroll}, 500);
	})


$(window).on("load", function() {
	var wow = new WOW({
		offset: 60
	})
	wow.init();
	$('.key .wrapper .item img').each(function () {
		let width = $(this).width();
		$(this).width(width / 19.2 + 'vw')
	})
});

if ( $(window).width() < 999 ) {
	$('.page_wrapper, .certificate .container, .portfolio .container .wrapper').slick({
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		infinite: false
	});
};


$(document).ready(function(){
	$("body").on("click",".button", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;

		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});
});