import { createRouter, createWebHistory } from 'vue-router'
import editor from "@/pages/Editor.vue";
import Registration from "@/pages/Registration.vue";
import Authentification from "@/pages/Authentification.vue";
import AdminPanel from "@/pages/AdminPanel.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/editor',
            name: 'home',
            component: editor,
        },
        {
            path: '/reg',
            name: 'reg',
            component: Registration,
        },
        {
            path: '/auth',
            name: 'auth',
            component: Authentification,
        },
        {
            path: '/adminPanel',
            name: 'admin',
            component: AdminPanel,
        }
        // {
        //     path: '/auth',
        //     children: [
        //         {
        //             path: 'sign-in',
        //             name: 'sign-in',
        //             component: SignInPage,
        //         },
        //         {
        //             path: 'sign-up',
        //             name: 'sign-up',
        //             component: SignUpPage,
        //         },
        //         {
        //             path: 'post-editor',
        //             name: 'post-editor',
        //             component: PostEditor,
        //         }
        //     ],
        // },
    ],
})

export default router