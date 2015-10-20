// YOUR CODE HERE:

//App object
var app = {};


//App init
app.init = function(value)   {
  return true;
};

//Array objectIDs
var objectIDs = [];


//App send method
app.send = function(message){
  //should submit post request
  //Variable to hold ObjectID value;
  $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
    }  
  });
  // objectIDs.push(data.objectId);
};


//App fetch method
app.fetch = function() {
 $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    data: JSON.stringify(),
    contentType: 'application/json',
    success: function (data){ 
      
      //messages form server - messages is the array of message objects
      var messages = data.results;
      showMessage(messages);

      console.log('chatterbox: Message fetched. Data: ', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message. Error: ', data);
    }  
  });
};


//App clear messages method
app.clearMessages = function() {
  $('#chats').empty();
};


//App add messages method
app.addMessage = function(message){
  $('#chats').append('<div/>' + message + '</div>');
  //Parse out and put in individual elements:
    //username --> message.username
    //text --> message.text
    //roomname --> message.roomname
};


//App add room method
app.addRoom = function(roomName){
  $('#roomSelect').append('<div/>' + roomName + '</div>');
};


//App add friend method
app.addFriend = function() {

};


//App showMessage method
var showMessage = function(messages) {
  var reverseMessages = messages.reverse();
  //iterate through array of message objects, put them in divs, and append to html
  _.each(reverseMessages, function(messageObject) {
    $('#chats').append('<div/>' + messageObject.text + '</div>')
  });
};

app.fetch();


//QUESTIONS OUTSTANDING
//1. How do we access the most recent messages, if the Data.results array is capped at 100?

