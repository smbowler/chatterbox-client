// YOUR CODE HERE:

//App object
var app = {};


//App init
app.init = function(value)   {
  return true;
};

app.username = 'Hercules';
app.roomname = 'Lobby';

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
        console.log(message);
        userMessage(message);
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
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
    type: 'GET',
    data: JSON.stringify(),
    contentType: 'application/json',
    success: function (data){ 
      
      //messages form server - messages is the array of message objects
      var messages = data.results;
      showMessage(messages);
      collectRooms(messages);

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
app.addMessage = function(theMessage){
  //$('#chats').append('<div/>' + message + '</div>');
  //$send = $('#send');
  var message = {
    username: app.username,
    roomname: app.room || 'lobby',
    text: theMessage
  };

  app.send(message);
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

  _.each(reverseMessages, function(messageObject) {
    var escapedUsername = _.escape(messageObject.username)
    var escapedText = _.escape(messageObject.text)
    $('.chats').append('<div class = messages>' + '<a href = #>' + escapedUsername + '</a>' + ": " + escapedText + "; " + escapedUsername + '</div>');
  
  });
};

var userMessage = function(message){
  $('.chats').prepend('<div class = messages>' + '<a href = #>' + message.username + '</a>' + ": " + message.text + "; " + message.username + '</div>');
  console.log(message);
};

// var showMessage = function(messages) {
//   var reverseMessages = messages.reverse();

//   //iterate through array of message objects, put them in divs, and append to html
//   _.each(reverseMessages, function(messageObject) {
//     //append a message div - this will be our message container
//     //$('#chats').append('<div class = message/>');
//     //append username, message, and time stamp to the message div above
//     $('.chats').append('<div class = messages>' + messageObject.username + messageObject.text + messageObject.createdAt + '</div>');
//     //$('.chats').append('<div class = text>' + messageObject.text + '</div>');
//     //$('.chats').append('<div class = createdAt>' + messageObject.createdAt + '</div>');
//   });
// };

//Collect rooms in an array, populate select element on index.html with rooms
var collectRooms = function(messages) {
  var reverseMessages = messages.reverse();
  var rooms = [];

  _.each(reverseMessages, function(messageObject) {
    if (messageObject.roomname && messageObject.roomname !== null) {
      rooms.push(messageObject.roomname);
    }
  });

  var uniqRooms = _.uniq(rooms);
  addOption(uniqRooms);
};

var addOption = function(uniqRooms) {
  _.each(uniqRooms, function(room) {
    var escapedRoom = _.escape(room)
    $('#roomSelect').append('<option value = ' + escapedRoom + '>' + escapedRoom + '</option>');
  });
};



//Event handlers below

//Fetch New Messages
$('button').on('click', function(){
  app.fetch();
});

//Add New Messages
$('#submit').on('click', function(event){
  event.preventDefault();
  //invke the addMessage function, passing it a parameter of message
  var send = $('#send input');
  console.log(send);
  app.addMessage(send[0].value);
});

//Event listner for when room changes
$('#roomSelect').on('change', function(){
  console.log('room change')
});

// var message = {
//         username: app.username,
//         roomname: app.room || 'lobby',
//         text: app.$message.val()
//       };
