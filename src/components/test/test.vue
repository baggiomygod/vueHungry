<template>
    <button @click="badd" class="btn">
        test......</button>
</template>
<script>
export default {
    methods: {
        badd() {
            console.log('test add ...');
            this.$emit('badd', '123');
        }
    }
};
</script>
<style>
.btn {
    position: fixed;
    width: 50px;
    height: 20px;
    top: 150px;
    left: 50%;
}
</style>

