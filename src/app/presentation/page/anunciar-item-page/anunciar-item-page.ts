import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../../../prime-ng-module/prime-ng-module';
import { IconModule } from '../../../icons-module/icon-module';
import { HeaderComponent } from "../../components/header-component/header-component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaProdutoProvider } from '../../../providers/categoria-produto.provider';
import { OcorrenciaProvider } from '../../../providers/ocorrencia.provider';
import { UsuarioStateProvider } from '../../../providers/usuario.state.provider';
import { UsuarioService } from '../../../services/usuario.service';
import { getAlertSuccess, getAlertError } from '../../../utils/utils';
import { TextErrorInputForm } from "../../components/text-error-input-form/text-error-input-form";
import { CategoriaModel } from '../../../data/models';
// Interface para organizar as previews
interface FotoPreview {
  file: File;
  url: any;
}

@Component({
  selector: 'app-anunciar-item-page',
  imports: [PrimeNgModule, IconModule, ReactiveFormsModule, TextErrorInputForm],
  templateUrl: './anunciar-item-page.html',
  styleUrl: './anunciar-item-page.scss',
})
export class AnunciarItemPage implements OnInit {

  fotoPrincipal: FotoPreview | null = null;
  fotosSecundarias: FotoPreview[] = [];
  readonly MAX_SECUNDARIAS = 4; // Total 5 fotos (1 principal + 4 secundárias)
  public categoriasCarregadas: Array<CategoriaModel> = [];



  public isLoadPublicarOcorrencia = false;
  public isLoadCategorias = false;

  public formOcorrencia = new FormGroup({
    idCategoria: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    titulo: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(255)]
    }),
    descricao: new FormControl<string>('', {
      validators: [Validators.required]
    }),

    // Fotos (Controle para o array de arquivos)
    fotos: new FormControl<File[] | null>(null, {
      validators: [Validators.maxLength(5)]
    }),

    // Dados da Ocorrência
    tipoOcorrencia: new FormControl<'PERDIDO' | 'ACHADO' | null>(null, {
      validators: [Validators.required]
    }),
    dataEvento: new FormControl<string | Date>('', {
      validators: [Validators.required]
    }),
    localEvento: new FormControl<string>('', {
      validators: [Validators.required, Validators.maxLength(255)]
    }),

    // Dados de Custódia
    idArmazem: new FormControl<number | null>(null)
  });


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private ocorrenciaService: OcorrenciaProvider,
    private usuarioStateProvider: UsuarioStateProvider,
    private categoriaProdutoProvider: CategoriaProdutoProvider,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.carregarCategorias()
  }

  publicarOcorrencia() {
    if (this.formOcorrencia.invalid || this.isLoadPublicarOcorrencia) {
      this.formOcorrencia.markAllAsTouched();
      return;
    }

    if (!this.fotoPrincipal || !this.fotoPrincipal.file) {
      this.messageService.add(getAlertError({ subTitulo: 'Adicione uma foto rpincipal do item' }))
      return
    }

    this.ocorrenciaService.create(this.formOcorrencia.value as any, {
      onSuccess: (data) => {
        this.messageService.add(getAlertSuccess({
          subTitulo: data.message
        }));
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 800);
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }));
      },
      onLoad: () => this.isLoadPublicarOcorrencia = true,
      onFinally: () => this.isLoadPublicarOcorrencia = false,
    });
  }


  public carregarCategorias() {
    if (this.isLoadCategorias) return;

    this.categoriaProdutoProvider.findAll({
      limit: 100,
    }, {
      onSuccess: (data) => {
        this.categoriasCarregadas = data.body;
      },
      onError: ({ error }) => {
        this.messageService.add(getAlertError({
          subTitulo: error.message
        }))
      },
      onLoad: () => this.isLoadCategorias = true,
      onFinally: () => this.isLoadCategorias = false,
    })
  }


  // 1. SETAR FOTO PRINCIPAL
  setFotoPrincipal(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoPrincipal = { file, url: e.target?.result || null };
        this.sincronizarFormulario();
      };
      reader.readAsDataURL(file);
    }
  }

  // 2. ADICIONAR FOTOS SECUNDÁRIAS
  addFotosSecundarias(event: any) {
    const files: FileList = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      console.log(file);

      if (this.fotosSecundarias.length < this.MAX_SECUNDARIAS && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fotosSecundarias.push({ file, url: e.target?.result || null });
          this.sincronizarFormulario();
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = ''; // Limpa o input
  }

  removerSecundaria(index: number) {
    this.fotosSecundarias.splice(index, 1);
    this.sincronizarFormulario();
  }

  private sincronizarFormulario() {
    // Junta a principal com as secundárias num único array para o Laravel
    const todas = [];
    if (this.fotoPrincipal) todas.push(this.fotoPrincipal.file);
    todas.push(...this.fotosSecundarias.map(f => f.file));

    this.formOcorrencia.patchValue({ fotos: todas });
  }

}
