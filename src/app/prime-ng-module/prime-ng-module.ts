import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgComponents } from './prime-ng';
import { TooltipDefaultDirective } from '../utils/directive';



@NgModule({
  imports: [
    CommonModule,
    ...PrimeNgComponents,
    TooltipDefaultDirective,
  ],
  exports: PrimeNgComponents
})
export class PrimeNgModule { }
