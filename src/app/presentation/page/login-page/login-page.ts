import { Component } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { Router, RouterLink } from "@angular/router";
import { FormGroup, FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { TextErrorInputForm } from "../../components/text-error-input-form/text-error-input-form";
import { MessageService } from 'primeng/api';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { getUrlParams } from '../../../utils/utils';

@Component({
  selector: 'app-login-page',
  imports: [PrimeNgModule, IconModule, RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule, TextErrorInputForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  public sessionRout = '';
  public isLoadLogin = false;

  public formLogin = new FormGroup({
    login: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    senha: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] }),
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioStateProvider: UsuarioStateProvider,
    private messageService: MessageService
  ) { }

  public ngAfterContentInit(): void {
    const paramObj: any = getUrlParams(this.router)
    this.sessionRout = paramObj?.['returnUrl'] ?? this.sessionRout;
  }

  public async onSubmit() {
    if (this.isLoadLogin) return;

    if (this.formLogin.valid) {
      this.usuarioService.loginUsuario(
        this.formLogin.value.login!, this.formLogin.value.senha!,
        {
          onSuccess: (data) => {
            this.messageService.add({ key: 'mainToast', severity: 'success', summary: 'Sucesso', detail: data.message, life: 3000 });

            setTimeout(() => {
              this.usuarioStateProvider.setState = data.body;
              this.usuarioStateProvider.setToken(data.token!);
              this.router.navigate([this.sessionRout]);
            }, 50);
          },
          onError: (error) => {
            this.messageService.add({
              key: 'mainToast',
              severity: 'error',
              summary: 'Acesso Negado',
              detail: error.error.message || 'Erro ao cadastrar empresa',
            });
          },

          onLoad: () => this.isLoadLogin = true,
          onFinally: () => this.isLoadLogin = false,
        }
      );
    } else {
      this.formLogin.markAllAsTouched();
    }

    return false;
  }

}
