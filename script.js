document.addEventListener('DOMContentLoaded', () => {
            // --- DOM Element References ---
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

            // --- Hardcoded Sample Data for Demonstration ---
            const sampleWeatherData = {
                name: "Lunawada",
                sys: { country: "IN" },
                main: { temp: 28, feels_like: 29, humidity: 65 },
                wind: { speed: 3.5 },
                weather: [{ description: "clear sky", icon: "01d" }]
            };

            // --- Weather Icon Mapping ---
            // Maps OpenWeatherMap icon codes to custom SVG icons
            const weatherIcons = {
                '01d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 14.5a17.5 17.5 0 1017.5 17.5A17.5 17.5 0 0032 14.5z" fill="#fcc44d" stroke="#fcc44d" stroke-miterlimit="10" stroke-width="2"></path><path d="M32 4v6M32 54v6M10.19 10.19l4.24 4.24M49.57 49.57l4.24 4.24M4 32h6M54 32h6M10.19 53.81l4.24-4.24M49.57 14.43l4.24-4.24" fill="none" stroke="#fcc44d" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Clear sky day
                '01n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M33.2 55.26a17.5 17.5 0 01-20.92-20.92A17.5 17.5 0 1033.2 55.26z" fill="#c3d4e3" stroke="#c3d4e3" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Clear sky night
                '02d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M41.5 21.5A17.5 17.5 0 0024 14a17.42 17.42 0 00-11.23 4.08 15 15 0 00-2.27 21.35A14.9 14.9 0 0022 47.5h19.5a12.5 12.5 0 000-25z" fill="#fcc44d" stroke="#fcc44d" stroke-miterlimit="10" stroke-width="2"></path><path d="M22 47.5a15 15 0 0014.28-10.63 12.5 12.5 0 00-1-5.37A17.5 17.5 0 0024 14a17.42 17.42 0 00-11.23 4.08 15 15 0 00-2.27 21.35A14.9 14.9 0 0022 47.5z" fill="#e6effc"></path><path d="M22 47.5a15 15 0 0014.28-10.63 12.5 12.5 0 00-1-5.37A17.5 17.5 0 0024 14a17.42 17.42 0 00-11.23 4.08 15 15 0 00-2.27 21.35A14.9 14.9 0 0022 47.5z" fill="none" stroke="#e6effc" stroke-linejoin="round" stroke-width="2"></path><path d="M41.5 22.5a12.5 12.5 0 00-12.22 9.87A15 15 0 0022 47.5h19.5a12.5 12.5 0 000-25z" fill="none" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Few clouds day
                '02n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22.5 25.5a17.5 17.5 0 00-3.22 21.22A14.9 14.9 0 0031 54.5h13.5a12.5 12.5 0 10-1-25 12.42 12.42 0 00-6.5.21A17.5 17.5 0 0022.5 25.5z" fill="#c3d4e3" stroke="#c3d4e3" stroke-miterlimit="10" stroke-width="2"></path><path d="M31 54.5a15 15 0 0013.78-10.63A12.5 12.5 0 0038 29a12.42 12.42 0 00-6.5.21 17.5 17.5 0 00-21.22 3.22A14.9 14.9 0 0031 54.5z" fill="#e6effc"></path><path d="M31 54.5a15 15 0 0013.78-10.63A12.5 12.5 0 0038 29a12.42 12.42 0 00-6.5.21 17.5 17.5 0 00-21.22 3.22A14.9 14.9 0 0031 54.5z" fill="none" stroke="#e6effc" stroke-linejoin="round" stroke-width="2"></path><path d="M44.5 29.5a12.5 12.5 0 10-12.22 9.87A15 15 0 0031 54.5h13.5a12.5 12.5 0 000-25z" fill="none" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Few clouds night
                '03d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#e6effc" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Scattered clouds day
                '03n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#e6effc" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Scattered clouds night
                '04d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#e6effc" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M37.48 40.54A10.5 10.5 0 0028 27.27a14.9 14.9 0 00-14.2 8.23h-.29a10 10 0 000 20h34.5a10 10 0 00.4-20h-.32a10.49 10.49 0 00-10.11 5.04z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Broken clouds day
                '04n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#e6effc" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M37.48 40.54A10.5 10.5 0 0028 27.27a14.9 14.9 0 00-14.2 8.23h-.29a10 10 0 000 20h34.5a10 10 0 00.4-20h-.32a10.49 10.49 0 00-10.11 5.04z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Broken clouds night
                '09d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M24 45.5v5M32 45.5v5M40 45.5v5" fill="none" stroke="#4a90e2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Shower rain day
                '09n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M24 45.5v5M32 45.5v5M40 45.5v5" fill="none" stroke="#4a90e2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Shower rain night
                '10d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M41.5 21.5a17.5 17.5 0 00-30.73 10.85A14.9 14.9 0 0022 47.5h19.5a12.5 12.5 0 000-25z" fill="#e6effc" stroke="#e6effc" stroke-miterlimit="10" stroke-width="2"></path><path d="M41.5 21.5a17.5 17.5 0 00-30.73 10.85A14.9 14.9 0 0022 47.5h19.5a12.5 12.5 0 000-25z" fill="none" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M24 45.5v5M32 45.5v5" fill="none" stroke="#4a90e2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Rain day
                '10n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22.5 25.5a17.5 17.5 0 00-3.22 21.22A14.9 14.9 0 0031 54.5h13.5a12.5 12.5 0 10-1-25 12.42 12.42 0 00-6.5.21A17.5 17.5 0 0022.5 25.5z" fill="#e6effc" stroke="#e6effc" stroke-miterlimit="10" stroke-width="2"></path><path d="M31 54.5a15 15 0 0013.78-10.63A12.5 12.5 0 0038 29a12.42 12.42 0 00-6.5.21 17.5 17.5 0 00-21.22 3.22A14.9 14.9 0 0031 54.5z" fill="none" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M27 50.5v5M35 50.5v5" fill="none" stroke="#4a90e2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Rain night
                '11d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M30 46.5l-4 6h16l-4-6" fill="#fcc44d" stroke="#fcc44d" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Thunderstorm day
                '11n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M30 46.5l-4 6h16l-4-6" fill="#fcc44d" stroke="#fcc44d" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Thunderstorm night
                '13d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M29 42.5l-3 3 3 3M35 42.5l-3 3 3 3M23 48.5l3 3-3 3M32 51.5l-3 3 3 3M41 48.5l-3 3 3 3M32 45.5l3-3-3-3" fill="none" stroke="#e6effc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Snow day
                '13n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A14.91 14.91 0 0013 31.5H12a10 10 0 000 20h34.5a10 10 0 000-20z" fill="#a5b8d2" stroke="#a5b8d2" stroke-linejoin="round" stroke-width="2"></path><path d="M29 42.5l-3 3 3 3M35 42.5l-3 3 3 3M23 48.5l3 3-3 3M32 51.5l-3 3 3 3M41 48.5l-3 3 3 3M32 45.5l3-3-3-3" fill="none" stroke="#e6effc" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>`, // Snow night
                '50d': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M17 25.5h30M17 32.5h30M17 39.5h30" fill="none" stroke="#a5b8d2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Mist day
                '50n': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M17 25.5h30M17 32.5h30M17 39.5h30" fill="none" stroke="#a5b8d2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></path></svg>`, // Mist night
            };

            // --- Functions ---
            const updateUI = (data) => {
                cityNameEl.textContent = data.name;
                countryEl.textContent = data.sys.country;
                temperatureEl.textContent = `${Math.round(data.main.temp)}°`;
                weatherDescriptionEl.textContent = data.weather[0].description;
                feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°`;
                humidityEl.textContent = `${data.main.humidity}%`;
                windSpeedEl.textContent = `${data.wind.speed.toFixed(1)} m/s`;
                
                // Set weather icon
                const iconCode = data.weather[0].icon;
                weatherIconEl.innerHTML = weatherIcons[iconCode] || weatherIcons['01d']; // Fallback to clear sky icon
            };

            // --- Simulate Search Functionality ---
            const simulateSearch = () => {
                const city = cityInput.value.trim();

                // Use a copy of the sample data
                const displayData = JSON.parse(JSON.stringify(sampleWeatherData));

                if (city) {
                    displayData.name = city;
                    // Randomize data slightly to make it look dynamic
                    displayData.main.temp = Math.round(15 + Math.random() * 15); // Temp between 15 and 30
                    displayData.main.feels_like = displayData.main.temp - Math.round(Math.random() * 4);
                    displayData.main.humidity = Math.round(50 + Math.random() * 40); // Humidity between 50 and 90
                    displayData.wind.speed = (2 + Math.random() * 8).toFixed(1);
                    const iconKeys = Object.keys(weatherIcons);
                    displayData.weather[0].icon = iconKeys[Math.floor(Math.random() * iconKeys.length)];
                    displayData.weather[0].description = "mixed conditions";
                }
                 updateUI(displayData);
            };
            
            // --- Event Listeners ---
            searchBtn.addEventListener('click', simulateSearch);

            cityInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    simulateSearch();
                }
            });

            // --- Initial Load ---
            // Display the default hardcoded weather on startup
            updateUI(sampleWeatherData);
        });