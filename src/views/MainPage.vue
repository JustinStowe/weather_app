<template>
  <div class="container" style="height: 100vh">
    <div class="row p-5 h-100">
      <div
        class="col-12 col-lg-8 pe-lg-5 pb-3 pb-lg-0 d-flex flex-column justify-content-between"
      >
        <div class="row h-25 text-danger">
          <div class="h-50 d-flex">
            <router-link to="/">
              <img src="@/assets/logo.png" alt="Logo" class="h-100" />
            </router-link>
            <div v-if="currentData" class="d-flex h-100 flex-column">
              <span class="display-5 text-light ms-5 text-uppercase">{{
                currentData.name
              }}</span>
              <span class="ms-5 text-light opacity-75">{{
                getDate(currentData.dt)
              }}</span>
            </div>
          </div>
        </div>
        <div class="" style="--mdb-bg-opacity: 0.5">
          <BasicData v-if="currentData" :currentData="currentData"></BasicData>
          <HourlyWeather v-if="hourlyData" :data="hourlyData"></HourlyWeather>
        </div>
      </div>
      <div
        class="col-12 col-lg-4 bg-light text-light rounded shadow blur"
        style="--mdb-bg-opacity: 0.2"
      >
        <AdditionalData
          :currentData="currentData"
          :dailyData="dailyData"
        ></AdditionalData>
      </div>
    </div>
  </div>
</template>

<script>
import BasicData from "@/components/BasicData.vue";
import AdditionalData from "@/components/AdditionalData.vue";
import HourlyWeather from "@/components/HourlyWeather.vue";
import axios from "axios";

export default {
  components: {
    BasicData,
    AdditionalData,
    HourlyWeather,
  },
  data() {
    return {
      currentData: null,
      dailyData: null,
      hourlyData: null,
    };
  },
  async mounted() {
    if (this.$route.query.city == undefined || this.$route.query.city == null) {
      this.$router.push("/");
    } else {
      let city = this.$route.query.city;
      let errorBool = false;

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
          errorBool = true;
        });

      await axios
        .get(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&appid=" +
            process.env.VUE_APP_API_KEY +
            "&units=metric&lang=pl"
        )
        .then((response) => {
          this.dailyData = response.data;
        })
        .catch(function () {
          errorBool = true;
        });

      await axios
        .get(
          "https://api.openweathermap.org/data/3.0/onecall?lat=52.409538&lon=16.931992&exclude=current,minutely,daily,alerts&appid=" +
            process.env.VUE_APP_API_KEY +
            "&units=metric"
        )
        .then((response) => {
          this.hourlyData = response.data;
        })
        .catch(function () {
          errorBool = true;
        });

      if (errorBool) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    getDate(unix) {
      let data = new Date(unix * 1000);
      return data.toLocaleString();
    },
  },
};
</script>

<style scoped>
.blur {
  backdrop-filter: blur(10px);
}
</style>
