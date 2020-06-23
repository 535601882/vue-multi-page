<template>
    <div class="box">
        <div>左</div>
        <div><router-view/></div>
        <div>右</div>
    </div>
</template>

<script>
    export default {
        name: "layout",
        components: {},
        data() {
            return {}
        },
        computed: {},
        created() {

        },
        methods: {},
        mounted() {

        },
    }
</script>

<style scoped lang="scss">
.box{
    display: flex;
    justify-content: space-between;
    height: 100vh;
    >div{
        &:first-child{
            background: #dadada;
            width: 50px;
        }
        &:nth-child(2){
            background: #fff;
            flex: 1;
        }
        &:last-child{
            background: #dadada;
            width: 50px;
        }
    }
}
</style>
