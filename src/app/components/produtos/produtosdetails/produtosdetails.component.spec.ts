import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos-service';
import { ProdutosdetailsComponent } from './produtosdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;
  let produtosServiceSimulador: jasmine.SpyObj<ProdutosService>;

  beforeEach(() => {
    const simuladorService = jasmine.createSpyObj('ProdutosService', ['save']);
/*
    TestBed.configureTestingModule({
      declarations: [ProdutosdetailsComponent],
      providers: [{ provide: ProdutosService, useValue: simuladorService }],
    });*/

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProdutosdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
      
    });

    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    produtosServiceSimulador = TestBed.inject(ProdutosService) as jasmine.SpyObj<ProdutosService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método save no envio do formulário', () => {
    const product: Produto = { nome: 'Produto Teste', valor: 10, id: 1 };

    component.produto = product;
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(produtosServiceSimulador.save).toHaveBeenCalledWith(product);
  });

  it('deve emitir evento retorno ao salvar com sucesso', () => {
    const product: Produto = { nome: 'Produto Teste', valor: 10, id: 1 };
    const salvaResultado: Observable<Produto> = of(product);
    component.produto = product;
    fixture.detectChanges();
    produtosServiceSimulador.save.and.returnValue(salvaResultado);
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(component.retorno.emit).toHaveBeenCalledWith(product);
  });
});