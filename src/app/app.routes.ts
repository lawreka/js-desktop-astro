import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BdayForm } from './bdayform/bdayform.component';
import { Charts } from './charts/charts.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'new',
        component: BdayForm
    },
    {
        path: 'charts',
        component: Charts
    }
];
