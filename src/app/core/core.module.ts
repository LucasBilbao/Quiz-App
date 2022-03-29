import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../App-Routing/app-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, AppRoutingModule],
  exports: [FormsModule, AppRoutingModule],
})
export class CoreModule {}
