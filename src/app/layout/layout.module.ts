import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthInterceptor} from '../shared/services/auth.interceptor';


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    // angular material
    MatSidenavModule, MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatMenuModule, MatDividerModule,
  ],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent, FooterComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class LayoutModule {}
