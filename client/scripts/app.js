// YOUR CODE HERE:

//App object
var app = {};


//App init
app.init = function(value)   {
  return true;
};


//App send method
app.send = function(message){
  //should submit post request
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
};


//App fetch method
app.fetch = function() {
 $.ajax({
    type: 'GET',
    data: JSON.stringify(),
    contentType: 'application/json',
    success: function (data) {
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
};

//App add room method
app.addRoom = function(roomName){
  $('#roomSelect').append('<div/>' + roomName + '</div>');
};





