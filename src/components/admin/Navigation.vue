<template>
    <div class="side-bar">
        <v-list class="list" rounded>
                <v-list-item @click="navigateTo(link)" link v-for="(link, index) in navigation" :key="index">
                    {{link.name}}
                </v-list-item>
        </v-list>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                navigation: [
                    {
                        name: 'Products',
                        to: 'products'
                    },
                    {
                        name: 'images',
                        to: 'images'
                    },
                    {
                        name: 'Contacts',
                        to: 'contacts'
                    }
                ]
            }
        },
        methods: {
            navigateTo(link) {
                this.$router.push({
                    name: link.to
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .side-bar {
        position: fixed;
        width: 300px;
        height: 100%;
        background-color: #fff;
        .list {
            width: 90%;
            margin: 1em auto;
        }  
    }
</style>