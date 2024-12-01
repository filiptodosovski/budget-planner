import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonthService } from "../../_services/months.service";
import { Months } from "../../_models/months";
import { CategoryService } from "../../_services/category.service";
import { ICategory } from "../../_models/category";
import { IExpense } from "../../_models/expense";

@Component({
  selector: 'app-modal',
  templateUrl: './expense-modal.component.html',
})
export class ExpenseModalComponent {
  @Input() title: string = '';
  @Input() expense: IExpense = this.initializeExpense();
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<IExpense>();
  @Output() cancel = new EventEmitter<void>();

  searchTerm: string = '';
  categorySearchTerm: string = '';
  monthOptions: string[] = [];
  filteredMonths: string[] = [];
  currentYear: number = new Date().getFullYear();
  categories: ICategory[] = [];
  filteredCategories: ICategory[] = [];
  years: number[] = [];

  constructor(private monthService: MonthService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadMonths();
    this.generateYears();
    this.loadCategories();
  }

  private loadMonths(): void {
    this.monthService.getMonths().subscribe(
      (response: Months) => {
        this.monthOptions = response.months;
        this.filteredMonths = [...this.monthOptions];
        this.searchTerm = this.expense?.month || this.monthOptions[0];
      },
      (error) => {
        console.error('Error fetching months:', error);
      }
    );
  }

  filterMonths(): void {
    this.filteredMonths = this.monthOptions.filter(month =>
      month.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  private generateYears(): void {
    const startYear = this.currentYear;
    const endYear = 2035;
    this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    this.expense.year = this.expense.year || this.currentYear;
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: ICategory[]) => {
        this.categories = categories;
        this.filteredCategories = [...categories];
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onCategorySelect(category: ICategory): void {
    this.categorySearchTerm = category.name;
    this.expense.category = category.name;
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.categorySearchTerm.toLowerCase())
    );
  }

  addNewCategory(): void {
    if (this.categorySearchTerm.trim()) {
      const newCategoryName = this.categorySearchTerm.trim();
      this.categoryService.addCategory({ name: newCategoryName }).subscribe(
        () => {
          this.loadCategories();
          this.expense.category = newCategoryName;
          this.categorySearchTerm = '';
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  onSave(): void {
    if (this.isValidExpense(this.expense)) {
      this.expense.month = this.searchTerm;
      this.expense.category = this.categorySearchTerm;
      this.expense.amount = parseFloat(this.expense.amount.toFixed(2));
      this.save.emit(this.expense);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private isValidExpense(expense: IExpense): boolean {
    if (!expense.amount || expense.amount <= 0) {
      console.error('Invalid amount');
      return false;
    }
    return true;
  }

  private initializeExpense(): IExpense {
    return {
      month: '',
      year:0,
      category: '',
      amount: 0.0,
      type: '',
    };
  }
}
