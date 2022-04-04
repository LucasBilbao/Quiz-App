import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '../app-routing/app-routing.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CoreModule {}
