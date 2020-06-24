<template>
    <div class="thank-you">
        <div class="overlay" :class="{'overlay-active' : isActive}">
            <div class="close" @click="close"> x </div>
                <v-col class="overlay__content">
                    <div class="overlay__name">
                        Thank you
                    </div>
                    <div class="overlay__text">
                        {{user.name}}, we will get back to you very soon.
                    </div>
                    <a href="https://www.instagram.com/shindigsocial" target="_blank">
                        <v-row>
                            <v-col class="overlay__link">
                                Check out our instagram
                                <img class="insta-logo ml-4" src="../assets/images/instagram.svg">
                            </v-col> 
                        </v-row>
                    </a>

                </v-col>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false
            }
        },
        created () {
            setTimeout(() => { 
              this.isActive = true;
            }, 100);
        },
        props: ['closeCallback', 'user'],
        methods: {
            close() {
                this.closeCallback();
            }
        } 
    }
</script>

<style lang="scss" scoped>
.thank-you {

    .overlay {
        width: 90%;
        height: 0%;
        left: 5%;
        top: 5%;
        position: fixed;
        background-color: #fff;
        z-index: 99;
        opacity: 0;
        transition: all .4s cubic-bezier(0.50, 0, 0.75, 0.7);
        box-shadow: 4px 4px 20px rgba(214, 214, 214, 0.25);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        .close {
            position: absolute;
            right: 0;
            top: 0;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
        }
        &__content {
            margin-top: 180px;
        }
        &__name {
            color: #000;
            font-size: 22px;
            font-family: 'Bon Vivant Serif Bold', serif;
            letter-spacing: 5px;
            text-transform: uppercase;
            padding-bottom: 2em;
            border-bottom: 1px solid #000;
            max-width: 350px;
            margin: 0 auto;
        }
        &__text {
            color: #000;
            font-size: 18px;
            font-family: 'Bon Vivant Serif Bold', serif;
            letter-spacing: 3px;
            padding-top: 2em;
            max-width: 350px;
            margin: 0 auto;
        }
        &__link {
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 3px;
            margin: 3em auto;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .insta-logo {
            width: 20px;
            margin-top: -1px;
        }
    }
    .overlay-active {
        height: 90%;
        opacity: 1;
    }
}
</style>