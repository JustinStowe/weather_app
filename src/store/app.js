// Utilities
import { defineStore } from "pinia";
import axios from "axios";

export const useAppStore = defineStore("app", {
  state: () => ({
    BasicData: null,
    AdditionalData: null,
    HourlyWeather: null,
    errorBool: false,
    city: null,
    getWeatherData: async () => {
      await axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then((response) => {
          let { lat, lon } = response.data;
          this.lat = lat;
          this.long = lon;
          this.currentData = response.data;

          // Making the second API call inside the first .then() block
          return axios.get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.VUE_APP_API_KEY}`
          );
        })
        .then((response) => {
          this.currentData = response.data;
        })
        .catch(function () {
          this.errorBool = true;
        });
    },
  }),
});
