<template>
  <div class="container" style="height: 100vh">
    <div class="flex">
      <div class="column-2 col-lg-4 bg-dark text-light">
        <div style="--mdb-bg-opacity: 0.7">
          <img src="@/assets/sun.png" alt="logo" />
          <p>Weather App</p>
          <hr />
        </div>
        <div>Enter the name of the city</div>
        <input
          v-model="cityName"
          type="search"
          id="searchForm"
          class="form-control"
          placeholder="City name"
          aria-label="Search"
          style="--mdb-bg-opacity: 0.3"
        />
      </div>
      <button
        type="button"
        class=""
        data-mg-ripple-color="warning"
        @click="search()"
      >
        Enter
      </button>
    </div>
    <div>
      <hr />
      <span>Made by Justin</span>
    </div>
  </div>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      cityName: null,
    };
  },
  methods: {
    search() {
      if (this.cityName != null) {
        this.$router.push("/city?city=" + this.cityName);
      }
    },
  },
};
</script>

<style scoped></style>
