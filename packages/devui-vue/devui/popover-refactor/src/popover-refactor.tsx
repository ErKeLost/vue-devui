import { defineComponent, onMounted, toRefs } from 'vue';
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
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    // console.log(data.value);
    onMounted(() => {
      const reference = document.getElementById('reference');
      const floating = document.getElementById('floating');
      function handleWindowScroll() {
        computePosition(reference, floating, {
          placement: 'top',
          // Try removing this line below. The tooltip will
          // overflow the viewport's edge!
          middleware: [flip()],
        }).then(({ x, y }) => {
          Object.assign(floating.style, {
            top: `${y}px`,
            left: `${x}px`,
          });
        });
      }
      const scroll = throttle(handleWindowScroll, 200);
      window.addEventListener('scroll', scroll);
    });
    return () => {
      return (
        <div class="devui-popover-refactor">
          <div id="reference"></div>
          <div id="floating">Tooltip</div>
        </div>
      );
    };
  },
});
