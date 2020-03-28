import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {QuestionnairePageComponent} from './pages/questionnaire-page/questionnaire-page.component';
import {QuestIdInputComponent} from './pages/quest-id-input-page/quest-id-input.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {FooditemComponent} from './pages/fooditem/fooditem.component';
import { QuestResultsComponent } from './pages/quest-results/quest-results.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import { ClinicalPortalComponent} from './pages/clinical-portal/clinical-portal.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './services/authentication/auth.guard';
import { RecommendParentalComponent } from './pages/recommend-parental/recommend-parental.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { TrackerHistoryPageComponent } from './pages/tracker-history-page/tracker-history-page.component';
import { HistoryParentalComponent } from './pages/history-parental/history-parental.component';
import { LoginComponent } from './pages/login';
import { LoginHeaderComponent } from './pages/login-header';
import { AdminUsersComponent } from './pages/admin-users';
import { UserComponent } from './pages/user/user.component';



const routes: Routes = [
  {
    path: 'admin/fooditem/:id', component: FooditemComponent
  },
  {
    path: 'admin/fooditem', component: FooditemComponent
  },
  {
    path: 'admin', component: AdminPageComponent
  },
  {
    path: 'quest-results', component:  QuestResultsComponent
  },
  {
    path: 'recommend', component:   RecommendComponent
  },
  {
    path: 'recommend-parental', component:   RecommendParentalComponent
  },
  {
    path: '', redirectTo: 'questionnaire-id', pathMatch: 'full'
  },
  {
    path: 'questionnaire-id', component: QuestIdInputComponent, canActivate: [AuthGuard]
  },
  {
    path: 'questionnaire/:id', component: QuestionnairePageComponent
  },
  {
    path: 'clinical-portal', component: ClinicalPortalComponent
  },
  {
    path: 'tracker', component: TrackerPageComponent
  },
  {
    path: 'tracker-history', component: TrackerHistoryPageComponent
  },
  {
    path: 'history-parental', component: HistoryParentalComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'login-page', component: LoginPageComponent
  },
  {
    path: 'admin/user/:id', component: UserComponent
  },
  {
    path: 'admin/users', component: AdminUsersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
