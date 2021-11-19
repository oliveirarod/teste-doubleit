import { AuthGuardService as AuthGuard  } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'produtos',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
