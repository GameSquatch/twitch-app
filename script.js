//https://wind-bow.gomix.me/twitch-api/channels/
var channelIDs = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "OverwatchLeague", "JennaJulien"];
var channelsURL = "https://wind-bow.gomix.me/twitch-api/channels/";
var streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";
var content;
var column = "<div class='col'>";

$(document).ready(function() {
    var i = 0;
    content = $("#content");

    channelIDs.forEach(function(id) {
        var url = channelsURL + id + "?callback=?";
        var html = "<div class='row align-items-center channel'><div class='col-2'>";
        var image = "<img src='";

        $.getJSON(url, function(data) {//channels
            console.log(data);
            
            if (!data.error) {
                html += image + data.logo + "'></div>";
                html += "<div class='col-auto'>";
                html += data.name + "</div>";

                url = streamsURL + id + "?callback=?";
                $.getJSON(url, function(data) {//streams
                    
                    html += "<div class='col'>";
                    console.log(data);

                    if (data.stream && data.stream !== null) {
                        html += "<span class='live light float-right'></span></div>";
                    } else {
                        html += "<span class='offline light float-right'></span></div>";
                    }
                    html += "</div>";

                    html += "<div class='row text-center'><div class='col-12'>";
                    html += "<div><i class='fas fa-caret-down' role='button' data-toggle='collapse' data-target='#box" + i + "'></i></div>";
                    html += "</div>";//close column

                    html += "<div class='collapse text-left' id='box" + i + "'>This will have additional info about the channel soon.</div>";
   
                    html += "</div>";//close collapse row and start row
                    content.append(html);

                    i++;
                });//END getJSON streams

            }//ENDIF !data.error

        });//END getJSON channels
        
    });//END FOREACH channel ids

});