import { Component, Input } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { OcorrenciaModel } from '../../../data/models';

@Component({
  selector: 'app-item-card-skeleton',
  imports: [PrimeNgModule, IconModule],
  templateUrl: './item-card-skeleton.html',
  styleUrl: './item-card-skeleton.scss',
})
export class ItemCardSkeleton {
}
