<template>
  <div class="post">
    <h1>Hello From Post Details Page</h1>
  </div>
</template>


<script>
export default {
  name: "PostDetailsPage",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getPostDetails", this.$route.params.id);
  },
  computed: {
    post() {
      return this.$store.state.activePost;
    }
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>