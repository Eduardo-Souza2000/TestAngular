import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {

  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  produtosService = inject(ProdutosService);



  constructor() {

  }

  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ

    this.produtosService.save(this.produto).subscribe({
      next: produto => { // QUANDO DÁ CERTO
        this.retorno.emit(produto);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });



  }


 

  

}


describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;
  let produtosServiceSimulador: jasmine.SpyObj<ProdutosService>;

  beforeEach(() => {
    const simuladorService = jasmine.createSpyObj('ProdutosService', ['save']);

    TestBed.configureTestingModule({
      declarations: [ProdutosdetailsComponent],
      providers: [{ provide: ProdutosService, useValue: simuladorService }],
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
    form.triggerEventHandler('ngSubmit', null);

    expect(produtosServiceSimulador.save).toHaveBeenCalledWith(product);
  });

  it('deve emitir evento retorno ao salvar com sucesso', () => {
    const product: Produto = { nome: 'Produto Teste', valor: 10, id: 1 };
    const salvaResultado: Observable<Produto> = of(product);
    component.produto = product;
    fixture.detectChanges();
    produtosServiceSimulador.save.and.returnValue(salvaResultado);
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.retorno.emit).toHaveBeenCalledWith(product);
  });
});