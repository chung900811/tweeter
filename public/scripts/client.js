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
       
          //post method using jQuery
        $.post( "/tweets", $( "#tweet-input" ).serialize(), reLoadpage);  
          
        })
        const reLoadpage = (function() {
            location.reload();
        });
      
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
            <span>${(new Date(tweet.created_at)).toString().slice(4, 15)}</span>
            <div class="media-icon"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-repeat"></i> </i><i class="fa-solid fa-heart"></i></div>
            </div>
            </div>
            `
    );
            $("#maintweetcontent").append($tweet)   
    }



