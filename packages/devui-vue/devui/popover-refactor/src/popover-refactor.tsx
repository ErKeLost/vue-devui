import {
  computed,
  ComputedRef,
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  Ref,
  ref,
  Teleport,
  toRefs,
  Transition,
  watch,
} from 'vue';
import type { SetupContext } from 'vue';
import { popoverRefactorProps, PopoverRefactorProps } from './popover-refactor-types';
import './popover-refactor.scss';
import { useFloating } from './composable/useFloating';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
import { debounce } from 'lodash';
import { usePopover } from './composable/usePopover';
export default defineComponent({
  name: 'DPopoverRefactor',
  inheritAttrs: false,
  props: popoverRefactorProps,
  emits: [],
  setup(props: PopoverRefactorProps, ctx: SetupContext) {
    const { placement, trigger, disabled, mouseEnterDelay, mouseLeaveDelay } = toRefs(props);
    const reference = ref<HTMLElement | null>(null);
    const content = ref<HTMLElement | null>(null);
    const showFloatEl = ref(false);
    const { onPointerover, onPointerleave } = usePopover(props, showFloatEl, reference, content);
    const { leftPosition, topPosition, destroy } = useFloating(reference, content, {
      placement: placement.value,
    });
    provide(POPPER_TRIGGER_TOKEN, reference);
    onUnmounted(() => {
      destroy();
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
              <Transition>
                {showFloatEl.value ? (
                  <div
                    onPointerover={onPointerover}
                    onPointerleave={onPointerleave}
                    ref={content}
                    class="devui-popover-content"
                    style={floatElement.value}>
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
