<template>
    <div class="form">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12">

          <v-text-field
            label="Name"
            color="black"
            class="form__field"
          ></v-text-field>

          <v-text-field
            label="Business Name"
            color="black"
            class="form__field"
          ></v-text-field>

          <v-text-field
            label="Email"
            color="black"
            class="form__field"
          ></v-text-field>

          <v-text-field
            label="Phone"
            color="black"
            class="form__field"
          ></v-text-field>

          <v-select
            label="Work with us"
            color="black"
            class="form__field"
            :items="items"
            multiple
            small-chips
          ></v-select>

          <v-textarea
            label="Message"
            color="black"
            class="form__field"
            auto-grow
            row-height="15"
          >
          </v-textarea>

        <v-btn 
        color="#000" 
        depressed
        class="form__submit"
        >
            Submit
        </v-btn>
        </v-col>
      </v-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: ['Installations', 'Collab', 'Other']
            }
        },
    }
</script>

<style lang="scss" scoped>
    .form {
        width: 80%;
        max-width: 350px;
        margin: 0 auto;
        &__field {
            text-transform: uppercase;
            letter-spacing: 3px;
            margin: 0;
        }
        &__submit {
            border-radius: 0;
            color: #fff;
            font-family: 'BonVivantSerifBold', serif;
            letter-spacing: 5px;
            width: 170px;
            height: 38px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 1px !important;
            margin: 1em auto;
            font-size: 16px;
        }
    }
</style>
<style lang="scss">
        .v-label {
            font-size: 12px;
            font-weight: 600;
        }
        .v-list {
            padding: 0;
        }
        .theme--light.v-chip:not(.v-chip--active) {
            background-color: #DDBFB3;
            color: #fff;
            .theme--light.v-icon {
                color: #000;
            }
        }
        .v-menu__content {
            box-shadow: unset;
            border: 1px solid #DDBFB3;
        }

</style>