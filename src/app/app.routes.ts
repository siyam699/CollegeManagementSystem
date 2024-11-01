import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'student',
        component: StudentComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }

];
