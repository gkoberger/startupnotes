$(function() {
  $(window).resize(function() {
    $('#content').height($(window).height());
  }).trigger('resize');
});

yepnope({
	test : Modernizr.csstransforms,
	yep: ['js/vendor/turn.min.js'],
	nope: ['js/vendor/turn.html4.min.js'],
	complete: loadApp
});

function loadApp() {
	$("#moleskine").turn({
		width: 700,
		height: 485,

		elevation: 50,
		gradients: true,
		duration: 1000,

		//autoCenter: true
    when: {
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

        //updateDepth(book, page);

        if (page>=2)
          $('.moleskine .p2').addClass('fixed');
        else
          $('.moleskine .p2').removeClass('fixed');

        if (page<book.turn('pages'))
          $('.moleskine .p111').addClass('fixed');
        else
          $('.moleskine .p111').removeClass('fixed');

        //Hash.go('page/'+page).update();

      },
    }
  });
};
