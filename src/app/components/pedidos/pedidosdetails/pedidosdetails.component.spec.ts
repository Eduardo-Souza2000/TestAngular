import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { PedidosdetailsComponent } from './pedidosdetails.component';
import { Pedido } from 'src/app/models/pedido';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos-service';

describe('PedidosdetailsComponent', () => {
  let component: PedidosdetailsComponent;
  let fixture: ComponentFixture<PedidosdetailsComponent>;
  let PedidosServiceSimulador: jasmine.SpyObj<PedidosService>;

  beforeEach(() => {
    const simuladorService = jasmine.createSpyObj('PedidosService', ['save']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PedidosdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
      
    });

    fixture = TestBed.createComponent(PedidosdetailsComponent);
    component = fixture.componentInstance;
    PedidosServiceSimulador = TestBed.inject(PedidosService) as jasmine.SpyObj<PedidosService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método save no envio do formulário', () => {
    const pedido: Pedido = { obs: 'Pedido Teste', produtos: [], id:1 }; 

    component.pedido = pedido;
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(PedidosServiceSimulador.save).toHaveBeenCalledWith(pedido);
  });

  it('deve emitir evento retorno ao salvar com sucesso', () => {
    const pedido: Pedido = { obs: 'Pedido Teste', produtos: [], id:1 }; 
    const salvaResultado: Observable<Pedido> = of(pedido);
    component.pedido = pedido;
    fixture.detectChanges();
    PedidosServiceSimulador.save.and.returnValue(salvaResultado);
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.retorno.emit).toHaveBeenCalledWith(pedido);
  });
});