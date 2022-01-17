
const firebaseConfig = {
    apiKey: "AIzaSyCsMHJjMSfdSKTw9k-XM3GQoB4D30x6ZUw",
    authDomain: "covid-survey-app.firebaseapp.com",
    projectId: "covid-survey-app",
    storageBucket: "covid-survey-app.appspot.com",
    messagingSenderId: "277835984545",
    appId: "1:277835984545:web:7154ab37e52652b3eccae0",
    measurementId: "G-4JP1HGZ6JD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

//Admin Login function 
function LoginF() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    //firebase signIn authanticaton function 
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById("email").value = " ";
            Swal.fire(
                'Wellcome admin!',
                'you Loged in successfully!',
                'success'
            )
            setTimeout(function () {
                location.href = "./admin.html"
            }, 2000);
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        });
}
//function to get the logged in user email and display it on admin screen
function getCU() {  
    const user = auth.currentUser;
    document.getElementById("Email").innerHTML = user.email;
}
//this is a firebase function that watch user state all time
auth.onAuthStateChanged((user) => {
    if (user) {
        getCU();
        getQuestions();
    }
});
//logout function
function logoutF() {
    auth.signOut().then(() => {

        Swal.fire(
            'Good bye!',
            'Loged Out in successfully!',
            'success'
        )
        setTimeout(function () {
            location.href = "./index.html"
        }, 2000);

    }).catch((error) => {
        // An error happened.
    });
}

//showing diffrent screens when user click on createSurvey and surveyReport buttons
const createSurvey_btn = document.querySelector("#createSurvey");
const surveyReport_btn = document.querySelector("#surveyReport");
document.getElementById("csScreen").style.display = "none"
document.getElementById("srScreen").style.display = "none"
createSurvey_btn.addEventListener("click", () => {
    document.getElementById("buttons").style.display = "none"
    document.getElementById("csScreen").style.display = "block"
});

surveyReport_btn.addEventListener("click", () => {
    document.getElementById("buttons").style.display = "none"
    document.getElementById("srScreen").style.display = "block"
});

//showing diffrent type of blocks to write the question when user click on add question button
document.getElementById("multiple").style.display = "none"
document.getElementById("single").style.display = "none"
document.getElementById("data").style.display = "none"
function addQ() {
    const questionType = document.getElementById("questionType").value
    if (questionType == "Multiple") {
        document.getElementById("multiple").style.display = "block"
        document.getElementById("single").style.display = "none"
        document.getElementById("data").style.display = "none"
    }
    else if (questionType == "Single") {
        document.getElementById("single").style.display = "block"
        document.getElementById("multiple").style.display = "none"
        document.getElementById("data").style.display = "none"
    }
    else {
        document.getElementById("data").style.display = "block"
        document.getElementById("multiple").style.display = "none"
        document.getElementById("single").style.display = "none"
    }
}

var options = [];
var passingResponse = [];
document.querySelector("#addOption").addEventListener("click", () => {
    const optionData = document.getElementById("option").value
    if (optionData != "") {
        options.push(optionData)
        passingResponse.push(document.querySelector('input[name="passResponse"]:checked').value);
        document.getElementById("option").value = "";
    }
    else {
        alert("please enter value in option")
    }
});
//save the questions created by admin
function saveQuestion(type) {
    //to save a multiple question 
    if (type == "multiple") {
        let question = document.getElementById("multipleQ").value;
        //firebase function that store questions in firestore in the collection questions
        firestore.collection('Questions').add({
            type, question, options, passingResponse, time: Date.now()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            question = document.getElementById("multipleQ").value = " ";
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        console.log(type, question, options, passingResponse)
    }
    //to save a single question
    else if (type == "single") {
        let question = document.getElementById("singleQ").value
        let passingResponse = document.querySelector('input[name="passResponse"]:checked').value
        //firebase function that store questions in firestore in the collection questions
        firestore.collection('Questions').add({
            type, question, passingResponse, time: Date.now()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("singleQ").value =  " ";
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        console.log(type, question, passingResponse)
        
    }
    //to save data question
    else if (type == "data") {
        let question = document.getElementById("dataQ").value;
        //firebase function that store questions in firestore in the collection questions
        firestore.collection('Questions').add({
            type, question, time: Date.now()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("dataQ").value = " ";
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        console.log(type, question)
    }
}
//get thhe questions saved by admin
const getQuestions = () => {
    firestore.collection('Questions').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
                console.log(change.doc.data())
                console.log(change.doc.data().type)
                createElementsForQuestions(change.doc.data());
            }
            else if(doc.data = " "){
                
            }
        });
    });
};

const createElementsForQuestions = (Data) => {
    if(Data.type == "single"){

    }
    else if(Data.type == "multiple"){

    }
    else if(Data.type == "data"){

    }
};
