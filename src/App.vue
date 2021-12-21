<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">
        <h1 class="orange--text text--accent-3">Vue Firebase</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn class="mx-1" color="orange accent-3" outlined to="/enter">
          Enter
        </v-btn>
        <v-btn text class="orange accent-3 mx-1" dark to="/join"> Join </v-btn>
      </div>
      <div v-else>
        <v-btn class="mx-1" color="red accent-3" dark @click="exit">
          Exit
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    async exit() {
      this.$store.dispatch("exit");
    },
  },
};
</script>
