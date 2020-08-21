<template>
    <div class="navigation">
        <div class="navigation__container">
            <div class="navigation__links">
                <div 
                v-for="(link, index) in links" 
                :key="index" 
                class="link primary-text uppercase lp-5"
                @click="routeTo(link)"
                >
                    <span class="link__number lp-0">{{formatNumber(index)}}</span>{{link.text}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                links: [
                    {
                        text: 'Set Rentals',
                        to: '/rentals'
                    },
                    {
                        text: 'Custom Designs',
                        to: '/custom-designs'
                    },
                    {
                        text: 'Work With Us',
                        to: '/contact'
                    }
                ]
            }
        },
        methods: {
            formatNumber(val){
                if (val < 9) {
                    return `0${val + 1}`;
                } else {
                    return val + 1;
                }
            },
            routeTo(link) {
                this.$router.push(link.to);
            }
        }
    }
</script>

<style lang="scss" scoped>
 .navigation {
     position: relative;
     color: #000;

     &__container {
         margin: 1em 0 0 0;
     }
     &__links {
         margin-left: 18%;
         width: 82%;

         .link {
             font-size: 22px;
             display: flex;
             padding: 0 0 8px 0;
             border-bottom: 1px solid #000;
             margin: 1em 0 0 0;
            &__number {
                font-size: 12px;
                margin: 5px 10px 0 0;
            }
         }

     }
 }
</style>