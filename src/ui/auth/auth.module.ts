import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { routes } from "./auth.routes";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthEffect } from "./effects/auth.effect";
import { authReducers } from "./actions/auth-reducer";
import { AuthService } from "src/core/service/auth.service";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('auth', authReducers),
        EffectsModule.forFeature([AuthEffect])
    ],
    providers: [AuthService]
})
export class AuthModule { }