import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(
    waitForAsync(() => {
      // Configuração do TestBed com os componentes necessários
      TestBed.configureTestingModule({
        declarations: [FooterComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    // Criação de uma instância do componente
    fixture = TestBed.createComponent(FooterComponent);
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
