<template>
  <div class="post-component col-6">
    <router-link :to="{ name: 'PostDetails', params: { id: post._id }}">
      <h1>{{post.date}}</h1>
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Post",
  data() {
    return {};
  },
  computed: {},
  props: ["post"],
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>