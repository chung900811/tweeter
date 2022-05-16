
$(document).ready(function() {
    $('#tweet-input').on('keyup',function() {
        let counter = $('#tweet-input').siblings('.tweetbutton').find('.counter')
        let value = 140 - $('#tweet-input').val().length;
        if( value < 0 ) {
          return counter.text(value).css('color', 'red') ;
        }
        return counter.text(value).css('color', 'black') ;
    })
})
