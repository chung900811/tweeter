$(document).ready(function () {
    //console log appears on the console (dev tools) on page.  
    console.log("ready!");

    const loadTweets = function() {
        $.ajax('/tweets', { method: 'GET' })
        .then(function (moreTweets) {
          console.log('Success: ', moreTweets);
          renderTweets(moreTweets);    
    
        });   
      }     
         loadTweets();
         
    $("#new-tweet").on('submit', function(event){

        event.preventDefault();
        
        //capturing the value of the form
    const tweetStr = $("#tweet-input").val();
       
        if (!tweetStr) {
            $('.error-section').slideDown('fast');
            $('#error-message').text('Please enter text');
            return;
            }
        if (tweetStr.length > 140) {
            $('.error-section').slideDown('fast');
            $('#error-message').text('Max characters exceeded');
            return;
            }
    const serializedData = $(this).serialize();

        $.post('/tweets/', serializedData, (response) => {
            $('.error-section').slideUp('fast');
            $('#tweet-input').val('');
            $('.counter').val('140');
            console.log(response);
            loadTweets();
    });      
})

      
    const renderTweets = function (tweets) {
        for (const tweet of tweets) {
        createTweetElement(tweet);
        }
        
    }
})
    const createTweetElement = function(tweet) {
        let $tweet = $(
            `
        <div class="maintweetcontent">

        <div class="user-logo">
        <div>
        <img src="${tweet.user.avatars}" style="width:28px; height:28px;">
        <label>${tweet.user.name}</label>
        </div> 
        <div> 
        <output name="userhandle" class="userhandle" for="tweet-body">${tweet.user.handle}</output>
        </div> 
        </div>
        <p class = "maincontent">${tweet["content"]["text"]}</p>
        <div class="content-footer">
        <span>${timeago.format(tweet.created_at)}</span>
        <div class="media-icon"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-repeat"></i> </i><i class="fa-solid fa-heart"></i></div>
        </div>
        </div>
        `
    );
            $("#maintweetcontent").prepend($tweet)   
}

