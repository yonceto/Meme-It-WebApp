import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemeGridComponent } from './meme-grid/meme-grid.component';
import { CreateMemeComponent } from './create-meme/create-meme.component';
import { EditMemeComponent } from './edit-meme/edit-meme.component';
import { RouterModule } from '@angular/router';
import { ExploreScreenComponent } from './explore-screen/explore-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeGridComponent,
    CreateMemeComponent,
    EditMemeComponent,
    ExploreScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxPaginationModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
