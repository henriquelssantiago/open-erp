import {NgModule} from '@angular/core';
import {AppLayoutComponent} from "./app.layout.component";
import {ThemeModule} from "./theme.module";
import {AppConfigModule} from "../config/config.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ToastModule} from "primeng/toast";

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AppConfigModule,
    RouterModule,
    ToastModule,
  ],
    declarations: [AppLayoutComponent],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
