import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-configurations-page',
  templateUrl: 'configurations-page.page.html',
  styleUrls: ['configurations-page.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class ConfigurationsPage {

  constructor() {}

}
