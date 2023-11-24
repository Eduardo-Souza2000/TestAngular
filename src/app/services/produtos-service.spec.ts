import { TestBed } from '@angular/core/testing';
import { ProdutosService } from './produtos-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProdutoslistComponent } from '../components/produtos/produtoslist/produtoslist.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';


describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProdutoslistComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
      
  })});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
