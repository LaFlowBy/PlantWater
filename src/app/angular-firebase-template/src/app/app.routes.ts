import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {
    AuthGuard,
    redirectLoggedInTo,
    redirectUnauthorizedTo,
  } from '@angular/fire/auth-guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { PlantsPageComponent } from './pages/plants-page/plants-page.component';
import { PlantPageComponent } from './pages/plant-page/plant-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectLoggedInToHome },
      },
      {
        path: 'plants',
        component: PlantsPageComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'plants/:id',
        component: PlantPageComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
];
