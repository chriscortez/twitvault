window.onload = function(){
  $.get('/tweets/load', function(data) {
    // data will be tweets
    console.log(data);
    for ( var i = 0; i < data.length; i++ ) {
      $('#tweets').append('<div class="tweet container" data-id=' + data[i].id_str + '>' + data[i].text + '</div>');
    }

    $('.tweet').click(function() {
      if($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        $(this).addClass('selected');
      }
    });
  })
  .fail(function() {
    console.log('error loading tweets');
  });

  $('.delete').click(function() {
    confirm("Delete tweets? THIS CANNOT BE UNDONE.");
    $('.selected').each(function() {
      var $this = $(this);
      $.post('/tweets/destroy', { id: $(this).data('id') }, function(data) {
        $this.remove();
      });
    });
  });
};
