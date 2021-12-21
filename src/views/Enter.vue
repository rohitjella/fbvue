<template>
  <div class="auth">
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="10" md="4">
            <v-card elevation="4">
              <v-card-title class="justify-center"
                >Enter into games world</v-card-title
              >
              <v-alert
                dense
                outlined
                text
                type="error"
                v-if="error"
                class="mx-16"
                >{{ this.$store.state.error }}</v-alert
              >
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="mdi-email"
                    type="email"
                    color="orange accent-3"
                    v-model="email"
                    :rules="emailRules"
                    required
                  />
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    prepend-icon="mdi-lock"
                    label="Password"
                    counter
                    color="orange accent-3"
                    @click:append="show = !show"
                  />
                  <div class="text-center my-3">
                    <div class="text-center my-3">
                      <v-btn
                        rounded
                        color="orange accent-3"
                        dark
                        type="submit"
                        @click="enter"
                      >
                        Enter
                      </v-btn>
                    </div>
                  </div>
                </v-form>
                <p class="mt-2 d-flex justify-end">
                  <router-link to="/forgot-password"
                    >Forgot Password?</router-link
                  >
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    show: false,
    valid: false,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Required.",
      (v) => v.length >= 8 || "Min 8 characters",
    ],
  }),
  methods: {
    async enter(e) {
      const valid = this.$refs.form.validate();
      e.preventDefault();
      if (valid) {
        this.$store.dispatch("enter", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
  computed: {
    ...mapState(["error"]),
  },
};
</script>

<style>
</style>