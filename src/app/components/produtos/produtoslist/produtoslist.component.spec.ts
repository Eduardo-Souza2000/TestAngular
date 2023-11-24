import { ProdutoslistComponent } from './produtoslist.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProdutoslistComponent', () => {
  let component: ProdutoslistComponent;
  let fixture: ComponentFixture<ProdutoslistComponent>;
  let mockProdutosService: jasmine.SpyObj<ProdutosService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(()=>{ 
    // Configuração do TestBed com os componentes necessários e serviços simulados
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProdutoslistComponent],
        providers: [
          { provide: ProdutosService, useValue: mockProdutosService },
          { provide: NgbModal, useValue: mockModalService },
        ],
        schemas: [
          CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
        ]
        
    })}
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
