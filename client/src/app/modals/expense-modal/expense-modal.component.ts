import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './expense-modal.component.html',
})
export class ExpenseModalComponent {
  @Input() title: string = '';
  @Input() expense: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit(this.expense);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
