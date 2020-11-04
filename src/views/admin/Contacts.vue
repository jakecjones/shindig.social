<template>
    <div class="admin">
        <Navigation />
            <div class="content-container">
                <div class="content-container__overflow">
                    <v-card class="pa-5 info-card" flat>
                        coming soon
                    </v-card>
                </div>
            </div>
    </div>
</template>

<script>
import Navigation from '@/components/admin/Navigation';

    export default {
        components: {
            Navigation
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