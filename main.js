object_array=[];

function setup() {
    canvas = createCanvas(400, 350);
    canvas.center()
    video.hide();
    console.log("inside setup");
}

function preload() {
    console.log("inside preload");
    video = createVideo('video.mp4');
    // video.hide();
}

function draw() {
    image(video, 0, 0, 400, 350);
    if (status != "") {
       fill("#0000ff");
       textSize(20);
        model.detect(video, getResults);
        for(i=0;i<object_array.length;i++){
            object_name=object_array[i].label;
            object_confidence=floor(object_array[i].confidence*100);
            object_x=object_array[i].x;
            object_y=object_array[i].y;
            object_width=object_array[i].width;
            object_height=object_array[i].height;
            text(object_name+" "+object_confidence+"%",object_x,object_y);
            noFill();
            stroke("#0000ff");
            rect(object_x,object_y,object_width,object_height);
        }
    } 
}

function getResults(E, R) {
    if (E) {
        console.error(E);
    } else {
        console.log(R);
        object_array=R;
    }
}
status = "";

function startvideo() {
    model = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "status: detecting objects";

}

function modelloaded() {
    console.log("model loaded successfully");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1.5);
}