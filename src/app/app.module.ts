import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { HomeComponent } from './home';

import { CreateClassDialogComponent } from './home';

import { ShowTokenDialog } from './home';

import { DetailComponent } from './detail';


import { LoginComponent } from './login';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material';

import { MatFormFieldModule } from '@angular/material/form-field';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,

        FormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        routing
    ],
    declarations: [
        AppComponent,
        CreateClassDialogComponent,
        HomeComponent,
        LoginComponent,
        ShowTokenDialog,
        DetailComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }