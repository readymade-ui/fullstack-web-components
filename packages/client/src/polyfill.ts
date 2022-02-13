export * from 'broadcastchannel-polyfill';
export * from '@ungap/custom-elements';
export * from 'element-internals-polyfill';

// Declarative Shadow DOM Polyfill
// (function attachShadowRoots(root: Document | ShadowRoot) {
//   root.querySelectorAll('template[shadowroot]').forEach((template) => {
//     const mode = template.getAttribute('shadowroot');
//     const shadowRoot: ShadowRoot = (
//       template.parentNode as HTMLElement
//     ).attachShadow({
//       mode: 'open',
//     });
//     shadowRoot.appendChild(
//       ((<unknown>template) as HTMLTemplateElement).content
//     );
//     template.remove();
//     attachShadowRoots(shadowRoot);
//   });
// })(document);
