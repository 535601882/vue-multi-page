<template>
    <div>
        <h1>index home</h1>
        <h2>{{welcome}}</h2>
        <p><router-link :to="{ name: 'About'}">跳转index about</router-link></p>
        <p><a href="/admin.html#/">admin首页</a></p>
        <p><a href="/admin.html#/about">admin about</a></p>

        <button @click="handleToogle">切换数据</button>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "home",
        components: {},
        data() {
            return {}
        },
        computed: {
            ...mapState(['welcome'])
        },
        created() {

        },
        methods: {
            ...mapMutations(['toogleWelcome']),
            handleToogle(){
                this.toogleWelcome('欢迎回来，管理员！'+new Date().getTime())
            }
        },
        mounted() {

        },
    }
</script>

<style scoped lang="scss">

</style>
