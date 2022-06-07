const socketProtocol =
  window.location.protocol === "https:" ? "wss:" : "ws:";
const echoSocketUrl =
  socketProtocol +
  "//" +
  window.location.hostname +
  "/Project-Nine-Audio/?username=" +
  encodeURIComponent(
    new URLSearchParams(window.location.search).get("username")
  );
const socket = new WebSocket(echoSocketUrl);

socket.onopen = () => {
  document.getElementById("title-text").innerHTML = "Connected.";
};

socket.onmessage = e => {
  var data = JSON.parse(event.data);
  if (data["action"] == "keepalive") {
    socket.send(JSON.stringify({ action: "keepalive" }));
  }
  if (data["action"] == "play") {
    playAudio();
  }
  if (data["action"] == "stop") {
    stopAudio();
  }
  if (data["action"] == "loading") {
    loading = true
    playing = false
    music = document.getElementById('music');
    music.pause();
    music.currentTime = 0;
  }
  if (data["action"] == "loaded") {
    loading = false
    music = document.getElementById('music');
    var time = music.currentTime
    music.load()
    music.playbackRate = playbackRate
    music.currentTime = time
    music.volume = 0.3
    if(playing) {
      music.play()
    }
  }
  if(data["action"] == "sync") {
    var time = parseFloat(data["time"])
    time = (time / 387.226890756)
    music = document.getElementById('music');
    if(loading) {
      music.load()
    }
    music.playbackRate = playbackRate
    music.currentTime = time
    music.volume = 0.3
    if(playing) {
      music.play()
    }
  }
};

function overlayOn() {
  document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
  document.getElementById("overlay").style.display = "none";
  /*var audio = new Audio('youtube-audio.mp3').play()
  audio.volume = 0.2*/

  /*var soundHowl = new Howl({
    src: ['youtube-audio.mp3'],
    autoplay: true,
    loop: false,
    html5: true
  });*/
}

var music = document.getElementById('music');
var loading = false
var playing = false
const playbackRate = 1

function playAudio(source) {
  playing = true;
  music = document.getElementById('music');
  music.onended = function() {
    if(loading) {
      var time = music.currentTime
      music.load()
      music.playbackRate = playbackRate
      music.currentTime = time
      music.volume = 0.3
      music.play()
    }
  };
  music.load()
  music.playbackRate = playbackRate
  music.volume = 0.3
  music.play();

}

function stopAudio() {
  music = document.getElementById('music');
  loading = false;
  playing = false;
  music.pause();
  music.currentTime = 0;
}
