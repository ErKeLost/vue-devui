import { computed, defineComponent, onUnmounted, provide, ref, Teleport, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { popoverProps, PopoverProps } from './popover-types';
import './popover.scss';
import { useFloating, useArrow } from './composable/useFloating';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import { usePopover } from './composable/usePopover';
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
    const { onPointerover, onPointerleave, middlewareData } = usePopover(props, showFloatEl, reference, content);
    const { leftPosition, topPosition, destroy } = useFloating(reference, content, floatingArrow, {
      placement: props.placement,
    });
    const { floatingArrowTop, floatingArrowLeft, floatingArrowBalance } = useArrow(props.placement, middlewareData);
    onUnmounted(() => {
      // destroy();
    });
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
                      ref="floatingArrow"
                      class="arrow-devui"
                      style={{
                        top: floatingArrowTop,
                        left: floatingArrowLeft,
                        ...floatingArrowBalance,
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
