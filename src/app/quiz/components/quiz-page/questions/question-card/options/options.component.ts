import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  @Input() options: string[] = [];

  indexChecked: number = -1;

  constructor() {}

  ngOnInit(): void {}

  onOptionClick(index: number): void {
    this.indexChecked = index;
  }

  isChecked(index: number): boolean {
    return this.indexChecked === index;
  }
}
