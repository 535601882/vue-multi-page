<template>
    <div class="box">
        <div>上</div>
        <div><router-view/></div>
        <div>下</div>
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
    flex-direction: column;
    min-height: 100vh;
    >div{
        &:first-child{
            background: #dadada;
            height: 50px;
        }
        &:nth-child(2){
            background: #fff;
            flex:1;
            height: calc(100vh - 100px);
        }
        &:last-child{
            background: #dadada;
            height: 50px;
        }
    }
}
</style>
