if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}


function contactSubmit(token) {
  var $form = $("#formbucket-contact");
  var $btn = $('input[type=submit]', $form);
  var $form_response = $('.form-response', $form);

  console.log('checking this form:',$form);

  handle_form_ajax($form, $btn, $form_response);
};

function handle_form_ajax($form, $btn, $form_response) {
  // do basic/general validation
  if ($form[0].reportValidity()) {
    console.log('form is valid, submitting...');
  } else {
    console.log('form is invalid, please check the marked fields');
    return false;
  }
  $.ajax({
    url: $form.prop('action'),
    type: 'POST',
    crossDomain: true,
    headers: { 'accept': 'application/javascript' },
    data: $form.serialize(),
    beforeSend: function () { $btn.prop('disabled', 'disabled'); }
  })
  .done(function (response) {
    $form_response.removeClass('error').addClass('success');
    $form_response.html('✅ Thanks for contacting us, a representative will reach out to you as soon as possible');
    $btn.prop('disabled', false);
    $form.find('input, textarea').val('');
    $form.find('select').val('Are you a new customer?');
    $btn.val('Submit');
    console.log(response);
  })
  .fail(function (response) {
    $form_response.removeClass('success').addClass('error');
    $form_response.html('❌ Something went wrong, check the fields for errors and try submitting again');
    $btn.prop('disabled', false);
  })
}

$('.art-grid').masonry({
  // options
  itemSelector: '.art-grid-item',
  columnWidth: 300,
  gutter: 10,
  stagger: 30
});