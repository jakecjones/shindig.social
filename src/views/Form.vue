<template>
    <div class="form">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12">
          <v-text-field
            label="Name"
            color="black"
            class="form__field"
            v-model="form.name"
            :error-messages="getNameErrors"
            @blur="$v.form.name.$touch()"
          ></v-text-field>

          <v-text-field
            label="Business Name"
            color="black"
            class="form__field"
            v-model="form.businessName"
          ></v-text-field>

          <v-text-field
            label="Email"
            color="black"
            class="form__field"
            v-model="form.email"
            :error-messages="getEmailErrors"
            @blur="$v.form.email.$touch()"
          ></v-text-field>

          <v-text-field
            label="Phone"
            color="black"
            class="form__field"
            v-model="form.phoneNumber"
          ></v-text-field>

          <v-select
            label="Work with us"
            color="black"
            class="form__field"
            :items="items"
            multiple
            small-chips
            v-model="form.services"
          ></v-select>

          <v-textarea
            label="Message"
            color="black"
            class="form__field"
            auto-grow
            row-height="15"
            v-model="form.message"
          >
          </v-textarea>

        <v-btn 
        color="#000" 
        depressed
        class="form__submit"
        @click="submit"
        :loading="isSubmitting"
        >
            Submit
        </v-btn>
        </v-col>
      </v-row>

      <ThankYou :closeCallback="close" :user="form" v-if="isFormSubmitted" />
    </div>
</template>

<script>
import ThankYou from '@/components/ThankYou.vue'
import { email, required } from 'vuelidate/lib/validators';


    export default {
        data() {
            return {
                isFormSubmitted: false,
                items: ['Installations', 'Collab', 'Other'],
                isSubmitting: false,
                form: {
                  name: '',
                  businessName: '',
                  email: '',
                  phoneNumber: '',
                  services: [],
                  message: ''
                }
            }
        },
        components: {
          ThankYou
        },
        computed: {
          getNameErrors () {
              const errors = [];
              const validationObj = this.$v.form.name;
              if (!validationObj.$dirty) return errors;
              !validationObj.required && errors.push('Required');
              return errors;
          },
          getEmailErrors () {
              const errors = [];
              const validationObj = this.$v.form.email;
              if (!validationObj.$dirty) return errors;
              !validationObj.email && errors.push('Double check email formatting.');
              !validationObj.required && errors.push('Required');
              return errors;
          }
        },
        validations: {
          form: {
            email: {
              email,
              required
            },
            name: {
                required
            }
          }
        },
        methods: {
          async submit() {
            this.$v.$touch();
            if (this.$v.$pending || this.$v.$error) return;

            this.isSubmitting = true;
            await this.$store.dispatch("CREATE_SUBMISSION", this.form);
            setTimeout(() => { 
              this.isSubmitting = false;
              this.isFormSubmitted = true;
            }, 2000);
          },

          close() {
            this.isFormSubmitted = false;
          }
        }
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
            width: 180px;
            height: 40px !important;
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