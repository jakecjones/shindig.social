<template>
    <div class="admin">
        <div class="side-bar">
            <v-list class="list" rounded>
                    <v-list-item link>
                        Products
                    </v-list-item>
                    <v-list-item link>
                        Images
                    </v-list-item>
                    <v-list-item link>
                        Contacts
                    </v-list-item>
            </v-list>
            <div class="content-container">
                <div class="content-container__overflow">
                    <div class="info-card info-row" flat>
                        <v-row class="d-flex">
                            <v-col class="d-flex justify-start">
                                <v-switch
                                v-model="product.active"
                                label="Visible"
                                ></v-switch>
                            </v-col>
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
                            <v-col>
                                <v-text-field
                                v-model="product.name"
                                label="Title"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea
                                v-model="product.description"
                                label="Overview"
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-card>

                    <v-card class="pa-5 info-card" flat>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-col class="d-flex justify-end">
                                <v-btn @click="addImageDialog = true" color="primary" depressed>select image</v-btn>
                            </v-col>
                        </v-row>
                        <draggable
                        v-model="orderedImages"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        >
                            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <v-row class="mb-10" v-for="(image, index) in orderedImages" :key="index">
                                    <v-col class="d-flex align-center justify-center" cols="4">
                                        <v-img :src="image.data.url"></v-img>
                                    </v-col>
                                    <v-col class="d-flex align-center justify-center" cols="2">
                                        <v-switch
                                        v-model="image.active"
                                        label="Visible"
                                        ></v-switch>
                                    </v-col>
                                    <v-col class="d-flex align-center justify-center" cols="6">
                                        <v-text-field
                                        v-model="image.alt"
                                        label="Image Description"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </transition-group>
                        </draggable>
                    </v-card>
                </div>
            </div>
        </div>
        <v-dialog width="700px" v-model="addImageDialog">
            <v-card class="pa-5">
                <v-row>
                    <v-col 
                    class="d-flex align-center justify-center pa-1 ma-1"
                    :class="{'selected' : image.active}"
                    v-for="(image, index) in selectedImages" 
                    :key="index" 
                    cols="3"
                    @click="selectImage(image, index)"
                    >
                        <v-img :src="image.data.url"></v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex justify-end">
                        <v-btn @click="addSelectedImages" color="primary" depressed>add</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import clonedeep from 'lodash.clonedeep';

    export default {
        data() {
            return {
                selected: true,
                createNew: false,
                product: {},
                productImages: [],
                images: [],
                imagesSource: [],
                drag: false,
                orderedImages: [],
                addImageDialog: false,
                selectedImages: [],
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
        watch: {
            allImages(images){
                this.fetchOrderedImages(images);
                this.fetchSelectedImages(images);
            }
        },
        async created (){
            try {
                this.product = await this.$store.dispatch('LOAD_PRODUCT', this.$route.params.id);
                this.productImages = await this.$store.dispatch('FETCH_ALL_IMAGES'); 
            } catch (error) {
                console.log(error);
            }
        },
        components: {
            draggable
        },
        methods: {
            async save() {
                let formattedImages = this.orderedImages.map((element) => {
                    return {
                        active: element.active ? element.active : '',
                        alt: element.alt ? element.alt : '',
                        id: element.id ? element.id : ''
                    }
                })

                this.product.images = formattedImages;
                await this.$store.dispatch('UPDATE_PRODUCT', this.product);
            },
            selectImage (item, index) {
                this.selectedImages[index].active = !this.selectedImages[index].active;
            },
            async addSelectedImages () {
                let temporayImages = clonedeep(this.orderedImages);

                this.selectedImages.forEach(element => {
                    if (element.active) {
                        let newImage = {
                            alt: '',
                            active: false,
                            id: element.data.id
                        }
                        temporayImages.push(newImage);
                    }
                });
                this.product.images = temporayImages;
                await this.$store.dispatch('UPDATE_PRODUCT', this.product);
                this.fetchOrderedImages(this.allImages);
                this.fetchSelectedImages(this.allImages);
                this.addImageDialog = false;
            },
            async fetchOrderedImages(images){
                this.orderedImages = [];
                this.product.images.forEach(element => {
                    let newImage = {
                        alt: element.alt,
                        active: element.active,
                        data: images.find(findImage => element.id === findImage.id),
                        id: element.id
                    }
                    if (newImage && newImage.data) {
                        this.orderedImages.push(newImage);
                    }
                });
            },
            async fetchSelectedImages(images){
                this.selectedImages = [];
                images.forEach(element => {
                    let newImage = {
                        active: false,
                        data: images.find(findImage => element.id === findImage.id),
                    }
                    if (newImage && newImage.data) {
                        this.selectedImages.push(newImage);
                    }
                });
            },
            navigateTo(product){
                this.$router.push({
                    name: 'product',
                    params: {
                        id: product.id
                    }
                })
            },
            async upload() {
                try {
                    if (this.images && this.images.length) {
                            await this.$store.dispatch("ADD_IMAGES", {
                            images: clonedeep(this.images),
                            imageData: clonedeep(this.imagesSource),
                            id: this.product.id
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
                this.imagesSource.push({src: imageUrl, id: this.product.id, active: true, alt: ''})
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
        },
        computed: {
            ...mapGetters([
            'products',
            'allImages'
            ]),
            dragOptions () {
                return {
                    animation: 200,
                    group: 'description',
                    disabled: false,
                    ghostClass: 'ghost'
                };
            }
        }
    }
</script>

<style lang="scss" scoped>
.selected {
    border: 1px solid #333;
    background-color: #fafafa;
}
.ghost {
    opacity: 0;
}
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