import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { MaterialModule } from '@angular/material';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
    MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { DishService } from './services/dish.service';
import { PromotionService } from './services/promotion.service';
import { LeadersService } from './services/leaders.service';
import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
      MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
      MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
      MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
      MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule,    FlexLayoutModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [ DishService,
        PromotionService,
        LeadersService,
        ProcessHTTPMsgService,
      { provide: 'BaseURL', useValue: baseURL } ],
  entryComponents: [ LoginComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
