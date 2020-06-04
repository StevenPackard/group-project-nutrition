import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let _api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    profile: {},
    posts: [],
    activePost: {},
    foods: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setActivePost(state, post) {
      state.activePost = post;
    },
    setFoods(state, foods) {
      state.foods = foods;
    },
  },
  actions: {
    //#region Profile Actions
    setBearer({}, bearer) {
      _api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      _api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await _api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    //#region Post Actions
    async getAllPosts({ commit, dispatch }) {
      try {
        let res = await _api.get("/posts");
        console.log(res.data.createdAt);
        let posts = res.data;
        posts.forEach((p) => {
          p.createdAt = new Date(p.createdAt).toLocaleDateString("eu-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        });
        commit("setPosts", res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getPostDetails({ commit, dispatch }, id) {
      try {
        let res = await _api.get("posts/" + id);
        commit("setActivePost", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createPost({ commit, dispatch }, post) {
      try {
        let res = await _api.post("posts", post);
        dispatch("getAllPosts");
      } catch (error) {
        console.error(error);
      }
    },
    async getActivePost({ commit, dispatch }, id) {
      try {
        let post = this.state.posts.find((p) => p.id == id);
        commit("setActivePost", post);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
    //#region Food Functions
    async getFoods({ commit, dispatch }, id) {
      try {
        let res = await _api("/posts/" + id + "/foods");
        commit("setFoods", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async createFood({ commit, dispatch }, food) {
      try {
        let res = await _api("");
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
  },
});
