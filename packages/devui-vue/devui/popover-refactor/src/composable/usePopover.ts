import { debounce } from 'lodash';
import { computed, ComputedRef, onMounted, onUnmounted, Ref, ref, toRefs, watch } from 'vue';
import { PopoverProps, UsePopoverEvent } from '../popover-types';

export function usePopover(props: PopoverProps, visible: Ref<boolean>, origin: Ref, popoverRef: Ref): UsePopoverEvent {
  const { trigger, mouseEnterDelay, mouseLeaveDelay, show, disabled } = toRefs(props);
  const isClick: ComputedRef<boolean> = computed(() => trigger.value === 'click');
  // const placement: Ref<string> = ref(position.value[0].split('-')[0]);
  const isEnter: Ref<boolean> = ref(false);

  const onClick = () => {
    if (disabled.value) {
      return;
    }
    isClick.value && (visible.value = !visible.value);
  };
  const enter = debounce(() => {
    isEnter.value && (visible.value = true);
  }, mouseEnterDelay.value);
  const leave = debounce(() => {
    !isEnter.value && (visible.value = false);
  }, mouseLeaveDelay.value);
  const onPointerover = () => {
    if (disabled.value) {
      return;
    }
    if (!isClick.value) {
      isEnter.value = true;
      enter();
    }
  };
  const onPointerleave = () => {
    if (!isClick.value) {
      isEnter.value = false;
      leave();
    }
  };
  const quickLeave = () => {
    isEnter.value = false;
    visible.value = false;
  };
  function onDocumentClick(e: Event) {
    if (!origin.value?.contains(e.target as HTMLElement) && !popoverRef.value.$el?.contains(e.target)) {
      visible.value = false;
    }
  }
  watch(show, (isOpenVal) => {
    visible.value = isOpenVal;
  });

  watch(visible, () => {
    if (visible.value && trigger.value !== 'manually') {
      document.addEventListener('click', onDocumentClick);
    } else {
      document.removeEventListener('click', onDocumentClick);
    }
  });
  onUnmounted(() => {
    document.removeEventListener('click', onDocumentClick);
  });
  watch(disabled, (newVal) => {
    if (newVal && visible.value) {
      quickLeave();
    }
  });
  onMounted(() => {
    if (trigger.value === 'click') {
      origin.value.addEventListener('click', onClick);
    } else if (trigger.value === 'hover') {
      origin.value.addEventListener('mouseenter', onPointerover);
      origin.value.addEventListener('mouseleave', onPointerleave);
    }
  });

  return { onPointerover, onPointerleave };
}
