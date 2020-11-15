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

var Database_Name = 'MyDatabase';
var Version = 1.0;
var Text_Description = 'My First Web-SQL Example';
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size);
dbObj.transaction(function(tx) {

    tx.executeSql('CREATE TABLE IF NOT EXISTS Employee1(id INTEGER PRIMARY KEY AUTOINCREMENT, Name, Restaurant_Name)');
    alldetails();
});

function insertData() {
    var name = document.getElementById("tbName").value;
    var restaurantName = document.getElementById("tbRestaurantName").value;
    dbObj.transaction(function(tx) {
        tx.executeSql('INSERT INTO Employee1(Name, Restaurant_Name) values(?, ?)', [name, restaurantName]);
        // tx.executeSql('insert into Employee(id, Name, Restaurant_Name) values(' + id + '","' + name + '","' + restaurantName + ')');
    });
    alldetails();
}

function alldetails() {
    dbObj.transaction(function(tx) {
        tx.executeSql('SELECT * from Employee1 ', [], function(tx, results) {
            var len = results.rows.length,
                i;
            // document.getElementById("tblGrid").innerHTML = '';  
            $("#tblGrid").find("tr:gt(0)").remove();
            var str = '';
            for (i = 0; i < len; i++) {
                str += "<tr>";
                str += "<td>" + results.rows.item(i).Name + "</td>";
                str += "<td>" + results.rows.item(i).Restaurant_Name + "</td>";
                str += "</tr>";
                document.getElementById("tblGrid").innerHTML += str;
                str = '';
            }
        }, null);
    });

}