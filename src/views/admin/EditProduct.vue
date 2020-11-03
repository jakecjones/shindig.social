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
                            <v-file-input
                            label="Select Images"
                            v-model="images" 
                            @change="uploadImages"
                            multiple 
                            accept="image/png, image/jpeg"
                            >

                            </v-file-input>
                        </v-row>
                        <draggable
                        v-model="imagesSource"
                        v-bind="dragOptions"
                        @start="drag = true"
                        @end="drag = false"
                        >
                            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <v-row v-for="(image, index) in imagesSource" :key="index">
                                    <v-col cols="4">
                                        <v-img :src="image.src"></v-img>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-switch
                                        v-model="image.active"
                                        label="Visible"
                                        ></v-switch>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

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
            this.product = await this.$store.dispatch('LOAD_PRODUCT', this.$route.params.id)
        },
        components: {
            draggable
        },
        methods: {
            async save() {
                await this.$store.dispatch('UPDATE_PRODUCT', this.product);
            },
            navigateTo(product){
                this.$router.push({
                    name: 'product',
                    params: {
                        id: product.id
                    }
                })
            },
            uploadImages(images){
            const fileReader = new FileReader()
            this.imagesSource = [];
            
            fileReader.addEventListener('load', () => {
                const imageUrl = fileReader.result
                this.imagesSource.push({src: imageUrl})
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
            }
            },
        },
        computed: {
            ...mapGetters([
            'products'
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