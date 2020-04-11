import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestIdInputComponent } from './pages/quest-id-input-page/quest-id-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCardModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatListModule, MatSelectModule,
  MatOptionModule, MatRadioModule, MatIconModule } from '@angular/material';
import { QuestionnairePageComponent } from './pages/questionnaire-page/questionnaire-page.component';
import { ErrorDialogPopupComponent } from './components/error-dialog-popup/error-dialog-popup.component';
import { TextCardComponent } from './components/text-card/text-card.component';
import { QuestionBlockComponent } from './components/question-block/question-block.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooditemComponent } from './pages/fooditem/fooditem.component';
import{ ReactiveFormsModule} from '@angular/forms';
import { AdminHeaderComponent } from './pages/admin-header/admin-header.component';
import { QuestResultsComponent } from './pages/quest-results/quest-results.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import {PopupComponent} from "./components/popup/popup.component";
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Routes, RouterModule } from '@angular/router';
import { RecommendModalComponent } from './components/recommend-modal/recommend-modal.component';
import { FoodRecommendModalComponent } from './components/food-recommend-modal/food-recommend-modal.component';
import { ClinicalPortalComponent } from './pages/clinical-portal/clinical-portal.component';
import { ClinicalHeaderComponent } from './pages/clinical-header/clinical-header.component';
import { ParentalHeaderComponent } from './pages/parental-header/parental-header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { JwtInterceptor } from './services/authentication/jwt.interceptor';
import { fakeBackendProvider } from './services/authentication/temp-backend';
import { RecommendParentalComponent } from './pages/recommend-parental/recommend-parental.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { TrackerBlockComponent } from './components/tracker-block/tracker-block.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TrackerHistoryPageComponent } from './pages/tracker-history-page/tracker-history-page.component';
import { HistoryParentalComponent } from './pages/history-parental/history-parental.component';




@NgModule({
  declarations: [
    AppComponent,
    QuestIdInputComponent,
    QuestionnairePageComponent,
    ErrorDialogPopupComponent,
    TextCardComponent,
    QuestionBlockComponent,
    ResultsPageComponent,
    AdminPageComponent,
    FooditemComponent,
    AdminHeaderComponent,
    QuestResultsComponent,
    RecommendComponent,
    PopupComponent,
    RecommendModalComponent,
    FoodRecommendModalComponent,
    ClinicalPortalComponent,
    ClinicalHeaderComponent,
    ParentalHeaderComponent,
    LoginPageComponent,
    RecommendParentalComponent,
    TrackerPageComponent,
    TrackerBlockComponent,
    TrackerHistoryPageComponent,
    HistoryParentalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    FlashMessagesModule.forRoot(),
   ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogPopupComponent, ResultsPageComponent,PopupComponent,RecommendModalComponent,FoodRecommendModalComponent]
})
export class AppModule { }
