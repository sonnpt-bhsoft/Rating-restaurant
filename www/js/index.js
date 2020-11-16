/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
    // tx.executeSql('DROP TABLE Employee_Table');

    // alldetails();
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
    });
    alldetails();
}

function alldetails() {
    dbObj.transaction(function(tx) {
        tx.executeSql('SELECT * from iRate', [], function(tx, results) {
            var len = results.rows.length
            $("#tblGrid").find("tr:gt(0)").remove();
            var str = '';
            for (var i = 0; i < len; i++) {
                str += "<tr>";
                str += "<td>" + results.rows.item(i).Name + "</td>";
                str += "<td>" + results.rows.item(i).RestaurantName + "</td>";
                str += "<td>" + results.rows.item(i).RestaurantType + "</td>";
                str += "<td>" + results.rows.item(i).AccessedDate + "</td>";
                str += "<td>" + (results.rows.item(i).AverageRating === 1 ?
                    "<span class='fa fa-star checked'>" :
                    results.rows.item(i).AverageRating === 2 ? "<span class='fa fa-star checked'><span class='fa fa-star checked'>" : "<span class='fa fa-star checked'><span class='fa fa-star checked'><span class='fa fa-star checked'>") + "</td>";
                str += "<td>" + results.rows.item(i).Comments + "</td>";
                str += "</tr>";
                document.getElementById("tblGrid").innerHTML += str;
                str = '';
            }
        }, null);
    });

}