
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PedidoslistComponent } from './pedidoslist.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos-service';

describe('PedidoslistComponent', () => {
  let component: PedidoslistComponent;
  let fixture: ComponentFixture<PedidoslistComponent>;
  let mockPedidoService: jasmine.SpyObj<PedidosService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(
    waitForAsync(() => {
      // Criação simuladores para o serviço de Pedidos e serviço de modal
      mockPedidoService = jasmine.createSpyObj('PedidosService', ['listAll']);
      mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

      // Configuração do TestBed com os componentes necessários e serviços simulados
      /*TestBed.configureTestingModule({
        declarations: [PedidoslistComponent],
        providers: [
          { provide: PedidosService, useValue: mockPedidoService },
          { provide: NgbModal, useValue: mockModalService },
        ],
      }).compileComponents();*/

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PedidoslistComponent],
        providers: [
          { provide: PedidosService, useValue: mockPedidoService },
          { provide: NgbModal, useValue: mockModalService },
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
        ]
        
    })
    })
  );
  
  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoslistComponent);
    component = fixture.componentInstance;
    mockPedidoService.listAll.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    // Verifica se o componente foi criado com sucesso
    expect(component).toBeTruthy();
  });

  it('deve chamar o método listAll na inicialização', () => {
    // Verifica se o método listAll foi chamado durante a inicialização
    expect(mockPedidoService.listAll).toHaveBeenCalled();
  });

  it('deve abrir modal no método adicionar', () => {
    // Criação de um modal simulado e configuração do spy para retornar o modal simulado
    const mockModalRef: NgbModalRef = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    mockModalService.open.and.returnValue(mockModalRef);

    // Chamada do método adicionar
    component.adicionar({});

    // Verifica se o método open do serviço de modal foi chamado corretamente
    expect(mockModalService.open).toHaveBeenCalledOnceWith({}, { size: 'sm' });
  });

  it('deve abrir modal no método editar', () => {
    // Criação de um modal simulado e configuração do spy para retornar o modal simulado
    const mockModalRef: NgbModalRef = jasmine.createSpyObj('NgbModalRef', ['componentInstance']);
    mockModalService.open.and.returnValue(mockModalRef);

    // Criação de um Pedido simulado
    const mockPedido: Pedido = { id: 1, obs: 'Pedido Teste', produtos: [] };

    // Chamada do método editar
    component.editar({}, mockPedido, 0);

    // Verifica se o método open do serviço de modal foi chamado corretamente
    expect(mockModalService.open).toHaveBeenCalledOnceWith({}, { size: 'sm' });
  });

 
});
