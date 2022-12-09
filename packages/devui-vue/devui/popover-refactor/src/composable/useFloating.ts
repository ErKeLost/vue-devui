// import type { ComputePositionConfig, ComputePositionReturn, Middleware, SideObject, Placement, MiddlewareData } from '@floating-ui/core';
import { computePosition, flip, autoUpdate, autoPlacement } from '@floating-ui/dom';
import { ref, Ref, watch, computed, ComponentPublicInstance } from 'vue';
import { throttle } from 'lodash';
interface UseFloatingType {
  leftPosition: Ref<number | undefined | null>;
  topPosition: Ref<number | undefined | null>;
  destroy: () => void;
}

export function getComponentElement(element: HTMLElement | ComponentPublicInstance | null): HTMLElement {
  return (element as ComponentPublicInstance)?.$el ?? element;
}
export function useFloating(
  reference: Ref<HTMLElement | ComponentPublicInstance | null>,
  floating: Ref<HTMLElement | ComponentPublicInstance | null>,
  options: any
): UseFloatingType {
  const referenceElement = computed(() => getComponentElement(reference.value));
  const floatingElement = computed(() => getComponentElement(floating.value));
  const leftPosition = ref<number | null>();
  const topPosition = ref<number | null>();
  const placementPosition = computed(() => options.placement);
  function updatePosition() {
    if (referenceElement.value === null || floatingElement.value === null) {
      return;
    }
    computePosition(referenceElement.value, floatingElement.value, {
      middleware: [flip()],
      placement: placementPosition.value,
      // placement: placementOption.value,
      // strategy: strategyOption.value,
    }).then(({ x, y }) => {
      console.log('开始更新');
      leftPosition.value = x;
      topPosition.value = y;
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
    }
  }
  autoComputePosition();
  watch([referenceElement, floatingElement], autoComputePosition, { flush: 'sync' });
  return {
    topPosition,
    leftPosition,
    destroy,
  };
}
