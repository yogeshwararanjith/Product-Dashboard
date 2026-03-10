import { Routes } from '@angular/router';
import { Tabs } from '../features/tabs/tabs';
import { ProductDashboard } from '../Product Dashboard/product-dashboard/product-dashboard';
import { Header } from '../Shared/header/header';

export const routes: Routes = [
    {
        path : 'user',
        component: Tabs
    },
    {
        path:'dashboard',
        // component: ProductDashboard
        // loadComponent: async () => {
        //    const res = await import('../Product Dashboard/product-dashboard/product-dashboard');
        //    return res.ProductDashboard
        loadComponent : () => import('../Product Dashboard/product-dashboard/product-dashboard').then(m => m.ProductDashboard)
    },
    {
        path:'header',
        component: Header
    }
];
