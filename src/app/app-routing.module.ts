import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './pages/authors/authors.component';
import { BookComponent } from './pages/book/book.component';
import { CoachingComponent } from './pages/coaching/coaching.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { PrivateAreaComponent } from './pages/private-area/private-area.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'book', component: BookComponent },
  { path: 'about', component: AuthorsComponent },
  { path: 'coaching', component: CoachingComponent },
  { path: 'private-area', component: PrivateAreaComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        scrollPositionRestoration: 'top',
        initialNavigation: 'enabled'
      }
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
