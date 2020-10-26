import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { WoundDetailsComponent } from './components/wound-details/wound-details.component';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'patient/new', component: NewPatientComponent, canActivate:[AuthGuard] },
  { path: 'patient/:id', component: PatientDetailsComponent, canActivate:[AuthGuard] },
  { path: 'patient/:id/wound/:id', component: WoundDetailsComponent, canActivate:[AuthGuard] },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  exports: [RouterModule],
  providers: [AuthGuard],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
