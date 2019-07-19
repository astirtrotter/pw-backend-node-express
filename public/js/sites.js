$(function () {
  let current = location.pathname;
  $('ul li a').each(function () {
    let $this = $(this);
    // if the current path is like this link, make it active
    if (current.startsWith($this.attr('href')) && current.length > 1) {
      $this.addClass('active');
    }
  });

  $('*[data-href]').on('click', function() {
    window.location = $(this).data("href");
  });
});