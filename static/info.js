function getCurrentTime() {
    const date = new Date();
    const options = {
      timeZone: "Europe/Helsinki",
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false //
    };
    document.getElementById('time').innerText = "Time: "+date.toLocaleTimeString('en-US', options)
  }

function lastfm() {
    const url = 'https://api.julimiro.eu/lastfmproxy.php';
    fetch(url)
    .then(response => response.json())
    .then(data => {
    const recenttracks = data.recenttracks;
    const tracks = recenttracks.track;
    for (const track of tracks) {
      if (track["@attr"] && track["@attr"].nowplaying === "true") {
        const artist = track.artist["#text"];
        const song = track.name;
        const songUrl = track.url;

        console.log(`Artist: ${artist}`);
        console.log(`Song: ${song}`);
        console.log(`Song URL: ${songUrl}`);
        document.getElementById('song').innerHTML  = `<p>Now playing: <a href="${songUrl}"<b>${song}</b> by ${artist}</a></p>`
      } else {
        // document.getElementById('song').innerText = ""
      }}
  })
  .catch(error => console.error('Error:', error));
}

function getweather() {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast';
const params = {
  latitude: 61.4833,
  longitude: 21.7833,
  current: 'temperature_2m,precipitation,weather_code,wind_speed_10m',
  timeformat: 'unixtime',
  forecast_days: 1
};

fetch(`${apiUrl}?${new URLSearchParams(params)}`)
  .then(response => response.json())
  .then(data => {
    const weatherCodes = [
      "unknown", "clearing","unknown","clouds forming","smoke","haze", 
      "dust","dust","dust whirls","duststorm","mist","patches of fog","continuous fog", 
      "visible lightning", "precipitation that doesn't reach ground","precipitation at distance", 
      "precipitation nearby","thunderstorm but no precipitation","squalls","funnel clouds", 
      "drizzle","rain","snow","rain and snow/ice pellets","freezing rain","showers of rain",  
      "showers of snow", "showers of hail","fog","thunderstorm","decreasing slight dust storm", 
      "slight dust storm","beginning severe dust storm","decreasing severe dust storm", 
      "severe dust storm","beginning severe dust storm","blowing snow below eye level",  
      "heavy drifting snow below eye level", "blowing snow above eye level",  
      "heavy drifting snow above eye level", "fog at distance","fog in patches",  
      "lessening fog with visible sky", "lessening fog without visible sky","fog with sky visible",  
      "fog without sky visible", "beginning fog with sky visible","beginning fog without sky visible",  
      "fog with rime and sky visible","fog with rime and without sky visible",  
      "sligth intermittent drizzle", "slight continuous drizzle", "moderate intermittent drizzle", 
      "moderate continuous drizzle", "heavy intermittent drizzle", "heavy continuous drizzle", 
      "slight freezing drizzle", "moderate or heavy freezing drizzle", "slight drizzle and rain", 
      "moderate or heavy drizzle and rain", "slight intermittent rain", "slight continuous rain", 
      "moderate intermittent rain", "moderate continuos rain","heavy intermittent rain", 
      "heavy continous rain", "slight freezing rain","moderate or heavy freezing rain", 
      "slight rain and snow", "moderate or heavy rain and snow", "slight intermittent snowfall", 
      "slight continuous snowfall", "moderate intermittent snowfall", "moderate continuous snowfall", 
      "heavy intermittent snowfall", "heavy continuous snowfall", "diamond dust", "snow grains", 
      "star-like crystals of snow"," ice pellets", "slight rain showers", "moderate or heavy rain showers", 
      "violent rain showers", "slight showers of rain and snow", "moderate or heavy showers of snow and rain", 
      "slight snow showers", "moderate or heavy snow showers", "slight showers of small hail",  
      "moderate or heavy small hail","slight showers of hail", "moderate or heavy showers of hail", 
      "slight rain with thunderstorms earlier", "moderate or heavy rain with thunderstorms earlier", 
      "slight snow or rain and hail mixed, thunderstorms earlier", 
      "moderate or heavy rain or snow and hail mixed, thunderstorms earlier", 
      "slight or moderate thunderstorm without hail","slight or moderate thunderstorm with hail", 
      "heavy thunderstorm with rain or snow", "heavy thunderstorm with duststorm", "heavy thunderstorm with hail" 
    ];

    const currentWeatherCode = data.current.weather_code;
    const currentWeather = weatherCodes[currentWeatherCode - 1];

    console.log(`Current Weather: ${currentWeather}`);
    console.log(`Temperature: ${data.current.temperature_2m}°C`);
    console.log(`Precipitation: ${data.current.precipitation} mm`);
    console.log(`Wind Speed: ${data.current.wind_speed_10m} km/h`);
    document.getElementById('weather').innerHTML  = `<p>Weather: ${currentWeather}</p><p>Temperature: ${data.current.temperature_2m}°C</p><p>Wind speed: ${data.current.wind_speed_10m} m/s`
  })
  .catch(error => console.error('Error:', error));
}

window.addEventListener('load', function () {
    setInterval(getCurrentTime, 1000);
    setInterval(lastfm, 15000);
    setInterval(lastfm, 300000);
    lastfm()
    getCurrentTime()
    getweather()
})