// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
//var waitListData = require("../data/waitinglistData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
    console.log("You sent, " + JSON.stringify(friends));
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  /*app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (friendsData.length < 5) {
      friendsData.push(req.body);
      res.json(true);
    }
  });*/

  app.post("/api/friends", function(req, res) {
    //setup variables for finding match
    /*var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };*/
    var bestMatch = 1000;
    var index = -1;
    // Here we take the result of the user"s survey POST and parse it.
    var newFriend = req.body;

    var newFriendScores = newFriend.scores;
    console.log("newFriend===>>>>>>>>>>" + JSON.stringify(newFriend));
    console.log("newFriendScores===" + newFriend.scores);

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference = 0;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < newFriendScores.length; j++) {
        // We calculate the difference between the scores and sum them into the totalDifference
        //var diff = Math.abs(newScore[j] - friends[i].scores[j]);
        totalDifference += Math.abs(
          parseInt(newFriendScores[j]) - parseInt(friends[i].scores[j])
        );
        console.log("totalDifference==" + totalDifference);

        // If the sum of differences is less then the differences of the current "best match"
        /*if (totalDifference <= bestMatch.friendDifference) {
          // Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }*/
        if (totalDifference < bestMatch) {
          bestMatch = totalDifference;
          index = i;
        }
      }
    }

    /*for (var i = 0; i < friends.length; i++) {
      //Iterate through the whole list of friends already in database
      total = 0;

      for (var j = 0; j < newScore.length; j++) {
        //for each friend calculate the total value
        var diff = Math.abs(newScore[j] - friends[i].scores[j]);
        total += diff;
      }
      if (total < bestMatch) {
        bestMatch = total;
        index = i;
      }
    }*/
    // console.log("Best Match:", friends[index]);
    console.log("Best Match:", friends[index]);
    friends.push(newFriend);
    res.json(friends[index]);
  });
};
