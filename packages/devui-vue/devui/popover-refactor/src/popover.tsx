import { computed, defineComponent, watch, onUnmounted, provide, ref, Teleport, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { popoverProps, PopoverProps } from './popover-types';
import './popover.scss';
import { useFloating, useArrow } from './composable/useFloating';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import { usePopover } from './composable/usePopover';
const OPPOSITE_SIDE_BY_SIDE = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};
export default defineComponent({
  name: 'DPopoverRefactor',
  inheritAttrs: false,
  props: popoverProps,
  emits: [],
  setup(props: PopoverProps, ctx: SetupContext) {
    const reference = ref<HTMLElement | null>(null);
    const floatingArrow = ref<HTMLElement | null>(null);
    const content = ref<HTMLElement | null>(null);
    const showFloatEl = ref<boolean>(false);
    provide(POPPER_TRIGGER_TOKEN, reference);
    const ns = useNamespace('popover');
    const { onPointerover, onPointerleave } = usePopover(props, showFloatEl, reference, content);
    const { leftPosition, topPosition, dynamicPlacement, middlewareData } = useFloating(reference, content, floatingArrow, {
      placement: props.placement,
    });
    const side = computed(() => dynamicPlacement);
    const floatingArrowX = computed(() => middlewareData.value?.arrow?.x ?? null);
    const floatingArrowY = computed(() => middlewareData.value?.arrow?.y ?? null);
    const floatingArrowTop = computed(() => (floatingArrowY.value === null ? '' : `${floatingArrowY.value}px`));
    const floatingArrowLeft = computed(() => (floatingArrowX.value === null ? '' : `${floatingArrowX.value}px`));
    const floatingArrowBalance = computed(() => ({
      [OPPOSITE_SIDE_BY_SIDE[dynamicPlacement.value]]: '-4px',
    }));
    watch(floatingArrowBalance, (n) => {
      console.log(n);
    });
    // const { floatingArrowTop, floatingArrowLeft, floatingArrowBalance } = useArrow(props.placement, middlewareData);
    const floatElement = computed(() => {
      return {
        left: `${leftPosition.value}px`,
        top: `${topPosition.value}px`,
      };
    });
    return () => {
      return (
        <>
          <PopperTrigger>{ctx.slots.default?.()}</PopperTrigger>
          {dynamicPlacement.value}
          {ctx.slots.content?.() ? (
            <Teleport to="body">
              <Transition
                name={props.showAnimation ? (props.animateName.length > 0 ? props.animateName : ns.m(`fade-${props.placement}`)) : ''}>
                {showFloatEl.value ? (
                  <div
                    onPointerover={onPointerover}
                    onPointerleave={onPointerleave}
                    ref={content}
                    class="devui-popover-content"
                    style={floatElement.value}>
                    <div
                      ref={floatingArrow}
                      class="arrow-devui"
                      style={{
                        top: floatingArrowTop.value,
                        left: floatingArrowLeft.value,
                        ...floatingArrowBalance.value,
                      }}></div>
                    {ctx.slots.content?.()}
                  </div>
                ) : null}
              </Transition>
            </Teleport>
          ) : null}
        </>
      );
    };
  },
});
