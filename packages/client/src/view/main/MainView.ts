// This is the component
// It handles a template client-side for browsers that can't handle declarative Shadow DOM (Firefox & Safari)
import { attachShadow, html, css, Component } from '@in/common';
import resolve from 'es6-template-strings';
import {
  AppHeader,
  template as HeaderTemplate,
} from '../../component/header/Header';
import {
  CookieFooter,
  template as FooterTemplate,
} from '../../component/footer/CookieFooter';
import { Background } from '../../component/background/Background';

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
  }
  a:link,
  a:visited {
    font-family: var(--font-default);
    font-weight: var(--font-weight-default);
    font-size: var(--font-body-md);
    text-decoration: none;
    color: var(--color-black);
  }
  .cta:after {
    display: inline-block;
    margin-left: 4px;
    content: '\\25BA';
  }
  #content-root {
    overflow-y: scroll;
  }
  [is='in-bg'] {
    width: calc(100% - (var(--margin-lg) * 2));
    min-height: 480px;
    padding: var(--margin-lg);
  }
  [is='in-bg']:last-child {
    padding-bottom: 120px;
  }
  [hidden] {
    display: none;
  }
  .light {
    color: var(--color-white);
  }
  .blurb {
    text-align: justify;
  }
  .half {
    width: 50%;
  }
  .third {
    width: 33.333333%;
  }
  .right {
    float: right;
  }
  @media (max-width: 480px) {
    .half {
      width: 100%;
    }
    .third {
      width: 100%;
    }
    .right {
      float: left;
    }
  }
`;

const contentTemplate = html`
  <div
    is="in-bg"
    background="/style/asset/timon-studler-BIk2ANMmNz4-unsplash.jpg"
  >
    <div class="blurb half right">
      <h2>Your Last Contact List</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod eo
        liquidius faciet, si perspexerit rerum inter eas verborumne sit
        controversia.
      </p>
      <a href="/dashboard" class="cta dashboard-link" hidden>View Contacts</a>
    </div>
  </div>
  <div
    is="in-bg"
    background="/style/asset/valiant-made-zBkVp3E2CnE-unsplash.jpg"
    class="light"
  >
    <div class="blurb">
      <h2>Turn Group Chats Into Live Events</h2>
      <p>
        Indicant pueri, in quibus ut in speculis natura cernitur. Itaque ad
        tempus ad Pisonem omnes. Quis hoc dicit? Philosophi autem in suis
        lectulis plerumque moriuntur. Videmus in quodam volucrium genere non
        nulla indicia pietatis, cognitionem, memoriam, in multis etiam desideria
        videmus. Quid sequatur, quid repugnet, vident. Atqui pugnantibus et
        contrariis studiis consiliisque semper utens nihil quieti videre, nihil
        tranquilli potest.
      </p>
    </div>
  </div>
`;

const shadowTemplate = `
  <app-header></app-header>
  <div id="content-root">${contentTemplate}</div>
  <cookie-footer hidden></cookie-footer>
`;

@Component({
  selector: 'main-view',
  style: styles,
  template: shadowTemplate,
})
export class MainView extends HTMLElement {
  constructor() {
    super();
    attachShadow(this);
  }
  connectedCallback() {
    fetch('/api/session', {
      method: 'GET',
    }).then((res) => {
      if (res.status === 200) {
        this.$dashboardLink.removeAttribute('hidden');
      }
    });

    fetch('/api/cookies', {
      method: 'GET',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return {
            permission: false,
          };
        }
      })
      .then((json) => {
        if (json.permission === true) {
          this.$cookieFooter.setAttribute('hidden', 'true');
        } else {
          this.$cookieFooter.removeAttribute('hidden');
        }
      });
  }
  get $cookieFooter() {
    return this.shadowRoot.querySelector('cookie-footer');
  }
  get $dashboardLink() {
    return this.shadowRoot.querySelector('.dashboard-link');
  }
}

export const template = () => `
<main-view>
  <template shadowroot="open">
    <style>
     ${resolve(styles)}
    </style>
    ${resolve(HeaderTemplate())}
    <div id="content-root">
      ${contentTemplate}
    </div>
    ${resolve(FooterTemplate('foo'))}
  </template>
</main-view>
`;

export { ButtonComponent } from '@in/ui';
export { AppHeader, CookieFooter, Background };
