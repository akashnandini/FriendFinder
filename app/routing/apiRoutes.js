// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
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

  app.post("/api/friends", function (req, res) {
    var bestMatch = 1000;
    var index = -1;
    var newFriend = req.body;

    var newFriendScores = newFriend.scores;
    console.log("newFriend===>>>>>>>>>>" + JSON.stringify(newFriend));
    console.log("newFriendScores===" + newFriend.scores);

    var totalDifference = 0;
    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < newFriendScores.length; j++) {
        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(
          parseInt(newFriendScores[j]) - parseInt(friends[i].scores[j])
        );
        console.log("totalDifference==" + totalDifference);
        if (totalDifference < bestMatch) {
          bestMatch = totalDifference;
          index = i;
        }
      }
    }
    // console.log("Best Match:", friends[index]);
    console.log("Best Match:", friends[index]);
    friends.push(newFriend);
    res.json(friends[index]);
  });
};
