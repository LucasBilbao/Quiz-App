import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const shake = trigger('shake', [
  state('falseShake', style({ transform: 'translateX(0)' })),
  transition('* => falseShake', [
    animate(
      '500ms',
      keyframes([
        style({ transform: 'translateX(10px)', offset: 0.2 }),
        style({ transform: 'translateX(-10px)', offset: 0.4 }),
        style({ transform: 'translateX(10px)', offset: 0.6 }),
        style({ transform: 'translateX(-10px)', offset: 0.8 }),
      ])
    ),
  ]),
  state('trueShake', style({ transform: 'scale(100%)' })),
  transition('* => trueShake', [
    animate(
      '500ms',
      keyframes([
        style({ transform: 'scale(105%)', offset: 0.25 }),
        style({ transform: 'scale(110%)', offset: 0.5 }),
        style({ transform: 'scale(105%)', offset: 0.75 }),
        style({ transform: 'scale(100%)', offset: 1 }),
      ])
    ),
  ]),
]);
