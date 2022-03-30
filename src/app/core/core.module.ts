import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing/app-routing.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, AppRoutingModule, HttpClientModule],
  exports: [FormsModule, AppRoutingModule, HttpClientModule],
})
export class CoreModule {}
