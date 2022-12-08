// import type { ComputePositionConfig, ComputePositionReturn, Middleware, SideObject, Placement, MiddlewareData } from '@floating-ui/core';
import { computePosition, flip, autoUpdate } from '@floating-ui/dom';
import { ref, Ref, watch, computed, ComponentPublicInstance } from 'vue';
import { throttle } from 'lodash';
interface UseFloatingType {
  leftPosition: Ref<number | undefined | null>;
  topPosition: Ref<number | undefined | null>;
  clean: () => void;
}

export function getComponentElement(element: HTMLElement | ComponentPublicInstance | null): HTMLElement {
  return (element as ComponentPublicInstance)?.$el ?? element;
}
export function useFloating(
  reference: Ref<HTMLElement | ComponentPublicInstance | null>,
  floating: Ref<HTMLElement | ComponentPublicInstance | null>
): UseFloatingType {
  const referenceElement = computed(() => getComponentElement(reference.value));
  const floatingElement = computed(() => getComponentElement(floating.value));
  const leftPosition = ref<number | null>();
  const topPosition = ref<number | null>();
  function updatePosition() {
    if (referenceElement.value === null || floatingElement.value === null) {
      return;
    }
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: [flip()],
      placement: 'top',
      // placement: placementOption.value,
      // strategy: strategyOption.value,
    }).then(({ x, y }) => {
      console.log('开始更新');
      leftPosition.value = x;
      topPosition.value = y;
      Object.assign(floatingElement.value?.style as CSSStyleDeclaration, {
        top: `${y}px`,
        left: `${x}px`,
      });
      // strategy.value = position.strategy;
      // placement.value = position.placement;
      // middlewareData.value = position.middlewareData;
    });
  }
  let cleanup: void | (() => void) | unknown;
  function autoComputePosition() {
    cleanup = autoUpdate(referenceElement.value, floatingElement.value, throttle(updatePosition, 200));
  }
  function clean() {
    if (typeof cleanup === 'function') {
      cleanup();
    }
  }
  autoComputePosition();
  watch([referenceElement, floatingElement], autoComputePosition, { flush: 'sync' });
  return {
    topPosition,
    leftPosition,
    clean,
  };
}
