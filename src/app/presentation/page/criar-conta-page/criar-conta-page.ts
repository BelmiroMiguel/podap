import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { RouterLink } from "@angular/router";
import { CadastroUsuarioFormComponent } from "../../components/forms/cadastro-usuario-form-component/cadastro-usuario-form-component";

@Component({
  selector: 'app-criar-conta-page',
  imports: [PrimeNgModule, IconModule, RouterLink, CadastroUsuarioFormComponent],
  templateUrl: './criar-conta-page.html',
  styleUrl: './criar-conta-page.scss',
})
export class CriarContaPage {

}
