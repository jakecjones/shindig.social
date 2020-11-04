<template>
    <div class="admin">
            <Navigation />
            <div class="content-container">
                <div class="content-container__overflow">
                    <div class="info-card info-row" flat>
                        <v-row class="d-flex">
                            <v-spacer></v-spacer>
                            <v-col class="d-flex justify-end">
                                <v-btn @click="save" color="primary" depressed>
                                    save
                                </v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    <v-card class="pa-5 info-card" flat>
                        <v-row>
                            <v-file-input
                            label="Select Images"
                            v-model="images" 
                            @change="addImages"
                            multiple 
                            accept="image/png, image/jpeg"
                            >

                            </v-file-input>
                        </v-row>
                        <v-row >
                            <v-col cols="3" v-for="(image, index) in imagesSource" :key="index">
                                <v-img :src="image.src"></v-img>
                            </v-col>
                        </v-row>
                    </v-card>
                    <v-card class="pa-5 info-card" flat>
                        <v-row>
                            <v-col cols="3" class="d-flex justify-center align-center" v-for="(image, index) in orderedImages" :key="index">
                                <v-img width="90%" :src="image.url"></v-img>
                            </v-col>
                        </v-row>
                    </v-card>
                </div>
            </div>
    </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep';
import { mapGetters } from 'vuex';
import orderBy from 'lodash.orderby';
import Navigation from '@/components/admin/Navigation';

    export default {
        data() {
            return {
                createNew: false,
                product: {},
                images: [],
                imagesSource: [],
                drag: false,
                headers: [
                    {
                        text: 'Visible',
                        value: 'active',
                        align: 'left',
                        width: '100px'
                    },
                    {
                        text: 'Title',
                        value: 'name',
                    },
                    {
                        value: 'edit',
                        align: 'right'
                    }
                ],
                items: [
                    {
                        name: 'The Boho Fence',
                        active: false
                    },
                    {
                        name: 'Chic Love',
                        active: true
                    }
                ]
            }
        },
        async created (){
            try {
                await this.$store.dispatch('FETCH_ALL_IMAGES'); 
            } catch (error) {
                console.log(error);
            }
        },
        computed: {
            orderedImages(){
                return orderBy(this.allImages, 'createdAt', 'desc')
            },
            ...mapGetters([
            'allImages'
            ])
        },
        components: {
            Navigation
        },
        methods: {
            async save() {
                this.upload();
            },
            async upload() {
                this.productImages = [];

                try {
                    if (this.images && this.images.length) {
                            await this.$store.dispatch("ADD_IMAGES", {
                            images: clonedeep(this.images),
                            imageData: clonedeep(this.imagesSource)
                        })
                        this.images = [];
                        this.imagesSource = [];
                    }
                } catch (error) {
                    console.log(error);
                }

            },
            addImages(images){
            const fileReader = new FileReader()
            this.imagesSource = [];
            
            fileReader.addEventListener('load', () => {
                const imageUrl = fileReader.result
                this.imagesSource.push({src: imageUrl, active: true, alt: ''})
            })

            const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

            this.asyncForEach(images, async (image) => {
                await waitFor(1000);
                fileReader.readAsDataURL(image);
            })
            },
            async asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
                console.log(this.images)
            }
            },
        }
    }
</script>

<style lang="scss" scoped>
.admin {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fafafa;
    z-index: 9;

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
    .content-container {
        position: fixed;
        width: calc(100% - 300px);
        height: 100%;
        top: 0;
        left: 300px;
        right: 0;
        bottom: 0;

        &__overflow {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            overflow-y: auto;
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 20px 0;
        }
        .info-card {
            width: 80%;
            margin-top: 50px;
        }
        .info-row {
            height: 50px;
        }
        .table-container {
            width: 80%;
            margin-top: 80px;
        }
        .toolbar {
            margin: 10px auto;
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
}
</style>