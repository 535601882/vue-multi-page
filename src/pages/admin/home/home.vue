<template>
    <div>
        <h1>admin home</h1>
        <h2>{{welcome}}</h2>
        <p><router-link :to="{ name: 'About'}">跳转admin about</router-link></p>

        <button @click="handleToogle">切换数据</button>

        <helloWorld msg="公用组件"></helloWorld>
    </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    import helloWorld from "@/components/HelloWorld"
    export default {
        name: "home",
        components: {
            helloWorld
        },
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
