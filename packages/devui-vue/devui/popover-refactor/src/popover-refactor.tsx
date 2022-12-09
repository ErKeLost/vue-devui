import { computed, defineComponent, onUnmounted, provide, ref, Teleport, toRefs, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { popoverRefactorProps, PopoverRefactorProps } from './popover-refactor-types';
import './popover-refactor.scss';
import { useFloating } from './composable/useFloating';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { PopperTrigger } from '../../shared/components/popper-trigger';
import { POPPER_TRIGGER_TOKEN } from '../../shared/components/popper-trigger/src/popper-trigger-types';
export default defineComponent({
  name: 'DPopoverRefactor',
  inheritAttrs: false,
  props: popoverRefactorProps,
  emits: [],
  setup(props: PopoverRefactorProps, ctx: SetupContext) {
    const { placement } = toRefs(props);
    const visible = ref(false);
    const reference = ref<HTMLElement | null>(null);
    const content = ref<HTMLElement | null>(null);
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
          {ctx.slots.default?.() ? (
            <div ref={reference} class="devui-popover-reference">
              {ctx.slots.default?.()}
            </div>
          ) : null}
          {ctx.slots.content?.() ? (
            <Teleport to="body">
              <Transition>
                <div ref={content} class="devui-popover-content" style={floatElement.value}>
                  {ctx.slots.content?.()}
                </div>
              </Transition>
            </Teleport>
          ) : null}
        </>
      );
    };
  },
});
