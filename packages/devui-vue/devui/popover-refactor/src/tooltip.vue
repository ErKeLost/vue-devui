<script setup>
import { Teleport, Transition, ref, computed } from 'vue';
import { useFloating, autoUpdate, arrow, flip, offset } from 'vue-floating-ui';

const OPPOSITE_SIDE_BY_SIDE = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const isOpen = ref(false);
const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null);
const { x, y, strategy, placement, middlewareData } = useFloating(reference, floating, {
  middleware: [arrow({ element: floatingArrow }), flip(), offset(5)],
  whileElementsMounted: autoUpdate,
});
const side = computed(() => placement.value.split('-')[0]);
const floatingTop = computed(() => `${y.value ?? 0}px`);
const floatingLeft = computed(() => `${x.value ?? 0}px`);
const floatingArrowX = computed(() => middlewareData.value.arrow?.x ?? null);
const floatingArrowY = computed(() => middlewareData.value.arrow?.y ?? null);
const floatingArrowTop = computed(() => (floatingArrowY.value === null ? '' : `${floatingArrowY.value}px`));
const floatingArrowLeft = computed(() => (floatingArrowX.value === null ? '' : `${floatingArrowX.value}px`));
const floatingArrowBalance = computed(() => ({
  [OPPOSITE_SIDE_BY_SIDE[side.value]]: '-4px',
}));

function onPointerover() {
  isOpen.value = true;
}

function onPointerleave() {
  isOpen.value = false;
}
</script>

<template>
  <div @pointerover="onPointerover" @pointerleave="onPointerleave" ref="reference">
    <slot name="target" />
  </div>
  <Teleport to="body">
    <Transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div
        v-if="isOpen"
        :style="{ position: strategy, top: floatingTop, left: floatingLeft }"
        class="py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm w-max transition-opacity"
        ref="floating"
      >
        <span
          :style="{
            top: floatingArrowTop,
            left: floatingArrowLeft,
            ...floatingArrowBalance,
          }"
          class="absolute rotate-45 bg-inherit aspect-square w-2"
          ref="floatingArrow"
        />
        <slot name="content" />
      </div>
    </Transition>
  </Teleport>
</template>
