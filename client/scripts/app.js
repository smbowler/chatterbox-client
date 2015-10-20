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

  _.each(reverseMessages, function(messageObject) {

    $('.chats').append('<div class = messages>' + '<a href = #>' + messageObject.username + '</a>' + ": " + messageObject.text + "; " + messageObject.createdAt + '</div>');
  
  });
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


//Fetch New Messages
$('button').on('click', function(){
  app.fetch();
});


//Collect rooms in an array
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
    // $('#roomSelect').append('<option class = option>');
  _.each(uniqRooms, function(room) {
    $('#roomSelect').append($('<options />').val(room).text(room));
  });
};

// <select id="select">
//     <option value="AA">AA</option>
//     <option value="B">B</option>
//     <option value="CCC">CCC</option>
//     <option value="DD">DD</option>
//     <option value="E">E</option>
// </select>

//  $.getJSON("/Admin/GetFolderList/", function(result) {
//     var options = $("#options");
//     //don't forget error handling!
//     $.each(result, function(item) {
//         options.append($("<option />").val(item.ImageFolderID).text(item.Name));
//     });
// });



