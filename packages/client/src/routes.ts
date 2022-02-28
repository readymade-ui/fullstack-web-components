import { template as dashboardTemplate } from './view/dashboard/DashboardView';
import { template as loginTemplate } from './view/login/LoginView';
import { template as mainTemplate } from './view/main/MainView';
export const routes = [
  {
    path: '/',
    component: 'main',
    tag: 'main-view',
    title: 'In',
    template: mainTemplate,
  },
  {
    path: '/login',
    component: 'login',
    tag: 'login-view',
    title: 'Login',
    template: loginTemplate,
  },
  {
    path: '/dashboard',
    component: 'dashboard',
    tag: 'dashboard-view',
    title: 'Contact Dashboard',
    template: dashboardTemplate,
  },
];
