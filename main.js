Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'">';
    });
}

console.log('ml5 version: ', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ADIN35UI_/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The predicted gesture is - " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("update_gesture").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }
        if(results[0].label == "best"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        if(results[0].label == "victory"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
    }
}

