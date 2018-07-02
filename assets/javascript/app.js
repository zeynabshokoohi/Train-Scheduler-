    // Initialize Firebase
    // This is the code we copied and pasted from our app page
    var config = {
        apiKey: "AIzaSyDvJZS37Nk613ywKNt1yjunWMcKO0yRZTk",
        authDomain: "trainscheduler-1301e.firebaseapp.com",
        databaseURL: "https://trainscheduler-1301e.firebaseio.com",
        projectId: "trainscheduler-1301e",
        storageBucket: "",
        messagingSenderId: "606625011936"
    };
    firebase.initializeApp(config);
    // Variables
    // ================================================================================
    // Get a reference to the database service
    var database = firebase.database();

    $(document).ready(function () {

        $("#submit").on("click", function (event) {
            event.preventDefault();

            name = $("#name-input").val().trim();
            destination = $("#destination-input").val().trim();
            firsttime = $("#firsttraintime").val().trim();
            frequency = $("#frequencymins").val().trim();

            database.ref().push({
                name: name,
                destination: destination,
                firsttime: firsttime,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP,
            });

        });

        database.ref().on("child_added", function (childSnapshot) {

            console.log(childSnapshot.val());
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().firsttime);
            console.log(childSnapshot.val().frequency);
            console.log(childSnapshot.val().dateAdded);




            //let startDate = changeDateToSec(childSnapshot.val().date);
            //let currDate = new Date(childSnapshot.val().dateAdded);

            // let monthsLapsed = monthDiff(startDate, currDate);
            // console.log(monthsLapsed);
            let row = $("<tr>");
            row.append(`<td>${childSnapshot.val().name}`);
            row.append(`<td>${childSnapshot.val().destination}`);
            row.append(`<td>${childSnapshot.val().firsttime}`);
            row.append(`<td>${childSnapshot.val().frequency}`);

            $("tbody").append(row);
        }, function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });
    });