import { computed } from 'vue';

const OPPOSITE_SIDE_BY_SIDE: any = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export function useArrow(placement: string, middlewareData: any): any {
  // const side = computed(() => placement.split('-')[0]);
  const floatingArrowX = computed(() => middlewareData.value?.arrow.x ?? null);
  const floatingArrowY = computed(() => middlewareData.value?.arrow.y ?? null);
  const floatingArrowLeft = computed(() => (floatingArrowX.value === null ? '' : `${floatingArrowX.value}px`));
  const floatingArrowTop = computed(() => (floatingArrowY.value === null ? '' : `${floatingArrowY.value}px`));
  const floatingArrowBalance = computed(() => ({
    [OPPOSITE_SIDE_BY_SIDE[placement.value]]: '-4px',
  }));
  return {
    floatingArrowLeft,
    floatingArrowTop,
    floatingArrowBalance,
  };
}
