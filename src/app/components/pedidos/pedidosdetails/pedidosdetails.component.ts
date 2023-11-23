import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {

  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  pedidosService = inject(PedidosService);


  constructor() {

  }

  salvar() {
    //ISSO AQUI SERVE PARA EDITAR OU ADICIONAR... TANTO FAZ

    this.pedidosService.save(this.pedido).subscribe({
      next: pedido => { // QUANDO DÁ CERTO
        this.retorno.emit(pedido);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });



  }


  excluir(produto: Produto, indice: number) {

    this.pedido.produtos.splice(indice,1);
    
  }

  retornoProdutosList(produto: Produto) {

    if (this.pedido.produtos == null)
      this.pedido.produtos = [];

    this.pedido.produtos.push(produto);
    this.modalRef.dismiss();
}


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

  
}



describe('PedidosdetailsComponent', () => {
  let component: PedidosdetailsComponent;
  let fixture: ComponentFixture<PedidosdetailsComponent>;
  let PedidosServiceSimulador: jasmine.SpyObj<PedidosService>;

  beforeEach(() => {
    const simuladorService = jasmine.createSpyObj('PedidosService', ['save']);

    TestBed.configureTestingModule({
      declarations: [PedidosdetailsComponent],
      providers: [{ provide: PedidosService, useValue: simuladorService }],
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