//https://wind-bow.gomix.me/twitch-api/channels/
var channelIDs = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "OverwatchLeague"];
var channelsURL = "https://wind-bow.gomix.me/twitch-api/channels/";
var streamsURL = "https://wind-bow.gomix.me/twitch-api/streams/";
var content;
var column = "<div class='col'>";

$(document).ready(function() {
    content = $("#content");

    channelIDs.forEach(function(id) {
        var url = channelsURL + id + "?callback=?";
        var html = "<div class='row align-items-center channel'>" + column;
        var image = "<img width='60' height='60' src='";

        $.getJSON(url, function(data) {
            console.log(data);
            
            if (!data.error) {
                html += image + data.logo + "'>" + "</div>";
                html += column;
                html += data.name + "</div>";
                html += column;
                html += data.game + "</div>";
                html += column;
                html += data.views + "</div>";
                //html += "</div>";
                //content.append(html);

                url = streamsURL + id + "?callback=?";
                $.getJSON(url, function(data) {
                    
                    html += column;
                    console.log(data);

                    if (data.stream && data.stream !== null) {
                        html += "STREAMING</div>";
                    } else {
                        html += "NO</div>";
                    }

                    html += "</div>";//closes row div
                    content.append(html);

                });//END getJSON

            }//ENDIF

        });//END getJSON
        
    });//END FOREACH

});