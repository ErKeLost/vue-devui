// import type { ComputePositionConfig, ComputePositionReturn, Middleware, SideObject, Placement, MiddlewareData } from '@floating-ui/core';
import { computePosition, flip, autoUpdate, arrow, offset } from '@floating-ui/dom';
import type { Middleware, Padding } from '@floating-ui/dom';
import { ref, Ref, watch, computed, ComponentPublicInstance, unref, onScopeDispose, getCurrentScope } from 'vue';
import { throttle } from 'lodash';
interface UseFloatingType {
  leftPosition: Ref<number | undefined | null>;
  topPosition: Ref<number | undefined | null>;
  destroy: () => void;
  middlewareData: any;
  dynamicPlacement: string;
}

export function getComponentElement(element: HTMLElement | ComponentPublicInstance | null): HTMLElement {
  return (element as ComponentPublicInstance)?.$el ?? element;
}

// function arrow(options: ArrowOptions): Middleware {
//   return {
//     name: 'arrow',
//     options,
//     fn(args) {
//       const element = getComponentElement(unref(options.element));
//       if (element === null) {
//         return {};
//       }
//       return apply({ element, padding: options.padding }).fn(args);
//     },
//   };
// }
export function useFloating(
  reference: Ref<HTMLElement | ComponentPublicInstance | null>,
  floating: Ref<HTMLElement | ComponentPublicInstance | null>,
  floatingArrow: Ref<HTMLElement | ComponentPublicInstance | null>,
  options: any
): UseFloatingType {
  const referenceElement = computed(() => getComponentElement(reference.value));
  const floatingElement = computed(() => getComponentElement(floating.value));
  const floatingArrowElement = computed(() => getComponentElement(floatingArrow.value));
  const leftPosition = ref<number | null>();
  const topPosition = ref<number | null>();
  const middlewareData = ref();
  const placementPosition = computed(() => options.placement);
  const dynamicPlacement = ref(placementPosition.value);
  async function updatePosition() {
    if (referenceElement.value === null || floatingElement.value === null) {
      return;
    }
    computePosition(referenceElement.value, floatingElement.value, {
      // middleware: [flip(), arrow({ element: floatingArrow })],
      middleware: [arrow({ element: floatingArrowElement.value }), flip(), offset(10)],
      placement: placementPosition.value,
      // placement: placementOption.value,
      // strategy: strategyOption.value,
    }).then((position) => {
      console.log(position);

      leftPosition.value = position.x;
      topPosition.value = position.y;
      dynamicPlacement.value = position.placement;
      middlewareData.value = position.middlewareData;
      // strategy.value = position.strategy;
      // placement.value = position.placement;
      // middlewareData.value = position.middlewareData;
    });
  }
  let cleanup: void | (() => void) | unknown;
  function autoComputePosition() {
    if (referenceElement.value != null && floatingElement.value != null) {
      cleanup = autoUpdate(referenceElement.value, floatingElement.value, throttle(updatePosition, 200));
      return;
    }
  }
  function destroy() {
    if (typeof cleanup === 'function') {
      cleanup();
      cleanup = undefined;
    }
  }
  function attach() {
    if (cleanup === undefined) {
      autoComputePosition();
      return;
    }

    if (referenceElement.value != null && floatingElement.value != null) {
      cleanup = autoUpdate(referenceElement.value, floatingElement.value, autoComputePosition);
      return;
    }
  }
  watch([referenceElement, floatingElement], attach, { flush: 'sync' });
  if (getCurrentScope()) {
    onScopeDispose(destroy);
  }
  return {
    topPosition,
    leftPosition,
    middlewareData,
    dynamicPlacement,
    destroy,
  };
}

interface ArrowOptions {
  element: HTMLElement;
  padding?: Padding;
}
