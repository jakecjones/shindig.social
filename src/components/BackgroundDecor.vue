<template>
    <div class="background-decor">

        <img class="ellipse" src="../assets/images/ellipse.svg" alt="shindig social ellipse">
        <img class="blob" src="../assets/images/blob.svg" alt="shindig social blob">
        <img class="splatter" src="../assets/images/splatter.png" alt="shindig social blob">
        <img class="splatter-2" src="../assets/images/splatter.png" alt="shindig social blob">
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.background-decor {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    background-color: #FBF9F8;
    .ellipse {
        position: fixed;
        bottom: 50px;
        left: 0;
    }
    .blob {
        position: fixed;
        bottom: 0;
        right: 0;
    }
    .splatter {
        position: fixed;
        bottom: 30px;
        right: 0;
        width: 180px;
        mix-blend-mode: color-dodge;
    }
    .splatter-2 {
        position: fixed;
        bottom: 0;
        left: -100px;
        width: 150px;
        mix-blend-mode: color-dodge;
    }
}
</style>