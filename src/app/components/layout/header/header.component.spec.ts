import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      // Configuração do TestBed com os componentes necessários
      TestBed.configureTestingModule({
        declarations: [HeaderComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    // Criação de uma instância do componente
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Inicialização do componente (se necessário)
    fixture.detectChanges();
  });

  it('deve renderizar o componente de navegação corretamente', () => {
    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar).toBeTruthy();

    const links = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(links.length).toBe(3); 

  });

});

