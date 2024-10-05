import { createRouter, createWebHistory } from "vue-router";
import { authMiddleware } from "../middlewares/authMiddleware";
import PageNotFound from "../pages/PageNotFound.vue";
import SignIn from "../pages/auth/SignIn.vue";
import SignUp from "../pages/auth/SignUp.vue";
import Dashboard from "../pages/Dashboard.vue";
import Business from "../pages/businesses/Business.vue";
import BusinessCreate from "../pages/businesses/Create.vue";
import Request from "../pages/requests/Request.vue";
import RequestCreate from "../pages/requests/Create.vue";
import RequestView from "../pages/requests/View.vue";
import Requirements from "../pages/requests/Requirements.vue";
import Profile from "../pages/Profile.vue";
import Verification from "../pages/Verification.vue";

const routes = [
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
        meta: { Layout: false, requiresAuth: false }
    },
    {
        name: 'sign-in',
        path: '/sign-in',
        component: SignIn,
        meta: { Layout: false, requiresGuest: true }
    },
    {
        name: 'sign-up',
        path: '/sign-up',
        component: SignUp,
        meta: { Layout: false, requiresGuest: true }
    },
    {
        name: 'dashboard',
        path: '/',
        component: Dashboard,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'business',
        path: '/business',
        component: Business,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'business-create',
        path: '/business/create',
        component: BusinessCreate,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'request',
        path: '/request',
        component: Request,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'request-create',
        path: '/request/create/:business_id?',
        component: RequestCreate,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'request-view',
        path: '/request/view/:business_id?',
        component: RequestView,
        meta: { Layout: true, requiresAdmin: true, verifiedOnly: true }
    },
    {
        name: 'requirements',
        path: '/request/requirements/:requirement_id',
        component: Requirements,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile,
        meta: { Layout: true, requiresAuth: true, verifiedOnly: true }
    },
    {
        name: 'verification',
        path: '/verification',
        component: Verification,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(authMiddleware);

export default router;