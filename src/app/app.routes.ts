import { Routes } from '@angular/router';
import { TimelineComponent } from '../components/Timeline/timeline.component';
import { HomeComponent } from '../components/Home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'timeline', component: TimelineComponent },
];
