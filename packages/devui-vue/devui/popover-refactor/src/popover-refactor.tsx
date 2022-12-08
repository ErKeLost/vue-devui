import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, Teleport, Transition } from 'vue';
import type { SetupContext } from 'vue';
import { popoverRefactorProps, PopoverRefactorProps } from './popover-refactor-types';
import './popover-refactor.scss';
import { useFloating } from './composable/useFloating';
export default defineComponent({
  name: 'DPopoverRefactor',
  props: popoverRefactorProps,
  emits: [],
  setup(props: PopoverRefactorProps, ctx: SetupContext) {
    const reference = ref<HTMLElement | null>(null);
    const content = ref<HTMLElement | null>(null);
    const { leftPosition, topPosition, destroy } = useFloating(reference, content);
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
          {ctx.slots.reference?.() ? (
            <div ref={reference} class="devui-popover-reference">
              {ctx.slots.reference?.()}
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
