import type { PropType, ExtractPropTypes } from 'vue';

export const popoverRefactorProps = {
  // data: {
  //   type: type,
  //   default: defaultValue
  // },
} as const;

export type PopoverRefactorProps = ExtractPropTypes<typeof popoverRefactorProps>;
