import { attachShadow, html, css, Component, Listen } from '@in/common';
import { ButtonComponent } from '@in/ui';

export const styles = css`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding-left: var(--margin-lg);
    padding-right: var(--margin-lg);
    border-bottom: var(--border-default);
  }
  :host .in-button.icon.logo {
    display: block;
    border: none;
    width: 84px;
    height: 84px;
  }
  a:link,
  a:visited {
    font-family: var(--font-default);
    font-weight: var(--font-weight-default);
    font-size: var(--font-body-md);
    text-decoration: none;
    color: var(--color-blue-500);
  }
  [hidden] {
    display: none;
  }
`;

export const shadowTemplate = html`
  <button is="in-button" class="in-button icon logo">
    <svg
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="512" cy="512" r="512" fill="#FF2D55" />
      <path
        d="M345.544 493.056L282.056 1024H125.384L188.872 493.056H345.544ZM375.24 347.648C375.24 360.277 372.509 372.224 367.048 383.488C361.587 394.411 354.419 404.139 345.544 412.672C336.669 420.864 326.429 427.52 314.824 432.64C303.56 437.419 291.955 439.808 280.008 439.808C268.061 439.808 256.627 437.419 245.704 432.64C234.781 427.52 225.053 420.864 216.52 412.672C208.328 404.139 201.672 394.411 196.552 383.488C191.432 372.224 188.872 360.277 188.872 347.648C188.872 335.019 191.432 323.072 196.552 311.808C201.672 300.544 208.499 290.645 217.032 282.112C225.907 273.579 235.805 266.923 246.728 262.144C257.651 257.024 269.085 254.464 281.032 254.464C293.32 254.464 305.096 256.853 316.36 261.632C327.624 266.411 337.523 273.067 346.056 281.6C354.931 290.133 361.928 300.032 367.048 311.296C372.509 322.56 375.24 334.677 375.24 347.648ZM583.92 584.704C609.52 550.571 637.509 525.483 667.888 509.44C698.267 493.056 729.669 484.864 762.096 484.864C783.941 484.864 803.909 489.301 822 498.176C840.432 507.051 855.621 520.021 867.568 537.088C879.856 554.155 888.56 575.317 893.68 600.576C898.8 625.493 899.312 654.165 895.216 686.592L855.28 1024H696.56L736.496 686.592C738.203 672.256 738.715 660.139 738.032 650.24C737.691 640.341 735.984 632.491 732.912 626.688C729.84 620.885 725.573 616.789 720.112 614.4C714.651 611.669 708.165 610.304 700.656 610.304C689.051 610.304 676.933 613.888 664.304 621.056C651.675 628.224 639.557 638.464 627.952 651.776C616.688 664.747 606.277 680.619 596.72 699.392C587.163 717.824 579.653 738.304 574.192 760.832L545.008 1024H386.288L449.776 493.056H531.696C548.08 493.056 560.88 496.981 570.096 504.832C579.312 512.341 583.92 524.8 583.92 542.208V584.704Z"
        fill="white"
      />
      <mask
        id="mask0_102_150"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1024"
        height="1024"
      >
        <circle cx="512" cy="512" r="512" fill="#FF2D55" />
      </mask>
      <g mask="url(#mask0_102_150)"></g>
    </svg>
  </button>
  <a href="/login" class="login-link" hidden>Login</a>
`;

@Component({
  selector: 'app-header',
  style: styles,
  template: shadowTemplate,
})
export class AppHeader extends HTMLElement {
  constructor() {
    super();
    attachShadow(this);
  }
  connectedCallback() {
    if (!window.location.pathname.includes('login')) {
      fetch('/api/session', {
        method: 'GET',
      }).then((res) => {
        if (res.status === 401) {
          this.$login.removeAttribute('hidden');
        }
      });
    }
  }
  @Listen('click', '.icon')
  onLogoClick() {
    document.location.href = '/';
  }
  get $login(): Element {
    return this.shadowRoot.querySelector('.login-link') as Element;
  }
}

export { ButtonComponent };
