import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { HeroiComponent } from "../../components/heroi-component/heroi-component";
import { HeaderComponent } from "../../components/header-component/header-component";
import { FilterBarComponent } from "../../components/filter-bar-component/filter-bar-component";
import { ItemCardComponent } from "../../components/item-card-component/item-card-component";
import { ItemCardSkeleton } from "../../components/item-card-skeleton/item-card-skeleton";
import { SideBarComponent } from "../../components/side-bar-component/side-bar-component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-main-page',
  imports: [PrimeNgModule, IconModule,  HeaderComponent, RouterModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

}
