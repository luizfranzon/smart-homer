import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonText, IonList, IonLabel, IonIcon, IonButton, IonItem } from '@ionic/angular/standalone';
import { DeviceModel } from 'src/app/models/device.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'manage-devices-page.page.html',
  styleUrls: ['manage-devices-page.page.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonIcon, IonLabel, IonList, IonText, IonCardContent, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class ManageDevicesPage {
  public devices = signal<DeviceModel[]>([
    {
      id: '1',
      title: 'Lâmpada da Sala',
      isOn: false,
      pin: 1,
    },
    {
      id: '2',
      title: 'Lâmpada do Quarto',
      isOn: false,
      pin: 2,
    },
    {
      id: '3',
      title: 'Lâmpada da Cozinha',
      isOn: false,
      pin: 3,
    },
  ])

  ngOnInit(): void {

  }
}
