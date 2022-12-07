import { defineComponent, onMounted, onUnmounted, ref, Teleport } from 'vue';
import type { SetupContext } from 'vue';
import { popoverRefactorProps, PopoverRefactorProps } from './popover-refactor-types';
import './popover-refactor.scss';
import { computePosition, flip } from '@floating-ui/dom';
import { throttle } from 'lodash';
export default defineComponent({
  name: 'DPopoverRefactor',
  props: popoverRefactorProps,
  emits: [],
  setup(props: PopoverRefactorProps, ctx: SetupContext) {
    const reference = ref<HTMLElement | null>(null);
    const content = ref<HTMLElement | null>(null);
    function handleWindowScroll() {
      computePosition(reference.value as HTMLElement, content.value as HTMLElement, {
        placement: 'top',
        middleware: [flip()],
      }).then(({ x, y }) => {
        Object.assign(content.value?.style as CSSStyleDeclaration, {
          top: `${y}px`,
          left: `${x}px`,
        });
      });
    }
    const scroll = throttle(handleWindowScroll, 200);
    onMounted(() => {
      scroll();
      window.addEventListener('scroll', scroll);
    });
    onUnmounted(() => {
      window.removeEventListener('scroll', scroll);
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
