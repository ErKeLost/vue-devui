import type { PropType, ExtractPropTypes } from 'vue';
type PlacementType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'left-start'
  | 'right-start'
  | 'right-end'
  | 'left-end'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export type TriggerType = 'click' | 'hover' | 'manually';
export const popoverRefactorProps = {
  placement: {
    type: String,
    default: 'top',
  },
  show: {
    type: Boolean,
    default: false
  },
  offset: {
    type: [Number, Object] as PropType<number | OffsetOptions>,
    default: 8,
  },
  content: {
    type: String,
    default: '',
  },
  trigger: {
    type: String as PropType<TriggerType>,
    default: 'click',
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  mouseEnterDelay: {
    type: Number,
    default: 150,
  },
  mouseLeaveDelay: {
    type: Number,
    default: 100,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type PopoverRefactorProps = ExtractPropTypes<typeof popoverRefactorProps>;
