import { Component, Input } from '@angular/core';
import { MatModule } from '../../../mat-module/mat-module';
import { IconModule } from '../../../icons-module/icon-module';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { OcorrenciaModel } from '../../../data/models';
import { FormatDatePipe } from '../../../utils/pipes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-card-component',
  imports: [PrimeNgModule, IconModule, FormatDatePipe, RouterLink],
  templateUrl: './item-card-component.html',
  styleUrl: './item-card-component.scss',
})
export class ItemCardComponent {
  @Input({ required: true }) public ocorrencia!: OcorrenciaModel;

}
