<template>
  <div v-if="currentData" class="">
    <h1>{{ currentTemerature }}</h1>
    <span>{{ currentData.weather[0].description }}</span>
  </div>
</template>

<script>
export default {
  props: {
    currentData: Object
  },
  computed: {
    currentTemperature() {
      return Math.round(this.currentData.main.temp)
    }
  }
}
</script>

<style scoped></style>
