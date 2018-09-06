import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMemberPage } from './edit-member';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [EditMemberPage],
  imports: [IonicPageModule.forChild(EditMemberPage), ComponentsModule]
})
export class EditMemberPageModule {}
