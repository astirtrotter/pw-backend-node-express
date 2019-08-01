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
  $('#serviceDescImageView, #serviceWfImageView, #serviceMent1ImageView, #serviceMent2ImageView, #serviceMent3ImageView').click(function () {
    let viewId = this.id;
    let inputId = viewId.replace('ImageView', 'ImageInput');
    $(`#${inputId}`).click();
  });

  // image view preview with file picker
  $(`[name='image'], [name='descImage'], [name='wfImage'], [name='mentImage']`).change(function () {
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

  // client modal dialog
  $('#clientModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let client = button.data('client');
    let isNew = client === undefined;

    let formAction = isNew ? '/api/clients' : `/api/clients/${client._id}?_method=PUT`;
    let formTitle = isNew ? 'New Client' : 'Edit Client';

    let modal = $(this);
    modal.find('#clientModalForm').attr('action', formAction);
    modal.find('#clientModalLabel').text(formTitle);
    if (client) {
      modal.find('.hovereffect img').attr('src', '/assets/clients/' + client._id);
      modal.find('#clientNameInput').val(client.name);
    }
  });

  // testimontial modal dialog
  $('#testimontialModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let testimontial = button.data('testimontial');
    let isNew = testimontial === undefined;

    let formAction = isNew ? '/api/testimontials' : `/api/testimontials/${testimontial._id}?_method=PUT`;
    let formTitle = isNew ? 'New Testimontial' : 'Edit Testimontial';

    let modal = $(this);
    modal.find('#testimontialModalForm').attr('action', formAction);
    modal.find('#testimontialModalLabel').text(formTitle);
    if (testimontial) {
      modal.find('#testimontialClientInput').val(testimontial.client._id);
      modal.find('#testimontialTextArea').val(testimontial.feedback);
    }
  });

  // portfolio modal dialog
  $('#portfolioModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let portfolio = button.data('portfolio');
    let isNew = portfolio === undefined;

    let formAction = isNew ? '/api/portfolios' : `/api/portfolios/${portfolio._id}?_method=PUT`;
    let formTitle = isNew ? 'New Portfolio' : 'Edit Portfolio';

    let modal = $(this);
    modal.find('#portfolioModalForm').attr('action', formAction);
    modal.find('#portfolioModalLabel').text(formTitle);
    if (portfolio) {
      modal.find('.hovereffect img').attr('src', '/assets/portfolios/' + portfolio._id);
      modal.find('#portfolioNameInput').val(portfolio.name);
      modal.find('#portfolioDescriptionInput').val(portfolio.description);
      modal.find('#portfolioServicesInput').val(portfolio.services.map(it => it._id));
      modal.find('#portfolioSkillsInput').val(portfolio.skills.map(it => it._id));
      modal.find('#portfolioTestimontialInput').val(portfolio.testimontial._id);
    }
  });

  // users/edit.competencies.pug
  $('#profileSkillsInput').ready(function (event) {
    revertProfileCompetencies();
  });

  // work modal dialog
  $('#profileWorkModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let work = button.data('work');
    let index = button.data('index');
    let isNew = work === undefined;

    let formTitle = isNew ? 'New Work' : 'Edit Work';

    let modal = $(this);
    modal.find('#profileWorkModalLabel').text(formTitle);
    modal.find('[name="workIndex"]').val(index);
    if (work) {
      modal.find('#profileWorkNameInput').val(work.name);
      modal.find('#profileWorkPositionInput').val(work.position);
      modal.find('#profileWorkSinceInput').val(work.since.toString().substring(0, 10));
      work.until && modal.find('#profileWorkUntilInput').val(work.until.toString().substring(0, 10));
      modal.find('#profileWorkDescriptionInput').val(work.description);
    }
  });

  // education modal dialog
  $('#profileEduModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let education = button.data('education');
    let index = button.data('index');
    let isNew = education === undefined;

    let formTitle = isNew ? 'New Education' : 'Edit Education';

    let modal = $(this);
    modal.find('#profileEduModalLabel').text(formTitle);
    modal.find('[name="eduIndex"]').val(index);
    if (education) {
      modal.find('#profileEduNameInput').val(education.name);
      modal.find('#profileEduDegreeInput').val(education.degree);
      modal.find('#profileEduSinceInput').val(education.since.toString().substring(0, 10));
      education.until && modal.find('#profileEduUntilInput').val(education.until.toString().substring(0, 10));
      modal.find('#profileEduDescriptionInput').val(education.description);
    }
  });
});

function revertProfileCompetencies() {
  let target = $('#profileSkillsInput');
  let skills = target.data('skills');
  target.val(skills);

  target = $('#profileServicesInput');
  let services = target.data('services');
  target.val(services);

  target = $('#profilePortfoliosInput');
  let portfolios = target.data('portfolios');
  target.val(portfolios);
}

// confirmation of delete action
function confirmDeleting(href) {
  if (confirm('Are you sure')) {
    window.location = href;
  }
}

// add part into service
function addPartIntoService() {
  $('#serviceParts').append(
    "<div class='card'>" +
      "<div class='card-body d-flex flex-column'>" +
        "<input type='text' name='partTitle' placeholder='Title' />" +
        "<input type='text' name='partSubtitle' placeholder='Subtitle' />" +
        "<textarea class='form-control' rows=5 name='partDescription' placeholder='Description' />" +
        "<div class='btn btn-danger' onclick='$(this).parent().parent().remove()'>Remove</div>" +
      "</div>" +
    "</div>");
}

// add step into service
function addStepIntoService() {
  $('#serviceSteps').append(
    "<div class='card'>" +
      "<div class='card-body d-flex flex-column'>" +
        "<input type='text' name='step' placeholder='Step' />" +
        "<div class='btn btn-danger' onclick='$(this).parent().parent().remove()'>Remove</div>" +
      "</div>" +
    "</div>");
}

// add mentality into service
function addMentalityIntoService() {
  $('#serviceMentalities').append(
    "<div class='card'>" +
      "<div class='card-body d-flex flex-column'>" +
        "<input type='text' name='mentTitle' placeholder='Title' />" +
        "<textarea class='form-control' rows=5 name='mentDescription' placeholder='Description' />" +
        "<div class='btn btn-danger' onclick='$(this).parent().parent().remove()'>Remove</div>" +
      "</div>" +
    "</div>");
}
