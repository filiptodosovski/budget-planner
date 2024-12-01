import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient} from "@angular/common/http";
import {NavComponent} from "./nav/nav.component";
import {AppRoutingModule} from "./app.routes";
import {ExpenseModalComponent} from "./modals/expense-modal/expense-modal.component";
import {ExpenseComponent} from "./expenses/expenses.component";
import {HomeComponent} from "./home/home.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RevenueModalComponent} from "./modals/revenue-modal/revenue-modal.component";
import {RevenuesComponent} from "./revenues/revenues.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ExpenseModalComponent,
    ExpenseComponent,
    HomeComponent,
    RevenueModalComponent,
    RevenuesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  exports: [
    NavComponent,
    ExpenseComponent
  ]
})
export class AppModule {}
