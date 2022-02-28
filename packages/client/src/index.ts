import { routes } from './routes';
import { Router } from './router';

const router = new Router('#root', routes);

export { ButtonComponent } from '@in/ui';
export { Background } from './component/background/Background';
export { AppHeader } from './component/header/Header';
export { CookieFooter } from './component/footer/CookieFooter';
export { DashboardView, LoginView, MainView } from './view';
export { routes, router, Router };
