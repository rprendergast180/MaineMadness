(function() {
  $(document).ready(function() {

    var faqs;

    // $.getJSON("/data/faq.json", function(res) {
    //   faqs = res;
    //   var faq_container = $("<div class='faq-container-div'></div>");
    //   for (var i = 0; i < faqs.length; i++) {
    //     var container = $("<div class='faq-container' data-aos='fade-up'></div>");
    //     var question = $("<h2></h2>").text(faqs[i].Q);
    //     var answer = $("<p></p>").text(faqs[i].A);
    //     container.append(question,answer);
    //     faq_container.append(container);
    //   }
    //   $("#faq").append(faq_container);
    // });

    AOS.init({
      duration: 1000
    });

    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (callback) {
                  callback();
                }
            });
            return this;
        }
    });

    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 2000);
            return false;
          }
        }
      });
    });

    $("#email-subscribe").submit(function(e) {
      e.preventDefault();
      $.post("/backendServices/subscribeToEmailList", {email: $("#email-subscribe input").val()})
        .then(function(data) {
          console.log(data);
          if (data) {
            swal("Success!", "Thanks for signing up.", "success");
          } else {
            swal("Whoops!", "Looks like our servers aren't doing so hot. Please try again later.", "error");
          }
        });
      return false;
    });

    $(document).on('click', '.faq-container h2', function() {
      $(this).parent().find("p").slideToggle();
    });

    var hideModal = function() {
      if ($(".modal-box").hasClass("fadeInUpBig")) $(".modal-box").removeClass("fadeInUpBig").addClass("fadeOutDownBig");
      $("div.overlay").removeClass("show");
      $("body").removeClass("noscroll");
    }

    $("#contactForm").submit(function(e) {
      e.preventDefault();
      var formData = {
        fname: $("#contact_fname").val(),
        lname: $("#contact_lname").val(),
        email: $("#contact_email").val(),
        message: $("#contact_message").val()
      }
      $.post("/backendServices/sendMessage", formData)
        .then(function(data) {
          console.log(data);
          if (data.success) {
            swal("Sweet!", "Thanks for reaching out. Our team will be in touch shortly!", "success");
            hideModal();
          } else if (data.err){
            swal("Whoops!", data.err, "error");
          } else {
            swal("Whoops!", "Looks like our servers aren't doing so hot. Please try again later.", "error");
          }
        });
    });

    $("#application-form").submit(function(e) {
      e.preventDefault();
      var formData = {
        student_fname: $("#student_fname").val(),
        student_lname: $("#student_lname").val(),
        student_email: $("#student_email").val(),
      };
      // if $("#student_email").val().substr(id.length - 9) != "@s207.org"{
      //   swal("Error!", "Please use your @s207.org email!");
      // }
      // else{
        $.post("/backendServices/register", formData)
          .then(function(data) {
            console.log(data);
            if (data.success) {
              swal("Success!", "Thanks for signing up! Please log in with the email you used.", "success");
              hideModal();
            } else if (data.err){
              swal("Whoops!", data.err, "error");
              hideModal();
            } else {
              swal("Whoops!", "Please use your school email address to sign up. If you did and are still receiving this error, email rprendergast180@s207.org", "error");
              hideModal();
            }
          });
      // }
    });

    $("#contact-us-btn").click(function() {
      $(".modal-box").removeClass("fadeOutDownBig").addClass("fadeInUpBig show");
      $("div.overlay").addClass("show");
      $("body").addClass("noscroll");
    });

    $("div.overlay").click(function() {
      hideModal();
    });

    $("#menuToggle").click(function() {
      $(".hamburger-menu").toggleClass("active");
      $(this).toggleClass("active");
    });

    $(".banner").click(function() {

    });

    $("#recap-2017").click(function() {
      $(".overlay").addClass("show");
      $(".video-modal").addClass("show animated");
      $(".video-modal").animateCss("zoomIn")
      $("body").addClass("noscroll");
    });

    $(".overlay").click(function() {
      $(".overlay").removeClass("show");
      $(".video-modal").removeClass("zoomIn");
      $(".video-modal").animateCss("zoomOut", function() {$(".video-modal").removeClass("show");});
      $("body").removeClass("noscroll");
    });


  });
}());
