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
    $('.hovereffect').siblings(`[name='image']`).click();
  });
  // same above on service edit view
  $('#serviceDescImageView').click(function () {
    $('#serviceDescImageInput').click();
  });

  // image view preview with file picker
  $(`[name='image'], [name='descImage']`).change(function () {
    if (this.files && this.files[0]) {
      let inputId = this.id;
      let viewId = inputId.replace('ImageInput', 'ImageView');
      let reader = new FileReader();
      reader.onload = function (ev) {
        let imageView = $(`#${viewId}`);
        imageView.attr('src', ev.target.result);
      };
      reader.readAsDataURL(this.files[0]);
    }
  });

  // skill modal dialog
  $('#skillModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let skill = button.data('skill');
    let isNew = skill === undefined;

    let formAction = isNew ? '/api/skills' : `/api/skills/${skill._id}?_method=PUT`;
    let formTitle = isNew ? 'New Skill' : 'Edit Skill';

    let modal = $(this);
    modal.find('#skillModalForm').attr('action', formAction);
    modal.find('#skillModalLabel').text(formTitle);
    if (skill) {
      modal.find('.hovereffect img').attr('src', '/assets/skills/' + skill._id);
      modal.find('#skillNameInput').val(skill.name);
      modal.find('#skillTypeInput').val(skill.type);
    }
  });
});

// confirmation of delete action
function confirmDeleting(href) {
  if (confirm('Are you sure')) {
    window.location = href;
  }
}