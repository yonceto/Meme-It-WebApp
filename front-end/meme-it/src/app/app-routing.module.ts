import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMemeComponent } from './create-meme/create-meme.component';
import { MemeGridComponent } from './meme-grid/meme-grid.component';
import { EditMemeComponent } from './edit-meme/edit-meme.component';
import { ExploreScreenComponent } from './explore-screen/explore-screen.component';

const routes: Routes = [
  { path: 'meme-grid', component: MemeGridComponent },
  { path: 'explore-screen', component: ExploreScreenComponent},
  { path: 'create-meme', component: CreateMemeComponent },
  { path: 'edit-meme/:id', component: EditMemeComponent },
  { path: '**', redirectTo: 'meme-grid', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
