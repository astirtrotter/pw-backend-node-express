$(function () {
  let current = location.pathname;
  $('ul li a').each(function () {
    let $this = $(this);
    // if the current path is like this link, make it active
    if ($this.attr('href').indexOf(current) !== -1 && current.length > 1) {
      $this.addClass('active');
    }
  });
});