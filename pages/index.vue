<template>
  <v-container>
    <v-row justify="center">
      <div class="py-5">
        <h1>Welcome to NPOS</h1>
      </div>
    </v-row>
    <v-item-group class="mx-16">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-item>
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                class="d-flex align-center justify-center"
                height="200"
                @click="topup=true"
              >
                <div class="d-flex flex-column">
                  <v-icon class="text-h1" :color="hover ? 'grey' : ''">
                    mdi-account-cash-outline
                  </v-icon>
                  <p class="text-center text-h5 font-weight-black">
                    <span :class="hover ? 'grey--text' : ''">TOP UP</span>
                  </p>
                </div>
              </v-card>
            </v-hover>
          </v-item>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-item v-slot="{ toggle }">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                class="d-flex align-center justify-center"
                height="200"
                @click="toggle"
              >
                <div class="d-flex flex-column">
                  <v-icon class="text-h1" :color="hover ? 'grey' : ''">
                    mdi-account-group-outline
                  </v-icon>
                  <p class="text-center text-h5 font-weight-black">
                    <span :class="hover ? 'grey--text' : ''">Customer Info</span>
                  </p>
                </div>
              </v-card>
            </v-hover>
          </v-item>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-item v-slot="{ toggle }">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                class="d-flex align-center justify-center"
                height="200"
                @click="toggle"
              >
                <div class="d-flex flex-column">
                  <v-icon class="text-h1" :color="hover ? 'grey' : ''">
                    mdi-account
                  </v-icon>
                  <p class="text-center text-h5 font-weight-black">
                    <span :class="hover ? 'grey--text' : ''">USERS</span>
                  </p>
                </div>
              </v-card>
            </v-hover>
          </v-item>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-item v-slot="{ toggle }">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                class="d-flex align-center justify-center"
                height="200"
                @click="toggle"
              >
                <div class="d-flex flex-column">
                  <v-icon class="text-h1" :color="hover ? 'grey' : ''">
                    mdi-account
                  </v-icon>
                  <p class="text-center text-h5 font-weight-black">
                    <span :class="hover ? 'grey--text' : ''">USERS</span>
                  </p>
                </div>
              </v-card>
            </v-hover>
          </v-item>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-item v-slot="{ toggle }">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                class="d-flex align-center justify-center"
                height="200"
                @click="toggle"
              >
                <div class="d-flex flex-column">
                  <v-icon class="text-h1" :color="hover ? 'grey' : ''">
                    mdi-account
                  </v-icon>
                  <p class="text-center text-h5 font-weight-black">
                    <span :class="hover ? 'grey--text' : ''">USERS</span>
                  </p>
                </div>
              </v-card>
            </v-hover>
          </v-item>
        </v-col>

        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-item v-slot="{ toggle }">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                class="d-flex align-center justify-center"
                height="200"
                @click="toggle"
              >
                <div class="d-flex flex-column">
                  <v-icon class="text-h1" :color="hover ? 'grey' : ''">
                    mdi-account-tie
                  </v-icon>
                  <p class="text-center text-h5 font-weight-black">
                    <span :class="hover ? 'grey--text' : ''">Employee</span>
                  </p>
                </div>
              </v-card>
            </v-hover>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <v-dialog
      v-model="topup"
      max-width="500"
    >
      <v-card class="pa-5">
        <v-card-title>
          <span>TOP UP</span>
          <v-spacer />
          <v-btn icon class="mt-n12 mr-n8" @click="topup=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                label="Email"
                value="john@vuetifyjs.com"
              />
              <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your Vuetify account
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                label="Password"
                type="password"
              />
              <v-text-field
                label="Confirm Password"
                type="password"
              />
              <span class="caption grey--text text--darken-1">
                Please enter a password for your account
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              />
              <h3 class="title font-weight-light mb-2">
                Welcome to Vuetify
              </h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider />

        <v-card-actions>
          <v-btn
            :disabled="step === 1"
            text
            @click="step--"
          >
            Back
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="step++"
          >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    topup: false,
    step: 1
  }),
  head () {
    return {
      title: 'NPOS'
    }
  }
}
</script>
