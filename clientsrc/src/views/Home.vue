<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <posts v-if="$auth.isAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script>
import Posts from "@/components/PostsComponent";
export default {
  name: "home",

  computed: {},
  components: {
    Posts
  }
};
</script>

<img alt="Vue logo" src="../assets/logo.png" />
