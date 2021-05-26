

objectFitImages();


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






// ======== вариант с google infowindow  ======== 

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


	// ======== some google Marker + InfoWindow ========

	var infoMessages = ["one", "two", "three"];

	// for (var i = 0; i < somePos.length; i++) {
	// 	var markers = new google.maps.Marker({
	// 		position: somePos[i],
	// 		map: map,
	// 		icon: "img/pin1.svg",
	// 	});
	// 	addInfoWindow(markers, infoMessages[i]);
	// }

	// function addInfoWindow(marker, textMessage) {
	// 	var infowindow = new google.maps.InfoWindow({
	// 		content: textMessage,
	// 	});

	// 	// infowindow.open(map, marker);
	// 	marker.addListener("click", function () {
	// 		infowindow.open(map, marker);
	// 	});
	// }



	// ========= some cuctom HTMLMarker + InfoWindow =========

	// constructor HTMLMarker

	function HTMLMarker(pos) {
		this.pos = pos;
	}

	HTMLMarker.prototype = new google.maps.OverlayView();

	HTMLMarker.prototype.onRemove = function () {
		if (this.div && this.div.parentNode && this.div.parentNode.removeChild)
			this.div.parentNode.removeChild(this.div);
	}

	HTMLMarker.prototype.getDraggable = function () {};
	HTMLMarker.prototype.getPosition = function () {
		return this.pos
	};

	var number = 1;
	HTMLMarker.prototype.onAdd = function () {
		this.div = document.createElement('DIV');
		this.div.className = "htmlMarker";
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
		this.div.style.left = position.x - 17 + 'px';
		this.div.style.top = position.y - 40 + 'px';
	}
	// end constructor 


	for (var i = 0; i < somePos.length; i++) {
		var htmlMarker = new HTMLMarker(somePos[i]);
		htmlMarker.setMap(map);

		addInfoWindow(htmlMarker, infoMessages[i]);
	}

	function addInfoWindow(marker, textMessage) {
		var infowindow = new google.maps.InfoWindow({
			content: textMessage,
			pixelOffset: new google.maps.Size(0, -40)
		});

		// infowindow.open(map, marker);
		marker.addListener("click", function (evt) {
			infowindow.open(map, marker);
			// infowindow.setContent('htmlMarker click@' + evt.latLng.toUrlValue(3));
		});
	}



	// ======== one Marker ========

	var mainMarker = new google.maps.Marker({
		position: minePos,
		map: map,
		// title: "Текст всплывающей подсказки", 
		icon: "img/mainMarker.svg",
		// animation: google.maps.Animation.DROP 
	});


	// ======== one InfoWindow ========

	var popupContent = '<div class="map_info"><span>Наш офис</span>' +
		'<div> Элек,<br> офис. 43</div></div>';

	var infowindow = new google.maps.InfoWindow({
		content: popupContent
	});

	// infowindow.open(map, mainMarker);

	mainMarker.addListener('click', function () {
		infowindow.open(map, mainMarker);
	});




}
google.maps.event.addDomListener(window, "load", initMap);




// ===== slider =====

var mySwiper = new Swiper('.__swiper', {
	// spaceBetween: 20,
	loop: true,
	autoHeight: true,
	grabCursor: true,
	// effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	navigation: {
		nextEl: '.__btn-next',
		prevEl: '.__btn-prev',
	},
	pagination: {
		el: '.__swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		768: {
			// pagination: ' ',
		}
	}
});



// ===== slick =====

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



// ==== select gibrid-3 ====

(function () {
	var natives = document.querySelectorAll('[data-select]');

	if (natives) {

		for (var i = 0; i < natives.length; i++) {
			select(i);
		}

		function select(i) {

			var native = natives[i];
			var nativeClass = native.getAttribute('class');
			var parent = native.parentElement;
			var optionInvalid = native.querySelector('.invalid');

			var optionChecked = native.querySelector('option:checked');
			var optionCheckedText = optionChecked.textContent;
			var optionCheckedValue = optionChecked.value;
			var optionCheckedIndex;

			var optionsClass = [];

			createSelectCustom(native);

			function createSelectCustom(select) {
				var options = select.querySelectorAll('option');
				
				var selectedClass = optionChecked.getAttribute('class');
				var selectBtn;

				if (optionInvalid) {
					selectBtn = '<div class="' + nativeClass + '-custom__btn invalid">' + optionCheckedText + '</div>';
				} else {
					selectBtn = '<div class="' + nativeClass + '-custom__btn ' + selectedClass + '">' + optionCheckedText + '</div>';
				}

				parent.insertAdjacentHTML('beforeend',
					'<div class="' + nativeClass + '-custom" aria-hidden="true">' +
					selectBtn +
					'<div class="' + nativeClass + '-custom__options">' + createCustomOptions(options) + '</div>' +
					'</div></div>');

					
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
							customOptions = customOptions + '<div data-value="' + optionValue + '" class="' + nativeClass + '-custom__option ' + optionClass +  ' ">' + optionText + '</div>';
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
				selectCustomBtn.className = nativeClass + '-custom__btn ' + optionsClass[optionIndex];
				optionCheckedValue = value;
			}


			function watchClickOutside(e) {
				var didClickedOutside = !selectCustom.contains(event.target);
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
