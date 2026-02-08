import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';

@Component({
  selector: 'app-text-error-input-form',
  imports: [PrimeNgModule, CommonModule],
  templateUrl: './text-error-input-form.html',
  styleUrl: './text-error-input-form.scss'
})
export class TextErrorInputForm {
  @Input({ required: true }) public expression: boolean = false;
  @Input({ required: true }) public message: string = '';
}
