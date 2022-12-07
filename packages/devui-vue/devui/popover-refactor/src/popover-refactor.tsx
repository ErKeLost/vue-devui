import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { popoverRefactorProps, PopoverRefactorProps } from './popover-refactor-types';
import './popover-refactor.scss';
import { computePosition, flip } from '@floating-ui/dom';
export default defineComponent({
  name: 'DPopoverRefactor',
  props: popoverRefactorProps,
  emits: [],
  setup(props: PopoverRefactorProps, ctx: SetupContext) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    // console.log(data.value);
    computePosition(referenceEl, floatingEl, {
      middleware: [flip()],
    });
    return () => {
      return <div class="devui-popover-refactor">

      </div>;
    };
  },
});
