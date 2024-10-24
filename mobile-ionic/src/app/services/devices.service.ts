import { Injectable, signal } from '@angular/core';
import { DeviceModel } from '../models/device.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  devicesList = signal<DeviceModel[]>([]);

  public turnOnDeviceById(id: string): void {
    this.devicesList.update(devices => {
      const device = devices.find(device => device.id === id);
      if (device) {
        device.isOn = true;
      }
      return devices;
    })

    this.saveDataOnStorage()
  }

  public turnOffDeviceById(id: string): void {
    this.devicesList.update(devices => {
      const device = devices.find(device => device.id === id);
      if (device) {
        device.isOn = false;
      }
      return devices;
    })

    this.saveDataOnStorage()
  }

  private async saveDataOnStorage() {
    await Preferences.set({ key: 'devices', value: JSON.stringify(this.devicesList()) });
  }

}
