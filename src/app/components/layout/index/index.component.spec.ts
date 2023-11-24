import { ComponentFixture, TestBed, waitForAsync,  } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(
    waitForAsync(() => {
      // Configuração do TestBed com os componentes necessários e as rotas
      TestBed.configureTestingModule({
        declarations: [IndexComponent, HeaderComponent, FooterComponent],
        imports: [RouterTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    // Criação de uma instância do componente
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;

    // Inicialização do componente (se necessário)
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    // Verificação se o componente foi criado com sucesso
    expect(component).toBeTruthy();
  });

  it('deve renderizar os componentes de header e footer', () => {
    // Verificação se os componentes de header e footer estão presentes
    const headerComponent = fixture.debugElement.nativeElement.querySelector('app-header');
    const footerComponent = fixture.debugElement.nativeElement.querySelector('app-footer');

    expect(headerComponent).toBeTruthy();
    expect(footerComponent).toBeTruthy();
  });

});
