import { Routes } from '@angular/router';
import { CredentialComponent } from './credential.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Redirect to '/home' route when the path is ''
  //   { path: 'home', component: HomeComponent },
  { path: 'credential/:schema/:id', component: CredentialComponent },
];
