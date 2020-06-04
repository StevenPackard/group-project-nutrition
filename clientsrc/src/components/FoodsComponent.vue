<template>
  <div class="foods-component container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="createFood">
          <div class="form-group">
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              placeholder="What food did you eat?"
              v-model="newFood.name"
            />
            <input
              type="number"
              name="calories"
              id="calories"
              class="form-control"
              placeholder="How many calories?"
              v-model="newFood.calories"
            />
            <input
              type="text"
              name="email"
              id="email"
              class="form-control"
              placeholder="Whats your email?"
              v-model="newFood.creatorEmail"
            />
          </div>
          <button type="submit" class="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </div>
    <div class="row">
      <ol>
        <li v-for="food in foods" :key="food.id">
          <food :food="food" />
        </li>
      </ol>
    </div>
  </div>
</template>


<script>
import Food from "./FoodComponent";
export default {
  name: "Foods",
  data() {
    return {
      newFood: {}
    };
  },
  mounted() {
    this.$store.dispatch("getFoods");
    this.$store.dispatch("getActivePost", this.$route.params.id);
  },
  computed: {
    foods() {
      return this.$store.state.foods;
    },
    post() {
      return this.$store.state.activePost;
    }
  },
  methods: {
    createFood() {
      this.$store.dispatch("createFood", { ...this.newFood });
      this.newFood = {};
    }
  },
  components: {
    Food
  }
};
</script>


<style scoped>
</style>