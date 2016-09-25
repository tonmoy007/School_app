$(document).ready(function(){
	$('#nav-icon').click(function(){
		$(this).toggleClass('open');
		$('#showme').toggleClass('showme');
	});

	// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '#navbar'
})

// Closes the Responsive Menu on Menu Item Click
$('#showme > nav > ul > li.menu__item > a').click(function() {
    $('#nav-icon').click();
});

     
});
(function() {
			[].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
				var menuItems = menu.querySelectorAll('.menu__link'),
					setCurrent = function(ev) {
						ev.preventDefault();

						var item = ev.target.parentNode; // li

						// return if already current
						if (classie.has(item, 'menu__item--current')) {
							return false;
						}
						// remove current
						classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
						// set current
						classie.add(item, 'menu__item--current');
					};

				[].slice.call(menuItems).forEach(function(el) {
					el.addEventListener('click', setCurrent);
				});
			});

			
		})(window);