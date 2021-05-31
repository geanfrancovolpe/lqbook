import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './pages/authors/authors.component';
import { BookComponent } from './pages/book/book.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PrivateAreaComponent } from './pages/private-area/private-area.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'book', component: BookComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'private-area', component: PrivateAreaComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
