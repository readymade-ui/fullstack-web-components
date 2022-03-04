export class LocationService {
  constructor() {}
  navigate(route: string) {
    window.history.replaceState({}, '', `${window.location.origin}/${route}`);
    window.location.replace(`${window.location.origin}/${route}`);
  }
}
