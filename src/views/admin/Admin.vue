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
                <div class="table-container">     
                    <div class="toolbar">
                        <v-btn color="primary" depressed>
                            reorder
                        </v-btn>
                        <v-btn @click="createNew = true" class="ml-2" color="primary" depressed>
                            create new
                        </v-btn>
                    </div>
                    <v-data-table 
                    :headers="headers"
                    :items="products"
                    >
                        <template v-slot:item.edit="{item}">
                            <v-btn @click="navigateTo(item)" color="primary" depressed>
                                edit
                            </v-btn>
                        </template>
                        <template v-slot:item.active="{item}">
                            <v-switch
                            v-model="item.active"
                            ></v-switch>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
        <v-dialog width="500px" v-model="createNew">
            <v-card class="pa-8">
                <v-text-field
                v-model="newProduct.name"
                label="Title"
                >
                </v-text-field>
                <v-text-field
                v-model="newProduct.description"
                label="Overview"
                >
                </v-text-field>

                <v-row>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex justify-end">
                        <v-btn @click="save" color="primary" depressed>
                            save
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                createNew: false,
                newProduct: {
                    name: '',
                    description: '',
                    active: false
                },
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
            await this.$store.dispatch('LOAD_PRODUCTS')
        },
        methods: {
            async save() {
                await this.$store.dispatch('CREATE_PRODUCT', this.newProduct);
            },
            navigateTo(product){
                this.$router.push({
                    name: 'product',
                    params: {
                        id: product.id
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
            'products'
            ])
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
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