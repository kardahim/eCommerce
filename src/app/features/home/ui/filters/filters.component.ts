import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  @Output() searchbarChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<string>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: [''],
      sortBy: ['nameAsc'],
    });
  }

  onSearchbarChange() {
    const search = this.filterForm.get('search')?.value || '';
    this.searchbarChanged.emit(search);
  }

  onSortChange() {
    const sortBy = this.filterForm.get('sortBy')?.value || '';
    this.sortChanged.emit(sortBy);
  }
}
