img = "";
status = "";
objects = [];

function preload() {
    
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocosd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;   
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "") {
        objectDetector.detect(video, gotResult);
        if(objects.length <= 0) {
            document.getElementById("whereDababy").innerHTML = "THE BABY IS MISSING";
        }
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            if(objects[i] = "person") {
                document.getElementById("whereDababy").innerHTML = "The baby is found!";                   
                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            } else {
                document.getElementById("whereDababy").innerHTML = "THE BABY IS MISSING!";
            }
        }
    }
}
