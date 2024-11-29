import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // For forms
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Import your login component
import { provideHttpClient} from "@angular/common/http";
import {NavComponent} from "./nav/nav.component";
import {AppRoutingModule} from "./app.routes";
import {ExpenseModalComponent} from "./modals/expense-modal/expense-modal.component";
import {ExpenseComponent} from "./expenses/expenses.component";
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    ExpenseModalComponent,
    ExpenseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  exports: [
    NavComponent,
    ExpenseComponent
  ]
})
export class AppModule {}
