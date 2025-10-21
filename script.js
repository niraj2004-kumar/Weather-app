
async function getWeather(city) {
  try {
 
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];
    console.log(`Coordinates for ${name}:`, latitude, longitude);

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    if (!weatherData.current_weather) {
      alert("No weather data found!");
      return;
    }

    const data = weatherData.current_weather;

    document.querySelector("#place").innerText = `${name}, ${country}`;
    document.querySelector("#temp").innerText = `${data.temperature} °C`;
    document.querySelector("#feels_like").innerText = `${data.temperature} °C`; // no feels_like in this API
    document.querySelector("#wind_degrees").innerText = `${data.winddirection}°`;


  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong. Check console.");
  }
}

// Search button functionality
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city");
  const submitBtn = document.getElementById("submit");

  // Default city
  getWeather("Delhi");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  });
});
