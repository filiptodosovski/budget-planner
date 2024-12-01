import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonthService } from "../../_services/months.service";
import { Months } from "../../_models/months";
import { CategoryService } from "../../_services/category.service";
import { ICategory } from "../../_models/category";
import {IRevenue} from "../../_models/revenue";

@Component({
  selector: 'app-revenue-modal',
  templateUrl: './revenue-modal.component.html',
})
export class RevenueModalComponent {
  @Input() title: string = '';
  @Input() revenue: IRevenue = this.initializeRevenue();
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<IRevenue>();
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

    if (this.revenue?.category) {
      this.categorySearchTerm = this.revenue.category;
    }
  }

  private loadMonths(): void {
    this.monthService.getMonths().subscribe(
      (response: Months) => {
        this.monthOptions = response.months;
        this.filteredMonths = [...this.monthOptions];
        this.searchTerm = this.revenue?.month || this.monthOptions[0];
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
    this.revenue.year = this.revenue.year || this.currentYear;
  }

  private loadCategories(): void {
    this.categoryService.getRevenueCategories().subscribe(
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
    this.revenue.category = category.name;
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.categorySearchTerm.toLowerCase())
    );
  }

  addNewCategory(): void {
    if (this.categorySearchTerm.trim()) {
      const newCategoryName = this.categorySearchTerm.trim();
      this.categoryService.addRevenueCategory({ name: newCategoryName }).subscribe(
        () => {
          this.loadCategories();
          this.revenue.category = newCategoryName;
          this.categorySearchTerm = '';
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  onSave(): void {
    if (this.isValidRevenue(this.revenue)) {
      this.revenue.month = this.searchTerm;
      this.revenue.category = this.categorySearchTerm;
      this.revenue.amount = parseFloat(this.revenue.amount.toFixed(2));
      this.save.emit(this.revenue);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private isValidRevenue(revenue: IRevenue): boolean {
    if (!revenue.amount || revenue.amount <= 0) {
      console.error('Invalid amount');
      return false;
    }
    return true;
  }

  private initializeRevenue(): IRevenue {
    return {
      month: '',
      year:0,
      category: '',
      amount: 0.0,
      type: '',
    };
  }
}
