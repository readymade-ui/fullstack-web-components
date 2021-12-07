type MethodDecoratorFactoryFunction = (
  target: any,
  key: string | number,
  descriptor: PropertyDescriptor
) => void;

export function Listen(
  eventName: string,
  selector?: string
): MethodDecoratorFactoryFunction {
  return function decorator(
    target: any,
    key: string | number,
    descriptor: PropertyDescriptor
  ) {
    const { connectedCallback = () => {}, disconnectedCallback = () => {} } =
      target;
    const symbolMethod = Symbol(key);

    function getContext(context) {
      const root = context.shadowRoot ? context.shadowRoot : context;
      return selector ? root.querySelector(selector) : context;
    }

    function addListener() {
      const handler = (this[symbolMethod] = (...args) => {
        descriptor.value.apply(this, args);
      });
      getContext(this).addEventListener(eventName, handler);
    }

    function removeListener() {
      getContext(this).removeEventListener(eventName, this[symbolMethod]);
    }

    target.connectedCallback = function connectedCallbackWrapper() {
      connectedCallback.call(this);
      addListener.call(this);
    };

    target.disconnectedCallback = function disconnectedCallbackWrapper() {
      disconnectedCallback.call(this);
      removeListener.call(this);
    };
  };
}
