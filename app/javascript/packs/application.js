require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

require('jquery')
require('../global_assets/js/main/bootstrap.bundle.min')
require('../global_assets/js/plugins/loaders/blockui.min')

require('../global_assets/js/plugins/forms/styling/uniform.min')
require('../global_assets/js/plugins/forms/styling/switch.min')
var moment = require('moment');

require('../global_assets/js/plugins/extensions/jquery_ui/interactions.min')
require('../global_assets/js/plugins/forms/selects/select2.min')

require('datatables.net-bs4')
require('datatables.net-bs4/css/dataTables.bootstrap4.min.css')
require('../global_assets/js/plugins/pickers/daterangepicker')
require('../global_assets/js/plugins/uploaders/fileinput/fileinput.min')
require('./sortimentos')
require("chartkick")
require("chart.js")
import toastr from 'toastr'
window.toastr = toastr

import "../stylesheets/application"

document.addEventListener("turbolinks:load", () => {
	moment().format();
	$('[data-toggle="tooltip"]').tooltip()
	$('[data-toggle="popover"]').popover()
	$('.select2').select2();
	$('.data-table').DataTable({
		dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
		pageLength: 10,
		autoWidth: false,
		columnDefs: [{ 
				orderable: false,
				width: 100,
		}],
		language: {
			search: '<span>Filtrar:</span> _INPUT_',
			searchPlaceholder: 'Tipo de filtro',
			lengthMenu: '<span>Mostra:</span> _MENU_',
			paginate: { 'first': 'First', 'last': 'Last', 'next': $('html').attr('dir') == 'rtl' ? '&larr;' : '&rarr;', 'previous': $('html').attr('dir') == 'rtl' ? '&rarr;' : '&larr;' }
	}
	});
	$('.daterange').daterangepicker({
		singleDatePicker: true,
		"locale": {
			"format": "DD/MM/YYYY",
			"separator": " - ",
			"applyLabel": "Aplicar",
			"cancelLabel": "Cancelar",
			"daysOfWeek": [
				"Dom",
				"Seg",
				"Ter",
				"Qua",
				"Qui",
				"Sex",
				"Sab"
			],
			"monthNames": [
				"Janeiro",
				"Fevereiro",
				"Março",
				"Abril",
				"Maio",
				"Junho",
				"Julho",
				"Agosto",
				"Setembro",
				"Outubro",
				"Novembro",
				"Dezembro"
			],
			"firstDay": 1
		}
	});

	

	$('.file-input').fileinput({
		initialCaption: "Nenhum arquivo selecionado...",
		'showUpload': false,
		showPreview: false,
	});

	$('.select-multiple-drag').select2({
		containerCssClass: 'sortable-target'
	});

	$('.sortable-target .select2-selection__rendered').sortable({
		containment: '.sortable-target',
		items: '.select2-selection__choice:not(.select2-search--inline)'
	})



})

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

var App = function () {

	// Disable all transitions
	var _transitionsDisabled = function () {
		$('body').addClass('no-transitions');
	};

	// Enable all transitions
	var _transitionsEnabled = function () {
		$('body').removeClass('no-transitions');
	};

	// Resize main sidebar
	var _sidebarMainResize = function () {


    var revertBottomMenus = function () {
			$('.sidebar-main').find('.nav-sidebar').children('.nav-item-submenu').hover(function () {
				var totalHeight = 0,
					$this = $(this),
					navSubmenuClass = 'nav-group-sub',
					navSubmenuReversedClass = 'nav-item-submenu-reversed';

				totalHeight += $this.find('.' + navSubmenuClass).filter(':visible').outerHeight();
				if ($this.children('.' + navSubmenuClass).length) {
					if (($this.children('.' + navSubmenuClass).offset().top + $this.find('.' + navSubmenuClass).filter(':visible').outerHeight()) > document.body.clientHeight) {
						$this.addClass(navSubmenuReversedClass)
					} else {
						$this.removeClass(navSubmenuReversedClass)
					}
				}
			});
		}

		// If sidebar is resized by default
		if ($('body').hasClass('sidebar-xs')) {
			revertBottomMenus();
		}

		// Toggle min sidebar class
		$('.sidebar-main-toggle').on('click', function (e) {
			e.preventDefault();

			$('body').toggleClass('sidebar-xs').removeClass('sidebar-mobile-main');
			revertBottomMenus();
		});
	};

	// Toggle main sidebar
	var _sidebarMainToggle = function () {
		$(document).on('click', '.sidebar-main-hide', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-main-hidden');
		});
	};

	// Toggle secondary sidebar
	var _sidebarSecondaryToggle = function () {
		$(document).on('click', '.sidebar-secondary-toggle', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-secondary-hidden');
		});
	};


	// Show right, resize main
	var _sidebarRightMainToggle = function () {
		$(document).on('click', '.sidebar-right-main-toggle', function (e) {
			e.preventDefault();

			// Right sidebar visibility
			$('body').toggleClass('sidebar-right-visible');

			// If visible
			if ($('body').hasClass('sidebar-right-visible')) {

				// Make main sidebar mini
				$('body').addClass('sidebar-xs');

				// Hide children lists if they are opened, since sliding animation adds inline CSS
				$('.sidebar-main .nav-sidebar').children('.nav-item').children('.nav-group-sub').css('display', '');
			} else {
				$('body').removeClass('sidebar-xs');
			}
		});
	};

	// Show right, hide main
	var _sidebarRightMainHide = function () {
		$(document).on('click', '.sidebar-right-main-hide', function (e) {
			e.preventDefault();

			// Opposite sidebar visibility
			$('body').toggleClass('sidebar-right-visible');

			// If visible
			if ($('body').hasClass('sidebar-right-visible')) {
				$('body').addClass('sidebar-main-hidden');
			} else {
				$('body').removeClass('sidebar-main-hidden');
			}
		});
	};

	// Toggle right sidebar
	var _sidebarRightToggle = function () {
		$(document).on('click', '.sidebar-right-toggle', function (e) {
			e.preventDefault();

			$('body').toggleClass('sidebar-right-visible');
		});
	};

	// Show right, hide secondary
	var _sidebarRightSecondaryToggle = function () {
		$(document).on('click', '.sidebar-right-secondary-toggle', function (e) {
			e.preventDefault();

			// Opposite sidebar visibility
			$('body').toggleClass('sidebar-right-visible');

			// If visible
			if ($('body').hasClass('sidebar-right-visible')) {
				$('body').addClass('sidebar-secondary-hidden');
			} else {
				$('body').removeClass('sidebar-secondary-hidden');
			}
		});
	};


	// Toggle content sidebar
	var _sidebarComponentToggle = function () {
		$(document).on('click', '.sidebar-component-toggle', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-component-hidden');
		});
	};


	//
	// On mobile
	//

	// Expand sidebar to full screen on mobile
	var _sidebarMobileFullscreen = function () {
		$('.sidebar-mobile-expand').on('click', function (e) {
			e.preventDefault();
			var $sidebar = $(this).parents('.sidebar'),
				sidebarFullscreenClass = 'sidebar-fullscreen'

			if (!$sidebar.hasClass(sidebarFullscreenClass)) {
				$sidebar.addClass(sidebarFullscreenClass);
			} else {
				$sidebar.removeClass(sidebarFullscreenClass);
			}
		});
	};

	// Toggle main sidebar on mobile
	var _sidebarMobileMainToggle = function () {
		$('.sidebar-mobile-main-toggle').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-right');

			if ($('.sidebar-main').hasClass('sidebar-fullscreen')) {
				$('.sidebar-main').removeClass('sidebar-fullscreen');
			}
		});
	};

	// Toggle secondary sidebar on mobile
	var _sidebarMobileSecondaryToggle = function () {
		$('.sidebar-mobile-secondary-toggle').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-mobile-secondary').removeClass('sidebar-mobile-main sidebar-mobile-right');

			// Fullscreen mode
			if ($('.sidebar-secondary').hasClass('sidebar-fullscreen')) {
				$('.sidebar-secondary').removeClass('sidebar-fullscreen');
			}
		});
	};

	// Toggle right sidebar on mobile
	var _sidebarMobileRightToggle = function () {
		$('.sidebar-mobile-right-toggle').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-mobile-right').removeClass('sidebar-mobile-main sidebar-mobile-secondary');

			// Hide sidebar if in fullscreen mode on mobile
			if ($('.sidebar-right').hasClass('sidebar-fullscreen')) {
				$('.sidebar-right').removeClass('sidebar-fullscreen');
			}
		});
	};

	// Toggle component sidebar on mobile
	var _sidebarMobileComponentToggle = function () {
		$('.sidebar-mobile-component-toggle').on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('sidebar-mobile-component');
		});
	};


	// Navigations
	// -------------------------

	// Sidebar navigation
	var _navigationSidebar = function () {

		// Define default class names and options
		var navClass = 'nav-sidebar',
			navItemClass = 'nav-item',
			navItemOpenClass = 'nav-item-open',
			navLinkClass = 'nav-link',
			navSubmenuClass = 'nav-group-sub',
			navSlidingSpeed = 250;

		// Configure collapsible functionality
		$('.' + navClass).each(function () {
			$(this).find('.' + navItemClass).has('.' + navSubmenuClass).children('.' + navItemClass + ' > ' + '.' + navLinkClass).not('.disabled').on('click', function (e) {
				e.preventDefault();

				// Simplify stuff
				var $target = $(this),
					$navSidebarMini = $('.sidebar-xs').not('.sidebar-mobile-main').find('.sidebar-main .' + navClass).children('.' + navItemClass);

				// Collapsible
				if ($target.parent('.' + navItemClass).hasClass(navItemOpenClass)) {
					$target.parent('.' + navItemClass).not($navSidebarMini).removeClass(navItemOpenClass).children('.' + navSubmenuClass).slideUp(navSlidingSpeed);
				} else {
					$target.parent('.' + navItemClass).not($navSidebarMini).addClass(navItemOpenClass).children('.' + navSubmenuClass).slideDown(navSlidingSpeed);
				}

				// Accordion
				if ($target.parents('.' + navClass).data('nav-type') == 'accordion') {
					$target.parent('.' + navItemClass).not($navSidebarMini).siblings(':has(.' + navSubmenuClass + ')').removeClass(navItemOpenClass).children('.' + navSubmenuClass).slideUp(navSlidingSpeed);
				}
			});
		});

		// Disable click in disabled navigation items
		$(document).on('click', '.' + navClass + ' .disabled', function (e) {
			e.preventDefault();
		});

		// Scrollspy navigation
		$('.nav-scrollspy').find('.' + navItemClass).has('.' + navSubmenuClass).children('.' + navItemClass + ' > ' + '.' + navLinkClass).off('click');
	};

	// Navbar navigation
	var _navigationNavbar = function () {

		// Prevent dropdown from closing on click
		$(document).on('click', '.dropdown-content', function (e) {
			e.stopPropagation();
		});

		// Disabled links
		$('.navbar-nav .disabled a, .nav-item-levels .disabled').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});

		// Show tabs inside dropdowns
		$('.dropdown-content a[data-toggle="tab"]').on('click', function (e) {
			$(this).tab('show');
		});
	};


	// Components
	// -------------------------

	// Tooltip
	var _componentTooltip = function () {

		// Initialize
		$('[data-popup="tooltip"]').tooltip();

		// Demo tooltips, remove in production
		var demoTooltipSelector = '[data-popup="tooltip-demo"]';
		if ($(demoTooltipSelector).is(':visible')) {
			$(demoTooltipSelector).tooltip('show');
			setTimeout(function () {
				$(demoTooltipSelector).tooltip('hide');
			}, 2000);
		}
	};

	// Popover
	var _componentPopover = function () {
		$('[data-popup="popover"]').popover();
	};


	// Card actions
	// -------------------------

	// Reload card (uses BlockUI extension)
	var _cardActionReload = function () {
		$('.card [data-action=reload]:not(.disabled)').on('click', function (e) {
			e.preventDefault();
			var $target = $(this),
				block = $target.closest('.card');

			// Block card
			$(block).block({
				message: '<i class="icon-spinner2 spinner"></i>',
				overlayCSS: {
					backgroundColor: '#fff',
					opacity: 0.8,
					cursor: 'wait',
					'box-shadow': '0 0 0 1px #ddd'
				},
				css: {
					border: 0,
					padding: 0,
					backgroundColor: 'none'
				}
			});

			// For demo purposes
			window.setTimeout(function () {
				$(block).unblock();
			}, 2000);
		});
	};

	// Collapse card
	var _cardActionCollapse = function () {
		var $cardCollapsedClass = $('.card-collapsed');

		// Hide if collapsed by default
		$cardCollapsedClass.children('.card-header').nextAll().hide();

		// Rotate icon if collapsed by default
		$cardCollapsedClass.find('[data-action=collapse]').addClass('rotate-180');

		// Collapse on click
		$('.card [data-action=collapse]:not(.disabled)').on('click', function (e) {
			var $target = $(this),
				slidingSpeed = 150;

			e.preventDefault();
			$target.parents('.card').toggleClass('card-collapsed');
			$target.toggleClass('rotate-180');
			$target.closest('.card').children('.card-header').nextAll().slideToggle(slidingSpeed);
		});
	};

	// Remove card
	var _cardActionRemove = function () {
		$('.card [data-action=remove]').on('click', function (e) {
			e.preventDefault();
			var $target = $(this),
				slidingSpeed = 150;

			// If not disabled
			if (!$target.hasClass('disabled')) {
				$target.closest('.card').slideUp({
					duration: slidingSpeed,
					start: function () {
						$target.addClass('d-block');
					},
					complete: function () {
						$target.remove();
					}
				});
			}
		});
	};

	// Card fullscreen mode
	var _cardActionFullscreen = function () {
		$('.card [data-action=fullscreen]').on('click', function (e) {
			e.preventDefault();

			// Define vars
			var $target = $(this),
				cardFullscreen = $target.closest('.card'),
				overflowHiddenClass = 'overflow-hidden',
				collapsedClass = 'collapsed-in-fullscreen',
				fullscreenAttr = 'data-fullscreen';

			// Toggle classes on card
			cardFullscreen.toggleClass('fixed-top h-100 rounded-0');

			// Configure
			if (!cardFullscreen.hasClass('fixed-top')) {
				$target.removeAttr(fullscreenAttr);
				cardFullscreen.children('.' + collapsedClass).removeClass('show');
				$('body').removeClass(overflowHiddenClass);
				$target.siblings('[data-action=move], [data-action=remove], [data-action=collapse]').removeClass('d-none');
			} else {
				$target.attr(fullscreenAttr, 'active');
				cardFullscreen.removeAttr('style').children('.collapse:not(.show)').addClass('show ' + collapsedClass);
				$('body').addClass(overflowHiddenClass);
				$target.siblings('[data-action=move], [data-action=remove], [data-action=collapse]').addClass('d-none');
			}
		});
	};


	// Misc
	// -------------------------

	// Dropdown submenus. Trigger on click
	var _dropdownSubmenu = function () {

		// All parent levels require .dropdown-toggle class
		$('.dropdown-menu').find('.dropdown-submenu').not('.disabled').find('.dropdown-toggle').on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();

			// Remove "show" class in all siblings
			$(this).parent().siblings().removeClass('show').find('.show').removeClass('show');

			// Toggle submenu
			$(this).parent().toggleClass('show').children('.dropdown-menu').toggleClass('show');

			// Hide all levels when parent dropdown is closed
			$(this).parents('.show').on('hidden.bs.dropdown', function (e) {
				$('.dropdown-submenu .show, .dropdown-submenu.show').removeClass('show');
			});
		});
	};

	// Header elements toggler
	var _headerElements = function () {

		// Toggle visible state of header elements
		$('.header-elements-toggle').on('click', function (e) {
			e.preventDefault();
			$(this).parents('[class*=header-elements-]').find('.header-elements').toggleClass('d-none');
		});

		// Toggle visible state of footer elements
		$('.footer-elements-toggle').on('click', function (e) {
			e.preventDefault();
			$(this).parents('.card-footer').find('.footer-elements').toggleClass('d-none');
		});
	};


	//
	// Return objects assigned to module
	//

	return {

		// Disable transitions before page is fully loaded
		initBeforeLoad: function () {
			_transitionsDisabled();
		},

		// Enable transitions when page is fully loaded
		initAfterLoad: function () {
			_transitionsEnabled();
		},

		// Initialize all sidebars
		initSidebars: function () {

			// On desktop
			_sidebarMainResize();
			_sidebarMainToggle();
			_sidebarSecondaryToggle();
			_sidebarRightMainToggle();
			_sidebarRightMainHide();
			_sidebarRightToggle();
			_sidebarRightSecondaryToggle();
			_sidebarComponentToggle();

			// On mobile
			_sidebarMobileFullscreen();
			_sidebarMobileMainToggle();
			_sidebarMobileSecondaryToggle();
			_sidebarMobileRightToggle();
			_sidebarMobileComponentToggle();
		},

		// Initialize all navigations
		initNavigations: function () {
			_navigationSidebar();
			_navigationNavbar();
		},

		// Initialize all components
		initComponents: function () {
			_componentTooltip();
			_componentPopover();
		},

		// Initialize all card actions
		initCardActions: function () {
			_cardActionReload();
			_cardActionCollapse();
			_cardActionRemove();
			_cardActionFullscreen();
		},

		// Dropdown submenu
		initDropdownSubmenu: function () {
			_dropdownSubmenu();
		},

		initHeaderElementsToggle: function () {
			_headerElements();
		},

		// Initialize core
		initCore: function () {
			App.initSidebars();
			App.initNavigations();
			App.initComponents();
			App.initCardActions();
			App.initDropdownSubmenu();
			App.initHeaderElementsToggle();
		}
	}
}();


// Initialize module
// ------------------------------

// When content is loaded
document.addEventListener('DOMContentLoaded', function () {
	App.initBeforeLoad();
	App.initCore();
});

// When page is fully loaded
window.addEventListener('load', function () {
	App.initAfterLoad();
});



/* ------------------------------------------------------------------------------
 *
 *  # Tooltips and popovers
 *
 *  Demo JS code for components_popups.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

var Popups = function () {


	//
	// Setup module components
	//

	// Custom tooltip color
	var _componentTooltipCustomColor = function () {
		$('[data-popup=tooltip-custom]').tooltip({
			template: '<div class="tooltip"><div class="arrow border-teal"></div><div class="tooltip-inner bg-teal"></div></div>'
		});
	};

	// Tooltip events
	var _componentTooltipEvents = function () {

		// onShow event
		$('#tooltip-show').tooltip({
			title: 'I am a tooltip',
			trigger: 'click'
		}).on('show.bs.tooltip', function () {
			alert('Show event fired.');
		});

		// onShown event
		$('#tooltip-shown').tooltip({
			title: 'I am a tooltip',
			trigger: 'click'
		}).on('shown.bs.tooltip', function () {
			alert('Shown event fired.');
		});

		// onHide event
		$('#tooltip-hide').tooltip({
			title: 'I am a tooltip',
			trigger: 'click'
		}).on('hide.bs.tooltip', function () {
			alert('Hide event fired.');
		});

		// onHidden event
		$('#tooltip-hidden').tooltip({
			title: 'I am a tooltip',
			trigger: 'click'
		}).on('hidden.bs.tooltip', function () {
			alert('Hidden event fired.');
		});
	};

	// Tooltip methods
	var _componentTooltipMethods = function () {

		// Show method
		$('#show-tooltip-method').on('click', function () {
			$('#show-tooltip-method-target').tooltip('show');
		});

		// Hide method
		$('#hide-tooltip-method-target').on('mouseenter', function () {
			$(this).tooltip('show')
		});
		$('#hide-tooltip-method').on('click', function () {
			$('#hide-tooltip-method-target').tooltip('hide');
		});

		// Toggle method
		$('#toggle-tooltip-method').on('click', function () {
			$('#toggle-tooltip-method-target').tooltip('toggle');
		})

		// Dispose method
		$('#dispose-tooltip-method').on('click', function () {
			$('#dispose-tooltip-method-target').tooltip('dispose');
		});

		// Toggle enable method
		$('#toggle-enabled-tooltip-method').on('click', function () {
			$('#toggle-enabled-tooltip-method-target').tooltip('toggleEnabled');
		});
	};


	// Custom popover color
	var _componentPopoverCustomHeaderColor = function () {
		$('[data-popup=popover-custom]').popover({
			template: '<div class="popover border-teal"><div class="arrow"></div><h3 class="popover-header bg-teal"></h3><div class="popover-body"></div></div>'
		});
	};

	// Custom popover background color
	var _componentPopoverCustomBackgroundColor = function () {
		$('[data-popup=popover-solid]').popover({
			template: '<div class="popover bg-primary border-primary"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body text-white"></div></div>'
		});
	};

	// Popover events
	var _componentPopoverEvents = function () {

		// onShow event
		$('#popover-show').popover({
			title: 'Popover title',
			content: 'And here\'s some amazing content. It\'s very engaging. Right?',
			trigger: 'click'
		}).on('show.bs.popover', function () {
			alert('Show event fired.');
		});

		// onShown event
		$('#popover-shown').popover({
			title: 'Popover title',
			content: 'And here\'s some amazing content. It\'s very engaging. Right?',
			trigger: 'click'
		}).on('shown.bs.popover', function () {
			alert('Shown event fired.');
		});

		// onHide event
		$('#popover-hide').popover({
			title: 'Popover title',
			content: 'And here\'s some amazing content. It\'s very engaging. Right?',
			placement: 'top',
			trigger: 'click'
		}).on('hide.bs.popover', function () {
			alert('Hide event fired.');
		});

		// onHidden event
		$('#popover-hidden').popover({
			title: 'Popover title',
			content: 'And here\'s some amazing content. It\'s very engaging. Right?',
			trigger: 'click'
		}).on('hidden.bs.popover', function () {
			alert('Hidden event fired.');
		});
	};

	// Popover methods
	var _componentPopoverMethods = function () {

		// Show method
		$('#show-popover-method').on('click', function () {
			$('#show-popover-method-target').popover('show');
		})

		// Hide method
		$('#hide-popover-method-target').on('mouseenter', function () {
			$(this).popover('show')
		});
		$('#hide-popover-method').on('click', function () {
			$('#hide-popover-method-target').popover('hide');
		});

		// Toggle method
		$('#toggle-popover-method').on('click', function () {
			$('#toggle-popover-method-target').popover('toggle');
		})

		// Dispose method
		$('#dispose-popover-method').on('click', function () {
			$('#dispose-popover-method-target').popover('dispose');
		});

		// Toggle enable method
		$('#toggle-enabled-popover-method').on('click', function () {
			$('#toggle-enabled-popover-method-target').popover('toggleEnabled');
		});
	};


	//
	// Return objects assigned to module
	//

	return {
		init: function () {
			_componentTooltipCustomColor();
			_componentTooltipEvents();
			_componentTooltipMethods();
			_componentPopoverCustomHeaderColor();
			_componentPopoverCustomBackgroundColor();
			_componentPopoverEvents();
			_componentPopoverMethods();
		}
	}
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function () {
	Popups.init();
});

var InputsCheckboxesRadios = function () {


	//
	// Setup components
	//

	// Uniform
	var _componentUniform = function () {
		if (!$().uniform) {
			console.warn('Warning - uniform.min.js is not loaded.');
			return;
		}

		// Default initialization
		$('.form-check-input-styled').uniform();


		//
		// Contextual colors
		//

		// Primary
		$('.form-check-input-styled-primary').uniform({
			wrapperClass: 'border-primary-600 text-primary-800'
		});

		// Danger
		$('.form-check-input-styled-danger').uniform({
			wrapperClass: 'border-danger-600 text-danger-800'
		});

		// Success
		$('.form-check-input-styled-success').uniform({
			wrapperClass: 'border-success-600 text-success-800'
		});

		// Warning
		$('.form-check-input-styled-warning').uniform({
			wrapperClass: 'border-warning-600 text-warning-800'
		});

		// Info
		$('.form-check-input-styled-info').uniform({
			wrapperClass: 'border-info-600 text-info-800'
		});

		// Custom color
		$('.form-check-input-styled-custom').uniform({
			wrapperClass: 'border-indigo-600 text-indigo-800'
		});
	};

	// Bootstrap switch
	var _componentBootstrapSwitch = function () {
		if (!$().bootstrapSwitch) {
			console.warn('Warning - switch.min.js is not loaded.');
			return;
		}

		// Initialize
		$('.form-check-input-switch').bootstrapSwitch();
	};


	//
	// Return objects assigned to module
	//

	return {
		initComponents: function () {
			_componentUniform();
			_componentBootstrapSwitch();
		}
	}
}();


// Initialize module
// ------------------------------

document.addEventListener('DOMContentLoaded', function () {
	InputsCheckboxesRadios.initComponents();
});

