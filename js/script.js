$(document).ready(function(){
  var $pageContent = $('.page-content');
  var $pageLinks = $('.page-link');
  var $pageItems = $('.page-item');
  var $previous = $('.page-previous');
  var $next = $('.page-next');
  var activePage = 1;
  var totalPages = 2;
  // When adding extra pages update var totalPages = 3 with the new page amount

  // on pagination click
  $pageLinks.on('click', function (e) {
    var $this = $(this);
    var pageString = $this.data('page');
    var pageNum = parseInt(pageString);

    // find the next page
    if (pageString === '+1') {
      if (activePage < totalPages) {
        activePage = activePage + 1;
      }
    } else if (pageString == '-1') {
      if (activePage > 1) {
        activePage = activePage - 1;
      }
    } else {
      activePage = pageNum;
    }

    // handle next / previous active/disabled states
    if (activePage > 1) {
      $previous.removeClass('disabled')
    } else {
      $previous.addClass('disabled')
    }

    if (activePage < totalPages) {
      $next.removeClass('disabled')
    } else {
      $next.addClass('disabled')
    }

    // gets new data
    $.get('pages/' + activePage + '.html', function (data) {
      // insert new html
      $pageContent.html(data);

      // sets pagination active class
      $pageLinks.removeClass('active');
      $pageItems.removeClass('active');
      $pageLinks.filter('[data-page="' + activePage + '"]').parent().addClass('active');

      // scroll back to top
      $([document.documentElement, document.body]).animate({
          scrollTop: $pageContent.offset().top - 100
      }, 200);


    });

    e.preventDefault();
  });
});
