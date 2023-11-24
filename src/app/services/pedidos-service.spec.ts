import { TestBed } from '@angular/core/testing';

import { PedidosService } from './pedidos-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PedidosService', () => {
  let service: PedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PedidosService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
      
  })});


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
