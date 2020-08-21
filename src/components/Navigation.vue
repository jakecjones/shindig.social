<template>
    <div class="navigation">

        <div v-if="$route.name == 'navigation'" class="logo-container">
            <img src="../assets/images/shindig-social-logo.png" alt="">
        </div>
        <div v-else class="nav-bar uppercase lp-5">
            Menu 
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.navigation {
    position: relative;
    margin: 10px 0 0 0;
    .nav-bar {
        color: #000;
        position: relative;
        z-index: 999;
        top: 0;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #000;
        width: 100%;
        position: fixed;
        background-color: #FBF9F8;
    }
    .logo-container {
        width: 100%;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 9;
        margin: 1em 0;
    }
    img {
        height: 80%;
        width: auto;
    }
}
</style>