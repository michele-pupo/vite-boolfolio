import { createRouter, createWebHistory } from 'vue-router';

// importiamo tutti i componenti che verranno utilizzati come pagina
import HomePage from './pages/HomePage.vue';
import ProjectsPage from './pages/ProjectsPage.vue';
import SingleProject from './pages/SingleProject.vue';
import ContactMe from './pages/ContactMe.vue';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/project',
            name: 'project',
            component: ProjectsPage
        },
        {
            path: '/projects/:slug',
            name: 'single-project',
            component: SingleProject
        },
        {
            path: '/contact-me',
            name: 'contact-me',
            component: ContactMe
        },
    ]

})

export { router };