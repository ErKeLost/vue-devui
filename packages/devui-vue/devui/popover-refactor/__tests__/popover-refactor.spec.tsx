import { ComponentPublicInstance } from 'vue';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { PopoverRefactor } from '..';

describe('popover-refactor', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('popover-refactor init render', async () => {
    wrapper = mount({
      setup() {
        return () => {
          return <PopoverRefactor />;
        };
      },
    });

    // todo
  });
});
