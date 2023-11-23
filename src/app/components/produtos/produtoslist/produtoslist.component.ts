import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtoslist',
  templateUrl: './produtoslist.component.html',
  styleUrls: ['./produtoslist.component.scss']
})
export class ProdutoslistComponent {

  lista: Produto[] = [];

  @Output() retorno = new EventEmitter<Produto>();
  @Input() modoLancamento: boolean = false;


  objetoSelecionadoParaEdicao: Produto = new Produto();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;
  produtosService = inject(ProdutosService);

  constructor() {

    this.listAll();
    //this.exemploErro();

  }


  listAll() {

    this.produtosService.listAll().subscribe({
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

    this.produtosService.exemploErro().subscribe({
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
    this.objetoSelecionadoParaEdicao = new Produto();
    this.indiceSelecionadoParaEdicao = -1;

    this.modalRef = this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, produto: Produto, indice: number) {
    this.objetoSelecionadoParaEdicao = Object.assign({}, produto); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalRef = this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarProduto(produto: Produto) {

    this.listAll();

    this.modalService.dismissAll();
  }


  lancamento(produto: Produto){
    this.retorno.emit(produto);
  }




}

describe('ProdutoslistComponent', () => {
  let component: ProdutoslistComponent;
  let fixture: ComponentFixture<ProdutoslistComponent>;
  let mockProdutosService: jasmine.SpyObj<ProdutosService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(
    waitForAsync(() => {
      // Criação simuladores para o serviço de produtos e serviço de modal
      mockProdutosService = jasmine.createSpyObj('ProdutosService', ['listAll']);
      mockModalService = jasmine.createSpyObj('NgbModal', ['open']);

      // Configuração do TestBed com os componentes necessários e serviços simulados
      TestBed.configureTestingModule({
        declarations: [ProdutoslistComponent],
        providers: [
          { provide: ProdutosService, useValue: mockProdutosService },
          { provide: NgbModal, useValue: mockModalService },
        ],
      }).compileComponents();
    })
  );
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoslistComponent);
    component = fixture.componentInstance;
    mockProdutosService.listAll.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    // Verifica se o componente foi criado com sucesso
    expect(component).toBeTruthy();
  });

  it('deve chamar o método listAll na inicialização', () => {
    // Verifica se o método listAll foi chamado durante a inicialização
    expect(mockProdutosService.listAll).toHaveBeenCalled();
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

    // Criação de um produto simulado
    const mockProduto: Produto = { id: 1, nome: 'Produto Teste', valor: 10 };

    // Chamada do método editar
    component.editar({}, mockProduto, 0);

    // Verifica se o método open do serviço de modal foi chamado corretamente
    expect(mockModalService.open).toHaveBeenCalledOnceWith({}, { size: 'sm' });
  });

  it('deve emitir produto no método de lançamento', () => {
    // Criação de um produto simulado
    const mockProduto: Produto = { id: 1, nome: 'Produto Teste', valor: 10 };

    // Configuração do spy para o método emit do EventEmitter
    spyOn(component.retorno, 'emit');

    // Chamada do método lancamento
    component.lancamento(mockProduto);

    // Verifica se o método emit do EventEmitter foi chamado corretamente
    expect(component.retorno.emit).toHaveBeenCalledWith(mockProduto);
  });
});