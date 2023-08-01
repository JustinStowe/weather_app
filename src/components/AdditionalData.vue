<template>
  <div v-if="currentData" class="">
    <!--search bar --->
    <div>
      <div>
        <input
          type="search"
          placeholder="Enter City name..."
          aria-label="Search"
          aria-describedby="search"
        />
        <span class="" id="search">
          <i> class=""</i>
        </span>
      </div>
      <hr />

      <!-- Additional Weather data -->
      <div class="row">
        <div>
          <p>Visibility</p>
          <p>Humidity</p>
          <p>Pressure</p>
          <p>Wind Speed</p>
          <p>Cloudy</p>
        </div>
        <div>
          <p>{{ Math.round(currentData.main.feels_like) }}</p>
          <p>{{ Math.round(currentData.main.humidity) }} %</p>
          <p>{{ currentData.main.pressure }} mbar</p>
          <p>{{ parseFloat(currentData.wind.speed * 3.6).toFixed(1) }} km/h</p>
          <p>{{ currentData.clouds.all }}%</p>
        </div>
        <hr />
      </div>
    </div>

    <!--Sunrise and sunset data -->
    <div>
      <!-- 5 days weather graph -->
      <div v-if="dailyData" class="">
        <WeekChart :data="dailyData"></WeekChart>
      </div>

      <hr />
      <div class="">
        <div class="">
          {{ getTime(currentData.sys.sunrise) }}
        </div>
        <div>
          {{ getTIme(currentData.sys.sunset) }}
        </div>
      </div>
      <div class="">
        <div class="" role="progressbar" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="">Sunrise</div>
      <div>Sunset</div>
    </div>
  </div>
</template>

<script>
import WeekChart from '@/components/WeekChart.vue'

export default {
  components: {
    WeekChart
  },
  props: {
    currentData: Object,
    dailyData: Object
  },
  computed: {
    progressPercent() {
      let currentMinutes = new Date().getHours() * 60 + new Date().getMinutes()
      let sunsetMinutes =
        new Date(this.currentData.sys.sunset * 1000).getHours() * 60 +
        new Date(this.currentData.sys.sunset).getMinutes()
      return Math.round((currentMinutes / sunsetMinutes) * 100)
    }
  },
  methods: {
    getTime(unix) {
      let data = new Date(unix * 1000)
      return data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }
}
</script>

<style scoped></style>
