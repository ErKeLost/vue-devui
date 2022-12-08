import { defineComponent, onMounted, onUnmounted, ref, Teleport } from 'vue';
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
    // let ch;
    onMounted(() => {
      const { clean } = useFloating(reference, content);
      // ch = clean;
    });
    onUnmounted(() => {
      // ch();
    });
    return () => {
      return (
        <div class="devui-popover-refactor">
          {ctx.slots.reference?.() ? (
            <div ref={reference} style={{ position: 'relative', display: 'inline-block' }}>
              {ctx.slots.reference?.()}
            </div>
          ) : null}
          {ctx.slots.content?.() ? (
            <Teleport to="body">
              <div ref={content} style={{ position: 'absolute' }}>
                {ctx.slots.content?.()}
              </div>
            </Teleport>
          ) : null}
        </div>
      );
    };
  },
});
