<template>
  <div class="food-component col-6">
    <h5>{{food.name}}</h5>
    <p>{{food.calories}}</p>
    <p>{{food.creatorEmail}}</p>
  </div>
</template>


<script>
export default {
  name: "Food",
  data() {
    return {};
  },
  computed: {},
  props: ["food"],
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>