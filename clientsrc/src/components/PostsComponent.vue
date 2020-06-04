<template>
  <div class="posts-component container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="col-6 d-flex justify-content-center">
        <form class="form-inline" @submit.prevent="createPost">
          <div class="form-group">
            <input
              type="text"
              name="date"
              id="date"
              class="form-control"
              placeholder="What day did you eat?"
              v-model="newPost.date"
            />
          </div>
          <button type="submit" class="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <post v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>


<script>
import Post from "./PostComponent";
export default {
  name: "Posts",
  data() {
    return {
      newPost: {}
    };
  },
  mounted() {
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", { ...this.newPost });
      this.newPost = {};
    }
  },
  components: {
    Post
  }
};
</script>


<style scoped>
</style>