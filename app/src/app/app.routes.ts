import { Routes } from '@angular/router';
import { CredentialComponent } from './credential.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'credentials/:id/:schema', component: CredentialComponent },
];
