import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { PageComponent } from './page/page.component';
import { CardComponent } from '../../components/card/card.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [
    PageComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})
export class HomeModule { }
