// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  var toFind;
  $.get('/dreams', function(res) {
    console.log(res.guessNumber);
    toFind=res.guessNumber;
    res.numbers.forEach(function(num) {
      $('<li></li>').text(num).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    number = $('input').val();
    $.post('/dreams?' + $.param({number: number,guessNumber:toFind}), function(res) {
      console.log(res);
      $('<li></li>').text(res.status).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
      
      if(res.status=="correct"){
        console.log("YESSSSSSS");
          $('#result').text('well done. You did it in '+res.numbers.length+" tries");
      }
    });
  });

});
