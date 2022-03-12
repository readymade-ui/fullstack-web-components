import { routes } from './routes';
import { Router } from './router';

const router = new Router('#root', routes);

export { routes, router, Router };

export * from '@in/ui';
export { Background, AppHeader, CookieFooter } from './component';
export { DashboardView, LoginView, MainView } from './view';
