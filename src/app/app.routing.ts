import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { CreateClassDialogComponent } from './home';
import { ShowTokenDialog } from './home';
import { DetailComponent } from './detail';

import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'createClassDialog', component: CreateClassDialogComponent, canActivate: [AuthGuard] },
    { path: 'classDetails/:id', component: DetailComponent, canActivate: [AuthGuard] },
    { path: 'classTokenDialog', component: ShowTokenDialog, canActivate: [AuthGuard] },

    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);