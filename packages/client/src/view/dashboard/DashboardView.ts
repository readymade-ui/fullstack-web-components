// This is the component
// It handles a template client-side for browsers that can't handle declarative Shadow DOM (Firefox & Safari)
import { attachShadow, html, css, Component } from '@in/common';
import { AppHeader } from '../../component/header/Header';

const styles = css`
  #content-root {
    display: block;
    margin: 0;
    padding: var(--padding-xl);
    width: 100%;
  }
  h1 {
    font-family: var(--font-default);
    font-weight: var(--font-weight-default);
    font-size: var(--font-headline-line-height-md);
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-top: var(--margin-lg);
    margin-bottom: calc(var(--margin-lg) * 2);
  }
  in-tablecard {
    display: block;
    width: calc(100% - var(--padding-xl) * 2);
  }
`;

const shadowTemplate = `
<app-header></app-header>
<div id="content-root">
  <h1>Contacts</h1>
  <in-tablecard channel="dashboard-channel"></in-tablecard>
</div>
`;

@Component({
  selector: 'dashboard-view',
  style: styles,
  template: shadowTemplate,
})
export class DashboardView extends HTMLElement {
  channelName: string = 'dashboard-channel';
  constructor() {
    super();
    if (!this.shadowRoot) {
      attachShadow(this);
    }
    fetch('/api/contacts', {
      method: 'GET',
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return {
            columnData: [],
            rowData: [],
          };
        }
      })
      .then((json) => {
        if (json.columnData.length && json.rowData.length) {
          this.onTableData(json);
        }
      });
  }
  onTableData(context) {
    const channel = new BroadcastChannel(this.channelName);
    setTimeout(() => {
      channel.postMessage({
        type: 'data',
        detail: context,
      });
    }, 1);
    channel.onmessage = (ev) => {
      if (ev.data.type === 'change') {
        fetch('/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ev.data.detail),
        });
      }
    };
  }
}
