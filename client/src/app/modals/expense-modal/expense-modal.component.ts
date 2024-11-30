import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './expense-modal.component.html',
})
export class ExpenseModalComponent {
  @Input() title: string = '';
  @Input() expense: any = {};
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  searchTerm: string = '';
  monthOptions: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  filteredMonths: string[] = this.monthOptions;

  filterMonths() {
    this.filteredMonths = this.monthOptions.filter(month =>
      month.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSave(): void {
    this.save.emit(this.expense);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
