

objectFitImages();



// ===== webp =====

(function () {

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}());



//сбрасываем :focus

(function () {
	var button = document.querySelectorAll('a, button, label, input');

	var isMouseDown = false;

	for (var i = 0; i < button.length; i++) {
		var el = button[i];

		if (el.tagName !== 'LABEL') {
			el.classList.add('focus');
		}

		el.addEventListener('mousedown', function () {
			this.classList.remove('focus');
			isMouseDown = true;
		});
		el.addEventListener('keydown', function (e) {
			if (e.key === "Tab") {
				isMouseDown = false;
			}
		});
		el.addEventListener('focus', function () {
			if (isMouseDown) {
				this.classList.remove('focus');
			}
		});
		el.addEventListener('blur', function () {
			this.classList.add('focus');
		});
	}
}());



// ===== up =====

(function () {
	var btn_up = document.querySelector('[data-up]');

	function scrollUp() {
		window.scrollBy(0, -80);

		if (window.pageYOffset > 0) {
			requestAnimationFrame(scrollUp);
		}
	}

	var lastScrollPos = 0;
	var start = true;

	function showBtnUp() {
		if (start) {
			start = false;

			setTimeout(function () {
				var scrollPos = window.pageYOffset;

				if (scrollPos > 600 && scrollPos < lastScrollPos) {
					btn_up.classList.add('show');
				} else {
					btn_up.classList.remove('show');
				}
				lastScrollPos = scrollPos;
				start = true;
			}, 200);
		}
	}

	if (btn_up) {
		btn_up.addEventListener('click', scrollUp);
		document.addEventListener('scroll', showBtnUp);
	}
}());



// ===== navigation =====

(function () {
	var nav = document.querySelector('.navbar');
	var head = document.querySelector('.head');
	// var overlay = document.querySelector('.overlay');
	var body = document.querySelector('body');
	var burger = document.querySelector('.burger');

	burger.addEventListener('click', toggleMenu);

	function toggleMenu() {
		this.classList.toggle('active');
		nav.classList.toggle('active');
		head.classList.toggle('active');
		// overlay.classList.toggle('active');
		body.classList.toggle('lock');
		// swipe(nav);
	}

}());



// ===== menu drop ===== 

(function () {

	var btnDrop = document.querySelectorAll('[data-drop]');
	if (btnDrop) {
		for (var i = 0; i < btnDrop.length; i++) {

			var link = btnDrop[i].parentElement.querySelector('a');
			var label = '<span class="visuallyhidden">открыть подменю для“' + link.text + '”</span>';
			btnDrop[i].insertAdjacentHTML('beforeend', label);

			btnDrop[i].addEventListener('click', function (e) {
				if (this.classList.contains('active')) {
					this.classList.remove('active');
					this.nextElementSibling.classList.remove('show');
					this.setAttribute('aria-expanded', "false");
					this.parentElement.querySelector('a').setAttribute('aria-expanded', "false");
				} else {
					this.classList.add('active');
					this.nextElementSibling.classList.add('show');
					this.setAttribute('aria-expanded', "true");
					this.parentElement.querySelector('a').setAttribute('aria-expanded', "true");
				}
			});
		}
	}

}());



// ===== show map & filter ===== 

(function () {
	$('.index-pin__btn').click(function () {
		$('.map').toggleClass('active');
	});
	$('.shop-pin__btn').click(function () {
		$(this).toggleClass('active');
		$('.filter').slideToggle(500);
	});

}());




// ======== map ======== 

function initMap() {
	var minePos = new google.maps.LatLng(55.75510374995707, 37.62232060707735);

	var somePos = [
		new google.maps.LatLng(55.765743890500465, 37.70273989522459),
		new google.maps.LatLng(55.761315137846294, 37.52574770772459),
		new google.maps.LatLng(55.72765991950655, 37.61751408852266),
	];

	var mapBox = document.getElementById('map');

	var styles_Snazzy = [{
		"stylers": [{
			"visibility": "on"
		},
		{
			"saturation": -100
		}
		]
	},
	{
		"featureType": "water",
		"stylers": [{
			"visibility": "on"
		},
		{
			"saturation": 100
		},
		{
			"hue": "#00ffe6"
		}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{
			"saturation": 100
		},
		{
			"hue": "#00ffcc"
		}
		]
	},
	{
		"featureType": "poi",
		"stylers": [{
			"visibility": "off"
		}]
	},
	{
		"featureType": "poi.park",
		"stylers": [{
			"visibility": "on"
		}]
	}
	];

	var mapOptions = {
		center: minePos,
		zoom: 12, // 0 - 21
		disableDefaultUI: true,
		styles: styles_Snazzy,
		// mapTypeId: google.maps.MapTypeId.SATELLITE,  // спутник
	};

	if (mapBox) {
		var map = new google.maps.Map(mapBox, mapOptions);
	}




	// === constructor Custom Marker ===

	HTMLMarker.prototype = new google.maps.OverlayView();

	function HTMLMarker(pos) {
		this.pos = pos;
	}

	HTMLMarker.prototype.onRemove = function () {
		if (this.div && this.div.parentNode && this.div.parentNode.removeChild)
			this.div.parentNode.removeChild(this.div);
	}

	HTMLMarker.prototype.getDraggable = function () { };
	HTMLMarker.prototype.getPosition = function () {
		return this.pos
	};

	var number = 1;
	HTMLMarker.prototype.onAdd = function () {
		this.div = document.createElement('DIV');
		this.div.className = "marker";
		this.div.style.position = 'absolute';
		this.div.innerHTML = number;
		number++;
		var panes = this.getPanes();
		panes.overlayImage.appendChild(this.div);
		var that = this;
		this.div.addEventListener("click", function (evt) {
			google.maps.event.trigger(that, 'click', {
				latLng: that.pos
			})
		})
	}

	HTMLMarker.prototype.draw = function () {
		var overlayProjection = this.getProjection();
		var position = overlayProjection.fromLatLngToDivPixel(this.pos);
		var panes = this.getPanes();
		this.div.style.left = position.x + 'px';
		this.div.style.top = position.y + 'px';
	}
	// === end constructor ===





	// ======= constructor Custom InfoWindow ========

	INFWOverlay.prototype = new google.maps.OverlayView();

	function INFWOverlay(content, map, point) {
		this.content_ = content;
		this.map_ = map;
		this.point_ = point;

		this.setMap(map);
	}

	INFWOverlay.prototype.onAdd = function () {
		var CIW = this;

		var div = document.createElement('div');

		div.style.position = 'absolute';
		div.classList.add('infowindow');
		div.innerHTML = CIW.content_;

		//  Close  
		var divClose = document.createElement('div');
		divClose.classList.add('close');
		divClose.addEventListener('click', function (e) {
			e.stopPropagation();
			CIW.toggle();
		});

		div.appendChild(divClose);

		CIW.div_ = div;

		var panes = CIW.getPanes();
		panes.overlayImage.appendChild(CIW.div_);
	};


	INFWOverlay.prototype.draw = function () {
		var overlayProjection = this.getProjection();
		var sw = overlayProjection.fromLatLngToDivPixel(this.point_);

		var div = this.div_;
		if (window.innerWidth > 767) {
			div.style.left = sw.x + 'px';
			div.style.top = (sw.y - 16) + 'px'; //минус высота стрелки
		}
	};


	INFWOverlay.prototype.hide = function () {
		if (this.div_) {
			this.div_.style.visibility = 'hidden';
		}
	};

	INFWOverlay.prototype.show = function () {
		if (this.div_) {
			this.div_.style.visibility = 'visible';
		}
	};

	INFWOverlay.prototype.toggle = function () {
		if (this.div_) {
			if (this.div_.style.visibility === 'hidden') {
				this.show();
			} else {
				this.hide();
			}
		}
	}   // === end constructor ===    


	var infoMessages = [
		'<div class="infowindow__title">ТЦ Терра</div>' +
		'<div class="infowindow__desc icon-pin">ул. Оболонская 9</div>' +
		'<div class="infowindow__desc icon-phone">7(044)290-37-83</div>' +
		'<div class="infowindow__desc icon-time">Пн-Пт 9.00-20.00 <br> Сб-Вс Выходной</div>' +
		'<p>Вход со стороны двора</p>',
		'<div class="infowindow__title">ТЦ Терра</div>' +
		'<div class="infowindow__desc icon-pin">ул. Оболонская 9</div>' +
		'<div class="infowindow__desc icon-phone">7(044)290-37-83</div>' +
		'<div class="infowindow__desc icon-time">Пн-Пт 9.00-20.00 <br> Сб-Вс Выходной</div>' +
		'<p>Вход со стороны двора</p>',
		'<div class="infowindow__title">ТЦ Терра</div>' +
		'<div class="infowindow__desc icon-pin">ул. Оболонская 9</div>' +
		'<div class="infowindow__desc icon-phone">7(044)290-37-83</div>' +
		'<div class="infowindow__desc icon-time">Пн-Пт 9.00-20.00 <br> Сб-Вс Выходной</div>' +
		'<p>Вход со стороны двора</p>'];



	// === some cuctom HTMLMarker + cuctom InfoWindow ===

	for (var i = 0; i < somePos.length; i++) {
		var htmlMarker = new HTMLMarker(somePos[i]);
		htmlMarker.setMap(map);

		addInfoWindow(htmlMarker, infoMessages[i], somePos[i]);
	}


	function addInfoWindow(marker, textMessage, pos) {
		var INFOWindow = new INFWOverlay(
			textMessage,
			map,
			pos
		);

		marker.addListener('click', function () {
			INFOWindow.show();
		});
	}




	// === constructor Custom MainMarker ===

	MainMarker.prototype = new HTMLMarker();

	function MainMarker(pos) {
		this.pos = pos;
	}

	MainMarker.prototype.onAdd = function () {
		this.div = document.createElement('DIV');
		this.div.className = "mainmarker";
		this.div.style.position = 'absolute';
		var panes = this.getPanes();
		panes.overlayImage.appendChild(this.div);
		var that = this;
		this.div.addEventListener("click", function (evt) {
			google.maps.event.trigger(that, 'click', {
				latLng: that.pos
			})
		})
	}
	// === end constructor ===



	// ======== one Custom Marker ========

	var mainMarker = new MainMarker(minePos);
	mainMarker.setMap(map);



	// === one Custom InfoWindow ===

	var mainContent =
		'<div class="infowindow__title">ТЦ Терра</div>' +
		'<div class="infowindow__desc icon-pin">ул. Оболонская 9</div>' +
		'<div class="infowindow__desc icon-phone">7(044)290-37-83</div>' +
		'<div class="infowindow__desc icon-time">Пн-Пт 9.00-20.00 <br> Сб-Вс Выходной</div>' +
		'<p>Вход со стороны двора</p>';

	var mainInfoWindow = new INFWOverlay(
		mainContent,
		map,
		minePos
	);

	mainMarker.addListener('click', function () {
		mainInfoWindow.show();
	});

}
google.maps.event.addDomListener(window, "load", initMap);







// ===== slick  brand__slider =====

(function () {

	var sliderSettings = {
		prevArrow: $('.brand__prev'),
		nextArrow: $('.brand__next'),
		infinite: false,
		dots: true,
		appendDots: $('.user__dots'),
		slidesToShow: 1,
		slidesToScroll: 1
	}

	var slider = document.querySelector('.brand__slider');
	var list = [].slice.call(document.querySelectorAll('.brand__list2 li'), 0);
	var copyList;
	var qtyImg;

	var mqls = [
		window.matchMedia('(min-width: 480px)'),
		window.matchMedia('(min-width: 768px)'),
		window.matchMedia('(min-width: 1200px)')
	]

	for (var i = 0; i < mqls.length; i++) {
		mqls[i].addListener(startSlider);
	}

	startSlider();

	function startSlider() {

		qtyImg = 5;

		if (mqls[0].matches) {
			qtyImg = 7;
		}
		if (mqls[1].matches) {
			qtyImg = 9;
		}
		if (mqls[2].matches) {
			qtyImg = 12;
		}

		if ($('.brand__slider').hasClass('slick-initialized')) {
			$('.brand__slider').slick('unslick');
			$('.brand__slide').remove();
		}

		copyList = list.slice(0);

		for (var i = copyList.length; i > 0; i = i - qtyImg) {
			createSlide();
		}

		$('.brand__slider').slick(sliderSettings);
	}

	function createSlide() {

		var newSlide = document.createElement('div');
		var newList = document.createElement('ul');

		imgList = copyList.splice(0, qtyImg);

		for (var i = 0; i < imgList.length; i++) {
			newList.insertAdjacentElement('beforeEnd', imgList[i]);
		}

		newSlide.className = 'brand__slide';
		newList.className = 'brand__list';

		newSlide.insertAdjacentElement('afterBegin', newList);
		slider.insertAdjacentElement('beforeEnd', newSlide);
	}

}());



// ==== select gibrid-4 ====

(function () {
	var natives = document.querySelectorAll('[data-select]');

	if (natives) {

		for (var i = 0; i < natives.length; i++) {
			select(i);
		}

		function select(i) {

			var native = natives[i];
			var nativeClass = native.classList;
			var parent = native.parentElement;

			var optionInvalid = native.querySelector('.invalid');
			var optionChecked = native.querySelector('option:checked');
			var optionCheckedText = optionChecked.textContent;
			var optionCheckedValue = optionChecked.value;
			var optionCheckedIndex;

			var optionsClass = [];

			createSelectCustom(native);


			function createClass(addClass) {
				if (nativeClass) {
					var customClass = '';

					for (var i = 0; i < nativeClass.length; i++) {

						customClass = customClass + ' ' + nativeClass[i] + addClass;
					}
					return customClass;
				}
			}


			function createSelectCustom(select) {
				var options = select.querySelectorAll('option');

				var selectedClass = optionChecked.getAttribute('class');
				var selectBtn;

				if (optionInvalid) {
					selectBtn = '<div class="' + createClass('-custom__btn') + ' invalid">' +
						optionCheckedText + '</div>';
				} else {
					selectBtn = '<div class="' + createClass('-custom__btn') + selectedClass + '">' +
						optionCheckedText + '</div>';
				}

				parent.insertAdjacentHTML('beforeend',
					'<div class="' + createClass('-custom') + '" aria-hidden="true">' +
					selectBtn +
					'<div class="' + createClass('-custom__options') + '">' +
					createCustomOptions(options) + '' +
					'</div></div></div>');
			}


			function createCustomOptions(options) {
				if (options) {
					var customOptions = '';
					for (var i = 0; i < options.length; i++) {
						var option = options[i];
						var optionValue = option.value;

						if (!option.hasAttribute('hidden')) {
							var optionClass = option.getAttribute('class') || '';
							optionsClass.push(optionClass);
						}

						if (option == optionChecked) {
							optionCheckedIndex = i;
						}

						if (optionValue != '') {
							var optionText = option.text;

							customOptions = customOptions +
								'<div data-value="' + optionValue +
								'" class="' + createClass('-custom__option') +
								' ' + optionClass + ' ">' + optionText + '</div>';
						}
					}
					return customOptions;
				}
			}


			var selectCustom = native.nextElementSibling;
			var selectCustomBtn = selectCustom.children[0];
			var selectCustomOpts = selectCustom.children[1];
			var customOptsList = [].slice.call(selectCustomOpts.children, 0);;
			var optionsCount = customOptsList.length;
			var optionHoveredIndex = -1;

			if (optionCheckedValue) {
				updateCustomSelectChecked(optionCheckedValue, optionCheckedText, optionCheckedIndex);
			}


			selectCustomBtn.addEventListener("click", function (e) {
				var isClosed = !selectCustom.classList.contains("isActive");
				if (isClosed) {
					openSelectCustom();
				} else {
					closeSelectCustom();
				}
			});


			function openSelectCustom() {
				selectCustom.classList.add("isActive");
				parent.classList.add("isActive");
				selectCustom.setAttribute("aria-hidden", false);

				if (optionCheckedValue) {
					for (var i = 0; i < customOptsList.length; i++) {
						var customValue = customOptsList[i].getAttribute("data-value");
						if (customValue === optionCheckedValue) {
							optionCheckedIndex = i;
						}
					}

					updateCustomSelectHovered(optionCheckedIndex);
				}

				document.addEventListener("click", watchClickOutside);
				document.addEventListener("keydown", supportKeyboardNavigation);
			}


			function closeSelectCustom() {
				selectCustom.classList.remove("isActive");
				parent.classList.remove("isActive");

				selectCustom.setAttribute("aria-hidden", true);

				updateCustomSelectHovered(-1);

				document.removeEventListener("click", watchClickOutside);
				document.removeEventListener("keydown", supportKeyboardNavigation);
			}


			function updateCustomSelectHovered(newIndex) {
				var prevOption = selectCustomOpts.children[optionHoveredIndex];
				var option = selectCustomOpts.children[newIndex];

				if (prevOption) {
					prevOption.classList.remove("isHover");
				}
				if (option) {
					option.classList.add("isHover");
				}
				optionHoveredIndex = newIndex;
			}


			function updateCustomSelectChecked(value, text, optionIndex) {
				var prevValue = optionCheckedValue;
				var elPrevOption = selectCustomOpts.querySelector(`[data-value="${prevValue}"`);
				var elOption = selectCustomOpts.querySelector(`[data-value="${value}"`);

				if (elPrevOption) {
					elPrevOption.classList.remove("isActive");
				}

				if (elOption) {
					elOption.classList.add("isActive");
				}

				selectCustomBtn.textContent = text;
				selectCustomBtn.className = createClass('-custom__btn') + ' ' + optionsClass[optionIndex];
				optionCheckedValue = value;
			}


			function watchClickOutside(e) {
				var didClickedOutside = !selectCustom.contains(e.target);
				if (didClickedOutside) {
					closeSelectCustom();
				}
			}


			function supportKeyboardNavigation(e) {
				// press down -> go next
				if (e.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
					var index = optionHoveredIndex;
					e.preventDefault(); // prevent page scrolling
					updateCustomSelectHovered(optionHoveredIndex + 1);
				}


				// press up -> go previous
				if (e.keyCode === 38 && optionHoveredIndex > 0) {
					e.preventDefault(); // prevent page scrolling
					updateCustomSelectHovered(optionHoveredIndex - 1);
				}


				// press Enter or space -> select the option
				if (e.keyCode === 13 || e.keyCode === 32) {
					e.preventDefault();

					var option = selectCustomOpts.children[optionHoveredIndex];
					var value = option && option.getAttribute("data-value");
					//  console.log(option);

					if (value) {
						native.value = value;
						updateCustomSelectChecked(value, option.textContent);
					}
					closeSelectCustom();
				}


				// press ESC -> close selectCustom
				if (e.keyCode === 27) {
					closeSelectCustom();
				}
			}


			function getIndex(el) {
				for (var i = 0; el = el.previousElementSibling; i++);
				return i;
			}


			native.addEventListener("change", function (e) {
				var value = e.target.value;
				var respectiveCustomOpt = selectCustomOpts.querySelector(`[data-value="${value}"]`);

				var index = getIndex(respectiveCustomOpt);

				updateCustomSelectChecked(value, respectiveCustomOpt.textContent, index);
			});


			for (var i = 0; i < customOptsList.length; i++) {
				func(i);
			}

			function func(i) {
				var el = customOptsList[i];
				el.addEventListener("click", function (e) {
					var value = e.target.getAttribute("data-value");
					native.value = value;
					updateCustomSelectChecked(value, e.target.textContent, i);
					closeSelectCustom();
				});

				el.addEventListener("mouseenter", function (e) {
					updateCustomSelectHovered(i);
				});
			}


			// ===== select gibrid arrow =====

			native.addEventListener('click', function () {
				parent.classList.toggle('oupen');
			});

			native.addEventListener('keydown', function (e) {
				if (e.keyCode === 13 || e.keyCode === 32) {
					parent.classList.toggle('oupen');
				}
			});

			native.addEventListener('focus', function () {
				parent.classList.add('focus');
			});

			native.addEventListener('blur', function () {
				parent.classList.remove('oupen');
				parent.classList.remove('focus');
			});
		}
	}
}());




// store__slider

$('.store__slider').slick({
	prevArrow: $('.store__prev'),
	nextArrow: $('.store__next'),
	// infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
});



// stock__slider

(function () {
	var mq = window.matchMedia('(min-width: 1350px)');

	mq.addListener(startSlider);

	function startSlider() {
		if (mq.matches) {
			console.log('hi');
			$('.stock__slider').slick({
				prevArrow: $('.stock__prev'),
				nextArrow: $('.stock__next'),
				// infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
			});
		} else {
			if ($('.stock__slider').hasClass('slick-initialized')) {
				$('.stock__slider').slick('unslick');
			}
		}
	}


	var target = document.querySelector('.stock');

	if (target) {

		var config = {
			attributes: true,
			attributeFilter: ['style'],
		}

		var observer = new MutationObserver(onMutate);

		observer.observe(target, config);

		function onMutate() {
			startSlider();
			observer.disconnect();
		}
	}
}());



// ====== validate and sendform ========

(function () {
	var form1 = document.getElementById('form_1');
	var form2 = document.getElementById('form_2');
	var reg = document.querySelectorAll('input[required]');

	if (reg) {
		for (var i = 0; i < reg.length; i++) {
			var elem = reg[i];
			elem.addEventListener('blur', check);
			elem.addEventListener('focus', rezet);
		}
	}

	if (form1) {
		form1.addEventListener('submit', validate);
	}
	if (form2) {
		// form2.addEventListener('submit', ajaxSend);
		form2.addEventListener('submit', validate);
	}

	function rezet() {
		var error = this.parentElement.querySelector('.error');
		this.classList.remove('invalid');
		error.classList.remove('active');
		error.addEventListener('transitionend', function() {
			if (!this.classList.contains('active')) {
			this.innerHTML = '';
			}
	 });
	}

	function check() {
		var error = this.parentElement.querySelector('.error');

		if (!this.validity.valid) {
			this.classList.add('invalid');
			error.classList.add('active');
			error.innerHTML = 'ошибка / неправильный формат';
			if (this.validity.valueMissing || this.value === '') {
				error.classList.add('active');
				error.innerHTML = 'ошибка / заполните поле';
			}
			return 1;
		} else {
			return 0;
		}
	}

	function validate(e) {			e.preventDefault();

	}

	function ajaxSend(e) {
		e.preventDefault();
		var el = this;
		var error = validate.call(el, e);

		if (error === 0) {
			this.classList.add('sending');
			var formData = new FormData(this);
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.getAttribute("action"));
			xhr.send(formData);

			xhr.onloadend = function () {
				if (xhr.status == 200) {
					el.classList.remove('sending');
					el.reset();
					// alert('Сообщение отправлено.');
					// alert(xhr.response);  //ответ сервера
				} else {
					console.log('Ошибка' + this.status);
				}
			}
		}
	}
}());



// ===== show more =====

(function () {
	$('[data-btn-more]').each(function () {
		var parent = $(this).parent();

		$(this).on('click', function () {
			parent.find('p:hidden').slice(0, 1).slideDown(500);
			if (parent.find('p:hidden').length == 0) {
				$(this).text('Конец').addClass('hidden');
			}
		});
	});
}());



// ===== show stock__btn-more =====

(function () {
	var parent = $('.stock__slider');

	$('.stock__btn-more').on('click', function () {
		parent.find('div:hidden').slice(0, 1).slideDown(500);
		if (parent.find('div:hidden').length == 0) {
			$(this).text('Конец').addClass('hidden');
		}
	});
}());



// ===== spoiler =====

(function () {
	var $btn = $('[data-spoiler] [data-spoiler-btn]');
	$btn.filter('.active').next().slideDown(0);

	$btn.click(function () {
		$btn.not($(this)).removeClass('active')
		$btn.next().not($(this).next()).slideUp(500);
		$(this).toggleClass('active').next().slideToggle(500);
	});
}());



// ===== focus rating =====

(function () {
	var box = document.querySelector('.rating__group');
	if (box) {
		var input = box.querySelectorAll('input');

		for (var i = 0; i < input.length; i++) {

			input[i].addEventListener('focus', function () {
				if (this.classList.contains('focus')) {
					box.classList.add('focus');
				}
			});

			input[i].addEventListener('blur', function () {
				box.classList.remove('focus');
			});
		}
	}
}());



// ===== reviews__btn =====

(function () {
	var elem = document.querySelector('.reviews__btn-modal');
	if (elem) {
		elem.addEventListener('click', function () {
			document.querySelector('.modal').style.display = 'block';
		});
	}
}());


(function () {
	$('.reviews__btn-md').click(function () {
		$(this).toggleClass('hidden');
		$('.reviews__form-wrap').slideToggle(500);
	});

	$('.btn-cancel').click(function () {
		$('.reviews__btn-md').removeClass('hidden');
		$('.reviews__form-wrap').slideUp(500);
	});
}());



// ===== adaptiv form-shop =====

(function () {
	var itemsMove = document.querySelectorAll('[data-move]');

	if (itemsMove) {

		var mql = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');

		mql.addListener(move);
		// mql.addEventListener('change', move);

		move(mql);

		function move(mql) {

			for (let i = 0; i < itemsMove.length; i++) {
				var itemMove = itemsMove[i];
				var itemNamber = itemMove.getAttribute('data-move');
				var startMove = document.querySelector('[data-start="' + itemNamber + '"]');
				var whereMove = document.querySelector('[data-where="' + itemNamber + '"]');

				if (mql.matches) {
					whereMove.appendChild(itemMove);
				} else {
					startMove.appendChild(itemMove);
				}
			}
		}
	}
}());



// ===== tabs-spoiler cabinet =====

(function () {

	function togglePanel() {
		var $id = $(this).attr('data-tabs-btn');

		var $index = $(this).closest('[data-tabs]')
			.find('[data-tabs-btn="' + $id + '"]')
			.removeClass('active').index(this);

		$(this)
			.addClass('active')
			.closest('[data-tabs]')
			.find('[data-tabs-panel="' + $id + '"]')
			.slideUp(500)
			// .removeClass('active')
			.eq($index)
			// .addClass('active');
			.slideDown(500);
	}


	function closePanel() {
		var $id = $(this).attr('data-tabs-btn');

		$(this)
			.removeClass('active')
			.closest('[data-tabs]')
			.find('[data-tabs-panel="' + $id + '"]')
			.slideUp(500);
		// .removeClass('active');
	}


	$('[data-tabs-btn]').on('click', function () {

		var $type = $(this).closest('[data-tabs]').attr('data-tabs');

		if ($type == 'toggle') {

			if ($(this).hasClass('active')) {
				closePanel.call($(this));
			}
			else {
				togglePanel.call($(this));
			}
		}
		else {
			if (!$(this).hasClass('active')) {
				togglePanel.call($(this));
			}
		}
	});
}());



// ===== time cabinet =====

(function () {
	var check = document.querySelectorAll('.check');

	if (check) {
		for (var i = 0; i < check.length; i++) {
			toggleInput.call(check[i]);
			check[i].addEventListener('click', toggleInput);
		}
	}


	function toggleInput() {
		if (!this.querySelector('.check__input:checked')) {
			this.nextElementSibling.style.display = 'none';
		} else {
			this.nextElementSibling.style.display = 'flex';
		}
	}


	initBtnDel();

	function initBtnDel() {
		var btnDel = document.querySelectorAll('.btn-del');
		if (btnDel) {

			for (var i = 0; i < btnDel.length; i++) {
				btnDel[i].addEventListener('click', function () {
					var delElem = this.parentElement;
					var delElemParent = delElem.parentElement;
					delElemParent.removeChild(delElem);

					var child = delElemParent.children;
					if (child.length > 2) {
						delElemParent.lastElementChild.previousElementSibling.insertAdjacentHTML('beforeEnd', '<button class="btn btn-del icon-close" type="button"></button>');
						initBtnDel();

					}
				});
			}
		}
	}


	var btnAdd = document.querySelectorAll('.btn-add');
	if (btnAdd) {
		for (var i = 0; i < btnAdd.length; i++) {

			btnAdd[i].addEventListener('click', function () {
				var parent = this.parentElement;
				var btnDel = parent.querySelector('.btn-del');
				if (btnDel) {
					btnDel.parentElement.removeChild(btnDel);
				}

				var elemClone = parent.children[0].cloneNode(true);
				this.insertAdjacentElement('beforeBegin', elemClone);
				elemClone.insertAdjacentHTML('beforeEnd', '<button class="btn btn-del icon-close" type="button"></button>');
				initBtnDel();
			});
		}
	}
}());



// ===== adaptiv cabinet =====

(function () {
	var itemsMove = document.querySelectorAll('[data-move]');

	if (itemsMove) {

		var mql = window.matchMedia('(max-width: 1199px)');

		mql.addListener(move);
		// mql.addEventListener('change', move);

		move(mql);

		function move(mql) {

			for (let i = 0; i < itemsMove.length; i++) {
				var itemMove = itemsMove[i];
				var itemNamber = itemMove.getAttribute('data-move');
				var startMove = document.querySelector('[data-start="' + itemNamber + '"]');
				var whereMove = document.querySelector('[data-where="' + itemNamber + '"]');

				if (mql.matches) {
					whereMove.appendChild(itemMove);
				} else {
					startMove.appendChild(itemMove);
				}
			}
		}
	}
}());
