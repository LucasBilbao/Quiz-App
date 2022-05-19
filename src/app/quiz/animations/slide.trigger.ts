import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slide = trigger('slide', [
  state('slideInAndOut', style({ left: '0' })),
  transition('* => slideInAndOut', [
    animate(
      '3s cubic-bezier(.5,-0.5,.5,1)',
      keyframes([
        style({ left: '-2500px', offset: 0.5 }),
        style({ left: '0', offset: 1 }),
      ])
    ),
  ]),
]);
