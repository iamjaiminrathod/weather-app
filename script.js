document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherInfo = document.getElementById('weatherInfo');
    const cityNameEl = document.getElementById('cityName');
    const countryEl = document.getElementById('country');
    const weatherIconEl = document.getElementById('weatherIcon');
    const temperatureEl = document.getElementById('temperature');
    const weatherDescriptionEl = document.getElementById('weatherDescription');
    const feelsLikeEl = document.getElementById('feelsLike');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('windSpeed');

    const API_KEY = "d6c3f63d90526ee92089fde3499a9b33"; // <-- अपनी API key यहाँ डाल

    // --- Update UI ---
    const updateUI = (data) => {
        cityNameEl.textContent = data.name;
        countryEl.textContent = data.sys.country;
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescriptionEl.textContent = data.weather[0].description;
        feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidityEl.textContent = `${data.main.humidity}%`;
        windSpeedEl.textContent = `${data.wind.speed.toFixed(1)} m/s`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        weatherIconEl.innerHTML = `<img src="${iconUrl}" alt="Weather Icon" class="w-32 h-32 mx-auto">`;

        weatherInfo.style.display = "block";
    };

    // --- Fetch weather by city name ---
    const fetchWeatherByCity = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            // अगर city invalid भी है → fallback
            if (data.cod !== 200) {
                fetchWeatherByGeolocation();
                return;
            }

            updateUI(data);
        } catch (error) {
            console.error(error);
            fetchWeatherByGeolocation();
        }
    };

    // --- Fetch weather by geolocation ---
    const fetchWeatherByGeolocation = () => {
        if (!navigator.geolocation) {
            fetchWeatherByCity("Delhi");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                const response = await fetch(url);
                const data = await response.json();
                updateUI(data);
            } catch (error) {
                fetchWeatherByCity("Delhi");
            }
        }, (error) => {
            fetchWeatherByCity("Delhi");
        });
    };

    // --- Search ---
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchWeatherByCity(city);
    });

    cityInput.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            const city = cityInput.value.trim();
            if (city) fetchWeatherByCity(city);
        }
    });

    // --- Initial load ---
    fetchWeatherByGeolocation();
});
