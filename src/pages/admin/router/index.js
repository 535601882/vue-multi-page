import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Layout',
        redirect: {
            name: 'Home'
        },
        component: () => import('../layout/layout.vue'),
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('../home/home.vue'),
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('../about/about.vue'),
            }
        ]
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
