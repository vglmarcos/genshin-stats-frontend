import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiGenshinStatsService } from "src/app/services/api-genshin-stats.service";
import { NavigatorComponent } from './components/navigator/navigator.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-top-center",
      preventDuplicates: true,
    }),
  ],
  providers: [ApiGenshinStatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
