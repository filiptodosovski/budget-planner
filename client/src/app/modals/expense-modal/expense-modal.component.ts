import { Component, EventEmitter, Input, Output  } from '@angular/core';
import {MonthService} from "../../_services/months.service";
import {Months} from "../../_models/months";
import {CategoryService} from "../../_services/category.service";
import {ICategory} from "../../_models/category";

@Component({
  selector: 'app-modal',
  templateUrl: './expense-modal.component.html',
})
export class ExpenseModalComponent {
  @Input() title: string = '';
  @Input() expense: any = {}; // Assume expense has a property 'year' to store the selected year
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();


  searchTerm: string = ''; // This is used for filtering the months
  categorySearchTerm: string = '';
  monthOptions: string[] = []; // Initially empty, will be populated by the service
  filteredMonths: string[] = [];
  currentYear: number = new Date().getFullYear(); // Get the current year
  categories: ICategory[] = [];  // Categories fetched from API
  filteredCategories: ICategory[] = [];

  years: number[] = []; // Array to hold the years from the current year to 2035

  constructor(private monthService: MonthService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadMonths(); // Call the service to load months when the component initializes
    this.generateYears(); // Generate the years list
    this.loadCategories()
  }

  loadMonths(): void {
    this.monthService.getMonths().subscribe(
      (response: Months) => {
        this.monthOptions = response.months; // Assign fetched months to the monthOptions array
        this.filteredMonths = this.monthOptions; // Initially, display all months

        // Set the default selected month based on expense or use the first month in the list
        this.searchTerm = this.expense?.month || this.monthOptions[0];
      },
      (error) => {
        console.error('Error fetching months:', error);
      }
    );
  }

  filterMonths() {
    this.filteredMonths = this.monthOptions.filter(month =>
      month.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Generate years from the current year to 2035
  generateYears(): void {
    const startYear = this.currentYear;
    const endYear = 2035;
    this.years = [];
    for (let year = startYear; year <= endYear; year++) {
      this.years.push(year);
    }

    this.expense.year = this.expense.year || this.currentYear;
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: ICategory[]) => {
        // Map category objects to just names for easier display
        this.categories = categories
        this.filteredCategories = [...this.categories]; // Initialize filtered categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }



  onCategorySelect(category: ICategory): void {
    this.categorySearchTerm = category.name;  // Only assign the category name to the search term
    this.expense.category = category.name;  // Optionally, set the selected category in your expense model
  }

// Adjusting the filterCategories function to properly filter based on the name
  filterCategories() {
    this.filteredCategories = this.categories.filter((category: ICategory) =>
      category.name.toLowerCase().includes(this.categorySearchTerm.toLowerCase())  // Compare names
    );
  }

  addNewCategory() {
    if (this.categorySearchTerm.trim()) {
      const newCategoryName = this.categorySearchTerm.trim(); // Get the name directly
      this.categoryService.addCategory({ name: newCategoryName }).subscribe(
        () => {
          // Reload the categories after adding the new one
          this.loadCategories();

          // Optionally, set the expense's category to the new one
          this.expense.category = newCategoryName;

          // Clear the search term
          this.categorySearchTerm = '';
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  // addExpense(): void {
  //   this.expenseService.addExpense(this.expense).subscribe(
  //     (response: IExpense) => {
  //       console.log('Expense added:', response);
  //       this.save.emit(response);
  //     },
  //     (error) => console.error('Error adding expense:', error)
  //   );
  // }



  onSave(): void {
    this.expense.month = this.searchTerm; // Save the selected month
    this.expense.category = this.categorySearchTerm;
    this.expense.amount = parseFloat(this.expense.amount.toFixed(2));
    this.save.emit(this.expense);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
