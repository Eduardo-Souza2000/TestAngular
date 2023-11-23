import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidoslist',
  templateUrl: './pedidoslist.component.html',
  styleUrls: ['./pedidoslist.component.scss']
})
export class PedidoslistComponent {

  lista: Pedido[] = [];


  objetoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  pedidosService = inject(PedidosService);

  constructor() {

    this.listAll();
    //this.exemploErro();

  }


  listAll() {

    this.pedidosService.listAll().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  exemploErro() {

    this.pedidosService.exemploErro().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }






  // MÉTODOS DA MODAL

  adicionar(modal: any) {
    this.objetoSelecionadoParaEdicao = new Pedido();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  editar(modal: any, pedido: Pedido, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, pedido); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  addOuEditarPedido(pedido: Pedido) {

    this.listAll();

    this.modalService.dismissAll();

  }
}


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
      TestBed.configureTestingModule({
        declarations: [PedidoslistComponent],
        providers: [
          { provide: PedidosService, useValue: mockPedidoService },
          { provide: NgbModal, useValue: mockModalService },
        ],
      }).compileComponents();
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