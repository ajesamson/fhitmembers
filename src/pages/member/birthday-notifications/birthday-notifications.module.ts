import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirthdayNotificationsPage } from './birthday-notifications';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [BirthdayNotificationsPage],
  imports: [
    IonicPageModule.forChild(BirthdayNotificationsPage),
    ComponentsModule
  ]
})
export class BirthdayNotificationsPageModule {}
