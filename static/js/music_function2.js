var track;
var button_tag;
var running_id = 1;
var bottom = document.getElementById("bottom");
var seekslider;
var track_duration;
var runnung = false;
function play(id,name,artist) {
    pause(running_id,);
    running_id = id;
    running = true;
    track = document.getElementById("audio" + id);
    button_tag = document.getElementsByClassName("playpause" + id)
    track.play();
    track_duration = track.duration;
    bottom.innerHTML = `<div class="card my-1">
    <div class="card-body">
    <h5 class="card-title">`+name+`</h5>
    <p class="card-text">`+artist+`</p>
    <div class="rangeslider">
    <input type="range" name="slider" id="slider" min="0" max="100" value="0">
    </div>
    <i class="fas fa-play playpause`+id+`" id="playpause`+id+`" onclick="pause(`+id+`,`+name+`,`+artist+`)"></i>
    </div>
    </div>`;
    button_tag[0].setAttribute('class', "fas fa-pause playpause"+id);
    if (button_tag[1]!=undefined) button_tag[1].setAttribute('class', "fas fa-pause playpause"+id);
    button_tag[0].setAttribute('onclick', "pause(" + id + ")");
    if (button_tag[1]!=undefined) button_tag[1].setAttribute('onclick', "pause(" + id + ")");
    seekslider = document.getElementById("slider");
    
    seekslider.oninput = function () {
        console.log(this.value);
        track.currentTime = this.value * (track_duration/100);
    }
    track.addEventListener("ended", stop)

    setInterval(function(){
        if(running)seekslider.value = String(Number(seekslider.value)+1);
        console.log(seekslider.value);
    },track_duration*10);
}
function pause(id) {
    running = false;
    name = "";
    artist = "";
    button_tag = document.getElementsByClassName("playpause" + id)
    track = document.getElementById("audio" + id);
    track.pause();
    button_tag[0].setAttribute('class', "fas fa-play playpause"+id);
    if (button_tag[1]!=undefined) button_tag[1].setAttribute('class', "fas fa-play playpause"+id);
    button_tag[0].setAttribute('onclick', "play(" + id +","+name+","+artist+")");
    if (button_tag[1]!=undefined) button_tag[1].setAttribute('onclick', "play(" + id + ","+name+","+artist+")");
    
}
function stop() {
    pause(running_id);
    track.currentTime = 0;
    bottom.innerHTML = "";
}
