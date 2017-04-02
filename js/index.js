var streams = ["Lolesports", "TSM_Bjergsen", "Voyboy", "ESL_SC2", "OgamingSC2", "freecodecamp", "fdwedfefcefeferf"];

var stream_data = []

var retrieved = 0

var api_base = "https://wind-bow.glitch.me/twitch-api/";

for (i=0;i<streams.length;i++) {
  Promise.coroutine(function* () {
  var name = streams[i]
  stream_data[i] =  [yield $.getJSON(api_base+"channels/"+name+"?callback=?"),  yield $.getJSON(api_base+"streams/"+name+"?callback=?")];
    
    retrieved += 1;
    if (retrieved == streams.length) {
      addStreams();
      activateButtons();
    }
    
})()

}

function addStreams() {
  for (i=0;i<stream_data.length;i++) {
    var [channel, stream] = stream_data[i];
    var name = streams[i];
    var link = "https://www.twitch.tv/"+name;
    if (channel.status === 404) {
 var logo = 'http://vignette3.wikia.nocookie.net/smite/images/a/a4/404_logo.png/revision/latest?cb=20160401175124';
 var tag = "streamOff";
 var status = "Channel Not Found";
    }
    else if (!stream.stream) {
 var logo = channel.logo;
 var tag = "streamOff";
 var status = "Offline";
    }
    else {
 var logo = channel.logo;
 var tag = "streamOn";
 var status = channel.status;
    }
    var entry = "<div class = 'channel "+tag+"'>"
    entry += "<img src='"+logo+"' class = 'icon'>"
    entry += "<div class = 'name' onclick = window.open('"+link+"')>"+name+"</div>"
    entry += "<div class = 'status'>"+status+"</div></div>"
    $("#list").append(entry);
  }
}

function activateButtons() {
  $("#off").on("click", function () {  $(".streamOn").css("display","none");
 $(".streamOff").css("display", "block"); })                                 
  $("#on").on("click", function () {  $(".streamOn").css("display","block");
 $(".streamOff").css("display", "none"); })
                                      $("#all").on("click", function () {  $(".streamOn, .streamOff").css("display","block");
})}