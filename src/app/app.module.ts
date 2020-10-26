import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/Forms';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { PatientService } from './services/patient.service';
import { VerificationService } from './services/verification.service';
import { WoundService } from './services/wound.service';
import { FeedbackService } from './services/feedback.service';
import { AuthService } from './services/auth.service';
import { NewPatientComponent } from './components/new-patient/new-patient.component';
import { WoundDetailsComponent } from './components/wound-details/wound-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    PatientsComponent,
    PatientDetailsComponent,
    LoginComponent,
    NotFoundComponent,
    NewPatientComponent,
    WoundDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'wounddoctor'),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [PatientService, VerificationService, WoundService, FeedbackService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
