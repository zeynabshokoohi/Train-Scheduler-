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


    // $(document).ready(function () {

    // 2. Button for enter iformation about train
    $("#submit").on("click", function (event) {
        event.preventDefault();
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firsttime = $("#firsttraintime").val().trim();
        frequency = $("#frequencymins").val().trim();

        // Creates local "temporary" object for holding employee data
        var train = {
            name: name,
            destination: destination,
            firsttime: firsttime,
            frequency: frequency
        }

        // Uploads employee data to the database
        database.ref().push(train);

        // Logs everything to console
        console.log(train.name);
        console.log(train.destination);
        console.log(train.firsttime);
        console.log(train.frequency);


    });

    // Create Firebase event for adding entered data to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {

        console.log(childSnapshot.val());
        // Store everything into a variable.
        var trainname = childSnapshot.val().name;
        var traindestination = childSnapshot.val().destination;
        var trainfirsttime = childSnapshot.val().firsttime;
        var trainfrequency = childSnapshot.val().frequency;

        // Train Info
        console.log(trainname);
        console.log(traindestination);
        console.log(trainfirsttime);
        console.log(trainfrequency);
        console.log(childSnapshot.val().dateAdded);

        // Calculate the months worked using hardcore math

        let firstTimeConverted = moment(trainfirsttime, "HH:mm").subtract(1, "years");
        console.log("firstTimeConverted:", firstTimeConverted);
        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        let tRemainder = diffTime % trainfrequency;
        console.log(tRemainder);
        let tminutestilltrain = trainfrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tminutestilltrain);
        let nexttrain = moment().add(tminutestilltrain, "minutes").format("HH:mm");
        console.log("ARRIVAL TIME: " + moment(nexttrain).format("HH:mm"));




        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainname),
            $("<td>").text(traindestination),
            $("<td>").text(trainfrequency),
            $("<td>").text(nexttrain),
            $("<td>").text(tminutestilltrain),

        );

        // Append the new row to the table
        $("#tbody1").append(newRow);

        // Create the new row
        //  let row = $("<tr>");
        // row.append(`<td>${trainname}`);
        //  row.append(`<td>${traindestination}`);
        //  row.append(`<td>${trainfrequency}`);
        //  row.append(`<td>${nexttrain}`);
        // row.append(`<td>${tminutestilltrain}`);

        //  $("tbody").append(row);
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    // });