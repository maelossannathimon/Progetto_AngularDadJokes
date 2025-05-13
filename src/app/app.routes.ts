import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailComponent }
];
