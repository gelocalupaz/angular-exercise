import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Routing } from './app-routing.module';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {})
  ],
  providers: [
    AuthGuardService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
