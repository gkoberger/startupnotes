$(window).load(function() {
  $('body').removeClass('unloaded');
});

function createMobile() {
  var $ms = $('.mobile-show');
  $('.person').each(function() {
    var $this = $(this);
    var name = $this.attr('class').replace(/person /, '');

    var $a = $('<a>', {
      'href': '#', 
      'class': 'mini-person ' + name});

    $a.click(function(e) {
      e.preventDefault();
      if($(this).hasClass('done')) return;

      $('.page-' + name).each(function() {
        var img = $(this).css('background-image').match(/http(.*)\.png/)[0];
        console.log(img);
        $a.after($('<img>', {src: img}));
      });
      $(this).addClass('done');
    });

    $a.append($(this).find('.person-info'));
    $a.append($('<span>'));
    $ms.append($a);
  });
}

$(function() {
  $('body').toggleClass('mobile', categorizr.isMobile);
  if(categorizr.isMobile) {
    createMobile();
    return;
  }

  $(window).resize(function() {
    $('#content').height($(window).height());
  }).trigger('resize');

  var $b = $('body');
  $('.moleskine').mousedown(function() {
    $b.addClass('mousedown');
  }).mouseup(function() {
    $b.removeClass('mousedown');
  });

	var $m = $("#moleskine");

  function turned(dont_open) {
    var page = $m.turn('page');
    $('.arrow-left').toggleClass('show', page > 1);
    $('.arrow-right').toggleClass('show', page < $m.turn('pages'));

    if(!dont_open) {
      $('.info, .share').addClass('open');
    }
  };

  $m.turn({
		width: 700,
		height: 485,

		elevation: 50,
		gradients: true,
		duration: 1000,

    when: {
      first: function() {
        console.log('hell nah');
        $('.info').removeClass('open');
      },
      last: function() {
        $('.share').removeClass('open');
      },
      end: function() {
        var book = $(this);
        if(book.turn('page') <= 1) {
          $('.info').removeClass('open');
        }

        if(book.turn('page') >= book.turn('pages')) {
          $('.share').removeClass('open');
        }
      },
      start: function() { turned() },
      turned: function() { turned(true) },
      turning: function(e, page, view) {
        var book = $(this),
        currentPage = book.turn('page'),
        pages = book.turn('pages');

        if (currentPage>3 && currentPage<pages-3) {

          if (page==1) {
            book.turn('page', 2).turn('stop').turn('page', page);
            e.preventDefault();
            return;
          } else if (page==pages) {
            book.turn('page', pages-1).turn('stop').turn('page', page);
            e.preventDefault();
            return;
          }
        } else if (page>3 && page<pages-3) {
          if (currentPage==1) {
            book.turn('page', 2).turn('stop').turn('page', page);
            e.preventDefault();
            return;
          } else if (currentPage==pages) {
            book.turn('page', pages-1).turn('stop').turn('page', page);
            e.preventDefault();
            return;
          }
        }


        // Find the highest page that's <= page+1
        
        var $p;
        var page_rounded = (Math.floor(page / 2) * 2) + 1; // Get the right page
        if(page_rounded < book.turn('pages') - 1) {
          $('.person').each(function() {
            if($(this).data('page') * 1 <= page_rounded) {
              $p = $(this);
            }
          });
        }

        if($p) {
          $('#people').addClass('active');
          $('#people .on').removeClass('on');
          $p.addClass('on');
        } else {
          $('#people').removeClass('active');
        }

        //updateDepth(book, page);

        if (page>=2)
          $('.moleskine .p2').addClass('fixed');
        else
          $('.moleskine .p2').removeClass('fixed');

        if (page<book.turn('pages'))
          $('.moleskine .p' + (book.turn('pages') - 1)).addClass('fixed');
        else
          $('.moleskine .p' + (book.turn('pages') - 1)).removeClass('fixed');

        //Hash.go('page/'+page).update();

      },
    }
  });

  $('.arrow-right').click(function(e) {
    $m.turn('next');
    turned();
    e.preventDefault();
  });

  $('.arrow-left').click(function(e) {
    $m.turn('previous');
    turned();
    e.preventDefault();
  });

	$(document).keydown(function(e){

		var previous = 37, next = 39;

		switch (e.keyCode) {
			case previous:
				$m.turn('previous');
        turned();
			break;
			case next:
				$m.turn('next');
        turned();
        $('.info, .share').addClass('open');
			break;
		}

	});

  $('.person').click(function() {
    turned();
    $m.turn('page', $(this).data('page') * 1);
    $('#people').addClass('active');
    $('#people .on').removeClass('on');
    $(this).addClass('on');
  });
});
