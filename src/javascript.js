function copyToClipboard(element) {
  const copyButton = document.getElementsByClassName('copy');
  copyButton[0].textContent = 'Gekopieerd!';
  $(copyButton).addClass('copied');

  window.setTimeout(function() {
    $(copyButton).removeClass('copied');
    copyButton[0].textContent = 'Kopieër handtekening';
  }, 800)
}

$(window).on('load', function() {
  $('.name').select();
  const clipboard = new ClipboardJS('.copy');

  clipboard.on('success', function(e) {
      e.clearSelection();
  });


  $('.no-select input').on('click', function() {
    if (this.type !== 'checkbox') {
    this.setSelectionRange(0, this.value.length);
    }
  });

  $('.no-select select').on('change', function(el) {
    const newVal = el.target.value;
    $(`#to-copy .brand`).attr('src', `https://codefield-nl.github.io/email-signature/assets/${newVal}.png`);
    $('.site').val(`https://${newVal}.nl`);
    $('.site').text(`${newVal}.nl`);
    $('.site').attr('href', `https://${newVal}.nl`);
  });

  $('.no-select .checkbox').on('change', function(el) {
    switch(el.target.classList[0]) {
      case 'fb-checkbox':
        $('#to-copy .facebook')[0].style.display === 'block' ? $('#to-copy .facebook')[0].style.display = 'none' : $('#to-copy .facebook')[0].style.display = 'block';
      break;

      case 'tw-checkbox':
        $('#to-copy .twitter')[0].style.display === 'block' ? $('#to-copy .twitter')[0].style.display = 'none' : $('#to-copy .twitter')[0].style.display = 'block';
      break;

      case 'li-checkbox':
        $('#to-copy .linkedin')[0].style.display === 'block' ? $('#to-copy .linkedin')[0].style.display = 'none' : $('#to-copy .linkedin')[0].style.display = 'block';
      break;
    }
  });



  $('.no-select input').keyup(function(e) {
    const classOfEl = e.target.classList[0];
    update(classOfEl)
  });

  function update(el) {
    const newVal = $(`.form .${el}`).val();
    
    switch(el) {
      case 'phone':
        $(`#to-copy .${el}`).attr('href',`tel:${newVal.replace(/\s/g,'')}`)
        $(`#to-copy .${el}`).text(newVal);
        break;

        case 'email':
          $(`#to-copy .${el}`).text(newVal);
          $(`#to-copy .${el}`).attr('href',`mailto:${newVal}`);
          break;

        case 'facebook':
        case 'linkedin':
        case 'twitter':
          $(`#to-copy .${el}`).attr('href',`${newVal}`);
          break;

        case 'avatar':
          $(`#to-copy .${el}`).attr('src',`${newVal}`);
          break;

        case 'name':
        case 'job':
        case 'address':
          $(`#to-copy .${el}`).text(newVal);
          break;

        case 'site':
          $(`#to-copy .${el}`).attr('href',`${newVal}`);
          $(`#to-copy .${el}`).text(newVal);
          break;
    }
  }
})