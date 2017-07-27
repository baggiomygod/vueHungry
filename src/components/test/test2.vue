<template>
    <div>
        <cartcontrol @add="addFood" :food="food"></cartcontrol>
    </div>
</template>
<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
    data() {
        return {
            food: {
                count: 1,
                price: 1
            }
        };
    },
    components: {
        cartcontrol
    },
    methods: {
        addFood(target) {
            // console.log(target);
            // alert('test2 add ...');
            window.alert(1);
        }
    }
};
</script>


