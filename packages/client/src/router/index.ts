export interface Route {
  path: string;
  component: any;
  tag: string;
  title?: string;
}

export class Router {
  rootElement: Element;
  routes: any[];
  constructor(root: string, routes: Route[]) {
    if (document.querySelector(root) === null) {
      console.error(`[Router] Root element '${root}' does not exist.`);
    }
    if (!routes) {
      console.error(`[Router] initialized without any routes.`);
    }
    this.rootElement = document.querySelector(root);
    this.routes = routes;
    this.init();
  }
  init() {
    this.navigate(window.location.pathname);
  }
  matchRoute(path: string) {
    return this.routes.find((route) => route.path === path);
  }
  navigate(path: string) {
    const route = this.matchRoute(path);
    if (!route) {
      console.error(`[Router] Route '${path}' does not exist.`);
      return;
    }
    this.resolve(route);
  }
  resolve(route: Route) {
    const component: HTMLElement = document.createElement(route.tag as string);

    if (route.title) {
      document.title = route.title;
    }

    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(component);
  }
}
