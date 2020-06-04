<template>
  <div class="post container-fluid">
    <div class="row">
      <div class="col">
        <foods />
      </div>
    </div>
  </div>
</template>


<script>
import Foods from "@/components/FoodsComponent";
export default {
  name: "PostDetailsPage",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getFoods", this.$route.params.id);
  },
  computed: {},
  methods: {},
  components: {
    Foods
  }
};
</script>


<style scoped>
</style>