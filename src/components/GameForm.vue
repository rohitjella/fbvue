<template>
  <div class="game-form">
    <v-btn @click="dialog = !dialog" v-if="!game" dark color="teal accent-3"
      >Add new game</v-btn
    >
    <v-btn @click="dialog = !dialog" v-else dark color="orange accent-3"
      >Edit game</v-btn
    >

    <v-dialog v-model="dialog" persistent width="600px">
      <v-card>
        <v-card-title
          ><span v-if="!game">Add New Game</span> <span v-else>Edit Game</span>

          <v-spacer></v-spacer>
          <v-btn
            color="red accent-3"
            @click="dialog = false"
            fab
            dark
            x-small
            elevation="5"
            >X</v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" lazy-validation ref="form">
            <v-text-field
              v-model="title"
              :rules="fieldRules"
              label="Game Title"
              required
              prepend-icon="mdi-format-title"
              color="orange accent-3"
            ></v-text-field>
            <v-text-field
              v-model="developer"
              :rules="fieldRules"
              label="Game Developer"
              prepend-icon="mdi-account"
              color="orange accent-3"
              required
            ></v-text-field>
            <v-text-field
              v-model="publisher"
              :rules="fieldRules"
              label="Game Publisher"
              prepend-icon="mdi-account-tie"
              color="orange accent-3"
              required
            ></v-text-field>
            <v-textarea
              v-model="description"
              :rules="fieldRules"
              label="Game Description"
              prepend-icon="mdi-subtitles"
              color="orange accent-3"
              required
            ></v-textarea>
            <v-file-input
              :rules="rules"
              accept="image/png, image/jpeg, image/bmp"
              label="Avatar"
              v-model="file"
              show-size
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              color="orange accent-3"
              required
            ></v-file-input>
            <div class="text-center my-3">
              <v-btn
                rounded
                color="orange accent-3"
                dark
                @click="add"
                :loading="isLoading"
                v-if="!game"
              >
                Add
              </v-btn>
              <v-btn
                rounded
                color="orange accent-3"
                dark
                @click="edit"
                :loading="isLoading"
                v-else
              >
                Update
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { gamesCollection, auth, storage } from "../firebase";
export default {
  name: "GameForm",
  props: ["game", "index"],
  data() {
    return {
      isLoading: false,
      valid: false,
      dialog: false,
      title: "",
      developer: "",
      publisher: "",
      description: "",
      file: null,
      fieldRules: [(v) => !!v || "this field is required"],
      rules: [
        (v) =>
          !v || v.size < 2000000 || "Avatar size should be less than 2 MB!",
      ],
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    async add() {
      try {
        this.isLoading = true;

        //upload file
        const fileRef = "uploads/games/" + this.file.name;
        const snapshot = await storage.ref(fileRef).put(this.file);

        let data = {
          userId: auth.currentUser.uid,
          title: this.title,
          developer: this.developer,
          publisher: this.publisher,
          description: this.description,
          image: fileRef,
        };
        const doc = await gamesCollection.add(data);

        await this.resetForm();
        this.isLoading = false;
        this.dialog = false;
      } catch (e) {
        console.log(e);
      }
    },
    async edit() {
      try {
        this.isLoading = true;

        //upload file
        // const fileRef = "uploads/games/" + this.file.name;
        // const snapshot = await storage.ref(fileRef).put(this.file);

        let data = {
          userId: auth.currentUser.uid,
          title: this.title,
          developer: this.developer,
          publisher: this.publisher,
          description: this.description,
          // image: fileRef,
        };
        const doc = await gamesCollection.doc(this.game.id).update(data);

        await this.resetForm();
        this.isLoading = false;
        this.dialog = false;
        alert("Game is updated!");
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    if (this.game) {
      this.title = this.game.title;
      this.publisher = this.game.publisher;
      this.developer = this.game.developer;
      this.description = this.game.description;
    }
  },
};
</script>

<style>
</style>