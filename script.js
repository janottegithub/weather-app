window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree  = document.querySelector('.temperature-degree');
    let locationTimezone   = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan  = document.querySelector('.temperature span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           console.log(position);
           long = position.coords.longitude;
           lat  = position.coords.latitude;

           const proxy = "http://cors-anywhere.herokuapp.com/";
           const api = `${proxy}https://api.darksky.net/forecast/d93a135c6ef265ce3cc0fd44fb1def8e/${lat},${long}`;

        
    fetch(api)
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        console.log(data);
        const {temperature, summary, icon} = data.currently;
        console.log(temperature);

        // set Dom elements from the api
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        //formula for celsius
        let celsius = (temperature - 32)*(5/9);
        //set icon
        setIcons(icon, document.querySelector(".icon"));

        // change temperature in F
        temperatureSection.addEventListener('click', ()=>{
        if(temperatureSpan.textContent=== "F"){
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
            }else{
            temperatureSpan.textContent= "F";
            temperatureDegree.textContent =temperature;

            }    
            });
        });  
    });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});