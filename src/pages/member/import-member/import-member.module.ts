import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportMemberPage } from './import-member';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [ImportMemberPage],
  imports: [IonicPageModule.forChild(ImportMemberPage), ComponentsModule]
})
export class ImportMemberPageModule {}
