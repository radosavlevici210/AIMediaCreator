
export interface Route {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export class SimpleRouter {
  private routes: Route[] = [];
  private currentPath: string = window.location.pathname;

  addRoute(route: Route) {
    this.routes.push(route);
  }

  navigate(path: string) {
    this.currentPath = path;
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  getCurrentRoute(): Route | undefined {
    return this.routes.find(route => {
      if (route.exact) {
        return route.path === this.currentPath;
      }
      return this.currentPath.startsWith(route.path);
    });
  }

  listen(callback: (route?: Route) => void) {
    const handleNavigation = () => {
      this.currentPath = window.location.pathname;
      callback(this.getCurrentRoute());
    };

    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }
}

export const router = new SimpleRouter();
