import { Component } from '@in/common';

@Component({
  selector: 'in-bg',
  custom: {
    extends: 'div',
  },
})
export class Background extends HTMLDivElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ['background'];
  }
  attributeChangedCallback(name, prev, next) {
    switch (name) {
      case 'background':
        this.setBackground(next);
        break;
    }
  }
  setBackground(path: string) {
    this.style.background = `url(${path})`;
    this.style.backgroundPosition = 'center center';
    this.style.backgroundSize = 'cover';
  }
}
