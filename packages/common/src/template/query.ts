export function query(selector: string, root?: HTMLElement): Element {
  function __query(
    selector: string,
    match: Element,
    element?: Element
  ): Element {
    if (!element && document.querySelector(selector)) {
      match = document.querySelector(selector);
    }

    if (match) {
      return match;
    }

    const walk = document.createTreeWalker(
      element ? element : (document.body as Element),
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          return NodeFilter.FILTER_ACCEPT;
        },
      },
      // @ts-ignore
      false
    );

    while (walk.nextNode()) {
      if ((walk.currentNode as Element).querySelector(selector)) {
        match = (walk.currentNode as Element).querySelector(selector);
      }
      if ((walk.currentNode as HTMLElement).shadowRoot) {
        __query(
          selector,
          match,
          (<unknown>(walk.currentNode as HTMLElement).shadowRoot) as Element
        );
      }
    }

    return match;
  }
  return __query(selector, root);
}

export function queryAll(selector: string, root?: HTMLElement): Element[] {
  function __queryAll(
    selector: string,
    matches: Element[],
    element?: Element
  ): Element[] {
    if (!element && !matches.length) {
      matches = matches.concat(Array.from(document.querySelectorAll(selector)));
    }
    const walk = document.createTreeWalker(
      element ? element : (document.body as Element),
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          return NodeFilter.FILTER_ACCEPT;
        },
      },
      // @ts-ignore
      false
    );
    while (walk.nextNode()) {
      if ((walk.currentNode as Element).querySelector(selector)) {
        if (!matches.find((match) => match === walk.currentNode)) {
          matches = matches.concat(
            Array.from((walk.currentNode as Element).querySelectorAll(selector))
          );
        }
        if ((walk.currentNode as HTMLElement).shadowRoot) {
          __queryAll(
            selector,
            matches,
            (<unknown>(walk.currentNode as HTMLElement).shadowRoot) as Element
          );
        }
      }
    }
    return matches;
  }
  return __queryAll(selector, [], root ? root : null);
}
