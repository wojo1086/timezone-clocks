import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTimezoneComponent } from './add-timezone/add-timezone.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'add-timezone',
        component: AddTimezoneComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
