import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatModule } from './mat-module/mat-module';
import { IconModule } from './icons-module/icon-module';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { PrimeNgModule } from "./prime-ng-module/prime-ng-module";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeNgModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('podap-web');


}
