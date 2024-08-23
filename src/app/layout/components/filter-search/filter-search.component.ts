import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Category, SearchFilter } from '../../../../type';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-filter-search',
  standalone: true,
  imports: [FormsModule, DialogModule, CommonModule, ButtonModule, SliderModule, RatingModule, DropdownModule
  ],
  templateUrl: './filter-search.component.html',
  styleUrl: './filter-search.component.scss'
})

export class FilterSearchComponent {
  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService) { }
  @Input() display: boolean = false;
  @Input() header: string = '';
  @Output() search = new EventEmitter<SearchFilter>;
  minPrice: number = 0;
  maxPrice: number = 10000;
  statusOptions = [
    { name: 'Available', value: 'available' },
    { name: 'Out of Stock', value: 'out of stock' }
  ];

  categoryOptions: {name: string, value: string}[] = [];

  @Input() searchFilter: SearchFilter = {
    rangePrice: [this.minPrice, this.maxPrice],
    name: '',
    rating: 0,
    status: '',
    category_id: 0,
  };

  onSearch() {
    this.search.emit(this.searchFilter);
    this.display = false;
  }

  onReset() {
    this.minPrice = 0;
    this.maxPrice = 10000;
    this.searchFilter = {
      rangePrice: [this.minPrice, this.maxPrice],
      name: '',
      rating: 0,
      status: '',
      category_id: 0,
    }
  }

  

  LoadCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      response.map(item => this.categoryOptions.push({name: item.name, value: item.id.toString()}));
    });
    console.log(this.categoryOptions);
    console.log(this.statusOptions);
  }

  showDialogSearch() {
    this.display = true;
  }

  ngOnInit(){
    this.LoadCategories();
  }

  onStatusChange(selectedStatus: any): void {
    this.searchFilter.status = selectedStatus.value.value;
    // Thực hiện các hành động cần thiết khi giá trị status thay đổi
  }

  onCategoryChange(selectedCategory: any): void {
    if(selectedCategory.value!= null){
      console.log(selectedCategory);
      this.searchFilter.category_id = selectedCategory.value.value;
    }
  }

}

