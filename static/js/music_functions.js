var song_id;
var song_name;
var song_artist;
var running = false;
var track;
var btns;
var isSequalizerOn = false;
var bottom_bar;
var slider;
var total_duration;

function load(id,name,artist){
    if (!running){        
        //read all the attributes
        song_id = id;
        song_name = name;
        song_artist = artist
        track = document.getElementById('audio'+id);
        btns = document.getElementsByClassName("playpause"+id);
        bottom_bar = document.getElementById("bottom");
        total_duration = track.duration;

        //if song is running then we have add bottom bar which contains slider
        if(!isSequalizerOn){
            isSequalizerOn = true;
            bottom_bar.innerHTML = `<div class="card">
            <div class="card-body">
                <h5 class="card-title">`+song_name+`</h5>
                <p class="card-text">`+song_artist+`</p>
                <input type="range" name='slider' id='slider' min='0' max='100' value='0'><br>
                <i class="fas fa-play playpause`+song_id+`" id="playpause_id`+song_id+`"
                    onclick="load(`+song_id+`,'`+song_name+`','`+song_artist+`')"></i>
                </div>
            </div>`;

        }
        
        slider = document.getElementById("slider");
        
        //code to change the song time while slider is inputted
        slider.oninput = function(){

            track.currentTime = this.value * (total_duration/100)

        }
        //after the song is complete then wes have toreset all 
        track.addEventListener("ended",stop);

        //setinterval to change slider automatically
        setInterval(function(){
            slider.value = String(Number(slider.value)+1)
        },(total_duration*10))
        
        //call the play function to play the file
        play()

        //set running to true
        running = true;

        
    }
    else {
        //call the pause function
        pause();
        running = false;

        //if user pressed play button of other song then the code is bellow
        if (song_id != id){
            //stop the previous song
            track.currentTime = 0;
            //call load once again
            load(id,name,artist);
        }

    }

}

function play(){
    //play the song
    track.play();
    //change play to pause button
    for(var i=0;i<btns.length;i++){
        btns[i].setAttribute('class',"fas fa-pause playpause"+song_id)
    }
    //
}

function pause(){
    //pause the song
    track.pause();
    //change button to play button
    for(var i=0;i<btns.length;i++){
        btns[i].setAttribute('class',"fas fa-play playpause"+song_id)
    }
}


function stop(){
    //change the state to not running
    running = false;
    //pause because to change the button attributes
    pause();
    //start the track again
    track.currentTime = 0;
    //slider to the start
    slider.value = 0;
}