var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener("deviceready", this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent("deviceready");
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {},
};

var Database_Name = 'Testttttt';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);

dbObj.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS iRate(id INTEGER PRIMARY KEY AUTOINCREMENT, Name, RestaurantName, RestaurantType, AccessedDate, Price, AverageRating, Comments)');
    // tx.executeSql('DROP TABLE iRate');

    alldetails();
});

function insertData() {
    var name = document.getElementById("tbName").value;
    var restaurantName = document.getElementById("tbRestaurantName").value;
    var restaurantType = document.getElementById("radio-choice-c").value;
    var accessed_date = document.getElementById("tbDate").value;
    var price = document.getElementById("tbPrice").value;
    var service = parseInt(document.getElementById("tbService").value);
    var cleanliness = parseInt(document.getElementById("tbCleanliness").value);
    var food = parseInt(document.getElementById("tbFoodquality").value);
    var average = Math.floor((service + cleanliness + food) / 3)
    var comment = document.getElementById("tbComment").value;
    dbObj.transaction(function(tx) {
        tx.executeSql("INSERT INTO iRate(Name, RestaurantName, RestaurantType, AccessedDate, Price, AverageRating, Comments) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, restaurantName, restaurantType, accessed_date, price, average, comment]);
        // tx.executeSql('DROP TABLE if exists iRate')
    });
    alldetails();
}


function alldetails() {
    dbObj.transaction(function(tx) {
        tx.executeSql('SELECT * from iRate', [], function(tx, results) {
            var len = results.rows.length
            for (var i = 0; i < len; i++) {
                $('#list').append(
                    "<li>" +
                    "<h3>" + "Name: " + results.rows.item(i).Name + "</h3>" +
                    "<p class='topic'>" + "<strong>Restaurant Name: </strong>" + results.rows.item(i).RestaurantName + "</p>" +
                    "<p>" + "<strong>Restaurant Type: </strong>" + results.rows.item(i).RestaurantType + "</p>" +
                    "<p>" + "<strong>Accessed Date: </strong>" + results.rows.item(i).AccessedDate + "</p>" +
                    "<p>" + "<strong>Price: </strong>" + results.rows.item(i).Price + "</p>" +
                    "<p>" + "<strong>Comment: </strong>" + results.rows.item(i).Comments + "</p>" +
                    "<p class='ui-li-aside'><strong>" + "Rating: " + (results.rows.item(i).AverageRating === 1 ?
                        "<span class='fa fa-star checked'>" :
                        results.rows.item(i).AverageRating === 2 ? "<span class='fa fa-star checked'><span class='fa fa-star checked'>" : "<span class='fa fa-star checked'><span class='fa fa-star checked'><span class='fa fa-star checked'>") + "</strong></p>" +
                    "</li>"
                )
            }
        })
    })
}