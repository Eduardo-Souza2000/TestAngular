import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(
    waitForAsync(() => {
      // Criação de um spy para o serviço de roteamento
      const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

      // Configuração do TestBed com os componentes necessários e serviços simulados
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [LoginComponent],
      }).compileComponents();

      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    })
  );

  beforeEach(() => {
    // Criação de uma instância do componente
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    // Inicialização do componente (se necessário)
    fixture.detectChanges();
  });

  it('deve redirecionar para admin/pedidos ao logar com credenciais corretas', () => {
    // Definição de credenciais corretas
    component.usuario.login = 'admin';
    component.usuario.senha = 'admin';
  
    // Acionamento do método logar
    component.logar();
  
    // Verificação se o método navigate do serviço de roteamento foi chamado corretamente
    expect(router.navigate).toHaveBeenCalledWith(['admin/pedidos']);
  });
  

  it('deve exibir um alerta ao logar com credenciais incorretas', () => {
    // Definição de credenciais incorretas
    component.usuario.login = 'usuario_incorreto';
    component.usuario.senha = 'senha_incorreta';

    // Espionagem do método alert
    spyOn(window, 'alert');

    // Acionamento do método logar
    component.logar();

    // Verificação se o método alert foi chamado corretamente
    expect(window.alert).toHaveBeenCalledWith('Login ou senha incorretos!');
  });

});


