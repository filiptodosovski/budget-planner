import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // For forms
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component'; // Import your login component
import { provideHttpClient} from "@angular/common/http";
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
