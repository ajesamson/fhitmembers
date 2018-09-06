import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMemberPage } from './add-member';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [AddMemberPage],
  imports: [IonicPageModule.forChild(AddMemberPage), ComponentsModule]
})
export class AddMemberPageModule {}
