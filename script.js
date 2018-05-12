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

        $.getJSON(url, function(data1) {//channels
            console.log(data1);
            
            if (!data1.error) {
                html += image + data1.logo + "'></div>";
                html += "<div class='col-auto'>";
                html += "<a href='" + data1.url + "' target='_blank'>" + data1.display_name + "</a></div>";

                url = streamsURL + id + "?callback=?";
                $.getJSON(url, function(data2) {//streams
                    
                    html += "<div class='col'>";
                    console.log(data2);

                    if (data2.stream && data2.stream !== null) {
                        html += "<span class='live light float-right'></span></div>";
                    } else {
                        html += "<span class='offline light float-right'></span></div>";
                    }
                    html += "</div>";

                    html += "<div class='row text-center moreInfo'><div class='col-12'>";
                    html += "<div><i class='fas fa-caret-down' role='button' data-toggle='collapse' data-target='#box" + i + "'></i></div>";
                    html += "</div>";//close column

                    html += "<div class='collapse text-left' id='box" + i + "'>";
                    if (data2.stream !== null) {
                        html += "<p>Stream type: " + data2.stream.stream_type + "</p>";
                        html += "<p>Stream game: " + data2.stream.game + "</p>";
                        html += "<p>Viewers: " + data2.stream.viewers + "</p>";
                        html += "<p>Avg FPS: " + Math.round(data2.stream.average_fps) + "</p>";
                    }
                    if (data1.status !== null)
                        html += "<p>Status: " + data1.status + "</p>";
                    else
                        html += "<p>Status: NONE</p>";
                    html += "<p>Followers: " + data1.followers + "</p>";
                    html += "<p>Views: " + data1.views + "</p>";
                    if (data1.game !== null)
                        html += "<p>Game: " + data1.game + "</p>";
                    else
                        html += "<p>Game: NONE</p>";
                    
                    html += "</div>";
                    html += "</div>";//close collapse row and start row

                    if (data2.stream !== null) {
                        content.prepend(html);
                    }
                    else {
                        content.append(html);
                    }
                    

                    i++;
                });//END getJSON streams

            }//ENDIF !data.error

        });//END getJSON channels
        
    });//END FOREACH channel ids

});