/* Template: Evolo - StartUp HTML Landing Page Template
   Author: Inovatik
   Created: June 2019
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });
    

    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
    
    
    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });

    /* Condo Request Form */
    $("#condoRequestForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            rcondoformError();
            rcondosubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            rcondosubmitForm();
        }
    });

    function rcondosubmitForm() {
        // initiate variables with form content
		var name = $("#rcondoname").val();
		var email = $("#rcondoemail").val();
		var phone = $("#rcondophone").val();
    var address = $("#rcondoaddress").val();

        $.ajax({
            type: "POST",
            url: "https://theowong.herokuapp.com/condo",
            data: {name: name, email: email, phone: phone, address: address},
            success: function(response) {
                if (response.success == "success") {
                    rcondoformSuccess();
                } else {
                    rcondoformError();
                    rcondosubmitMSG(false, 'There was something wrong with the appointment request, please try again later.');
                }
            }
        });
	}

    function rcondoformSuccess() {
        $("#condoRequestForm")[0].reset();
        rcondosubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function rcondoformError() {
        $("#condoRequestForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function rcondosubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#rcondomsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

        /* house Request Form */
        $("#houseRequestForm").validator().on("submit", function(event) {
          if (event.isDefaultPrevented()) {
                // handle the invalid form...
                rhouseformError();
                rhousesubmitMSG(false, "Please fill all fields!");
            } else {
                // everything looks good!
                event.preventDefault();
                rhousesubmitForm();
            }
        });
    
        function rhousesubmitForm() {
            // initiate variables with form content
        var name = $("#rhousename").val();
        var email = $("#rhouseemail").val();
        var phone = $("#rhousephone").val();
        var address = $("#rhouseaddress").val();
    
            $.ajax({
                type: "POST",
                url: "https://theowong.herokuapp.com/house",
                data: {name: name, email: email, phone: phone, address: address},
                success: function(response) {
                    if (response.success == "success") {
                        rhouseformSuccess();
                    } else {
                        rhouseformError();
                        rhousesubmitMSG(false, 'There was something wrong with the appointment request, please try again later.');
                    }
                }
            });
      }
    
        function rhouseformSuccess() {
            $("#houseRequestForm")[0].reset();
            rhousesubmitMSG(true, "Request Submitted!");
            $("input").removeClass('notEmpty'); // resets the field label after submission
        }
    
        function rhouseformError() {
            $("#houseRequestForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).removeClass();
            });
      }
    
        function rhousesubmitMSG(valid, msg) {
            if (valid) {
                var msgClasses = "h3 text-center tada animated";
            } else {
                var msgClasses = "h3 text-center";
            }
            $("#rhousemsgSubmit").removeClass().addClass(msgClasses).text(msg);
        }

    /* Request Form */
    $("#requestForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            rformError();
            rsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            rsubmitForm();
        }
    });

    function rsubmitForm() {
        // initiate variables with form content
		var name = $("#rname").val();
		var email = $("#remail").val();
		var phone = $("#rphone").val();
    var address = $("#raddress").val();
    var unit = $("#runit").val();
    var unitsize = $("#runitsize").val();
    var additionalincome = $("#radditionalincome").val();
    var expense = $("#rexpense").val();

        $.ajax({
            type: "POST",
            url: "https://theowong.herokuapp.com/multi",
            data: {
              name: name,
              email: email,
              phone: phone,
              address: address,
              unit: unit,
              unitsize: unitsize,
              additionalincome: additionalincome,
              expense: expense,
            },
            success: function(response) {
                if (response.success == "success") {
                    rformSuccess();
                } else {
                    rformError();
                    rsubmitMSG(false, 'There was something wrong with the appointment request, please try again later.');
                }
            }
        });
	}

    function rformSuccess() {
        $("#requestForm")[0].reset();
        rsubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function rformError() {
        $("#requestForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function rsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#rmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    

    /* Contact Form */
    $("#contactForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            cformError();
            csubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            csubmitForm();
        }
    });

    function csubmitForm() {
        // initiate variables with form content
		var name = $("#cname").val();
		var email = $("#cemail").val();
        var message = $("#cmessage").val();
        $.ajax({
            type: "POST",
            url: "https://theowong.herokuapp.com/mail",
            data: {name: name, email: email, message: message},
            success: function(response) {
                if (response.success == "success") {
                    cformSuccess();
                } else {
                    cformError();
                    csubmitMSG(false, 'The was an error submitting this message, please try again later.');
                }
            }
        });
	}

    function cformSuccess() {
        $("#contactForm")[0].reset();
        csubmitMSG(true, "Message Submitted!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
        $("textarea").removeClass('notEmpty'); // resets the field label after submission
    }

    function cformError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function csubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);