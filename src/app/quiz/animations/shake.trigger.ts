import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const shake = trigger('shake', [
  state('positionShake', style({ transform: 'translateX(0)' })),
  transition('* => positionShake', [
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
  state('scaleShake', style({ transform: 'scale(100%)' })),
  transition('* => scaleShake', [
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
