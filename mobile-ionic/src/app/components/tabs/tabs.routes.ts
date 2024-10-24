import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'manage',
        loadComponent: () =>
          import('../../screens/manage-devices-page/manage-devices-page.page').then((m) => m.ManageDevicesPage),
      },
      {
        path: 'config',
        loadComponent: () =>
          import('../../screens/configurations-page/configurations-page.page').then((m) => m.ConfigurationsPage),
      },
      {
        path: '',
        redirectTo: '/app/manage',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/manage',
    pathMatch: 'full',
  },
];
