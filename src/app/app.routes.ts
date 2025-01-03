import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BdayForm } from './bdayform.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'new',
        component: BdayForm
    }
];
