import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductsService } from '../services/products.service';
import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchFilter } from '../../type';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: ProductsService;
  let messageService: MessageService;
  let store: Store;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
    
    await TestBed.configureTestingModule({
      imports: [ProductComponent, HttpClientTestingModule],
      providers: [MessageService, ProductsService, provideMockStore({
        initialState: {
          cart: { initialState: [] }
        }
      }), { provide: ProductsService, useValue: productServiceSpy }]
    })
      .compileComponents();
    store = TestBed.inject(Store);
    productService = TestBed.inject(ProductsService);
    messageService = TestBed.inject(MessageService);


    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the getProduct func', () => {
    const mockSearchFilter: SearchFilter = {
      rangePrice: [0, 10000],
      name: '',
      rating: 0,
      status: '',
      category_id: 0,
    };
    expect(productService.getProducts(1, 10, mockSearchFilter)).toHaveBeenCalled();
  })
});
