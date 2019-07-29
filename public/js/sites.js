$(function () {
  // main navigation item: active class
  let current = location.pathname;
  $('nav ul li a').each(function () {
    let $this = $(this);
    // if the current path is like this link, make it active
    if (current.startsWith($this.attr('href')) && current.length > 1) {
      $this.addClass('active');
    }
  });

  // users/index.pug : entire row clickable (except action column)
  $('tbody [data-href]').each(function (i, e) {
    let href = $(this).data("href");
    $(e).children('td:not(:last)').click(function () {
      window.open(href, '_blank');
    });
  });

  // add checkbox values on form submission
  $('form').submit(function () {
    $(this).find('input[type="checkbox"]').each(function () {
      var checkbox = $(this);
      if (checkbox.is(':checked')) {
        checkbox.attr('value', true);
      } else {
        checkbox.after().append(checkbox.clone().attr({type: 'hidden', value: false}));
        checkbox.prop('disabled', true);
      }
    })
  });

  // image view 'Change' button click
  $('.hovereffect .overlay label').click(function () {
    $(`[name='image']`).click();
  });

  // image view preview with file picker
  $(`[name='image']`).change(function () {
    if (this.files && this.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        $('.hovereffect img').attr('src', ev.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
});

// confirmation of delete action
function confirmDeleting(href) {
  if (confirm('Are you sure')) {
    window.location = href;
  }
}