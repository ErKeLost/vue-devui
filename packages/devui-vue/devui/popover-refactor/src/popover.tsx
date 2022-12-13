import { computed, defineComponent, provide, ref, Teleport, toRefs, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { popoverProps, PopoverProps } from './popover-types';
import './popover.scss';
import { useFloating } from './composable/useFloating';
import { useArrow } from './composable/useArrow';
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
    const { content, arrow, animation } = toRefs(props);
    const reference = ref<HTMLElement | null>(null);
    const floatingArrow = ref<HTMLElement | null>(null);
    const contentEl = ref<HTMLElement | null>(null);
    const showFloatEl = ref<boolean>(false);
    provide(POPPER_TRIGGER_TOKEN, reference);
    const ns = useNamespace('popover');
    const { onPointerover, onPointerleave } = usePopover(props, showFloatEl, reference, contentEl);
    const { leftPosition, topPosition, dynamicPlacement, middlewareData } = useFloating(reference, contentEl, floatingArrow, {
      placement: props.placement,
    });
    const { floatingArrowLeft, floatingArrowBalance } = useArrow(dynamicPlacement, middlewareData);
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
                name={animation ? (props.animateName.length > 0 ? props.animateName : ns.m(`fade-${props.placement}`)) : ''}>
                {showFloatEl.value ? (
                  <div
                    onPointerover={onPointerover}
                    onPointerleave={onPointerleave}
                    ref={contentEl}
                    class={ns.b()}
                    style={floatElement.value}>
                    {arrow && (
                      <span
                        ref={floatingArrow}
                        class={ns.e('arrow')}
                        style={{
                          left: floatingArrowLeft.value,
                          ...floatingArrowBalance.value,
                        }}
                      />
                    )}
                    {/* ) : null} */}
                    {ctx.slots.content?.() || <span>{content.value}</span>}
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
