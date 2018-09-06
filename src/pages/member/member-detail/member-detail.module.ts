import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberDetailPage } from './member-detail';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MemberDetailPage],
  imports: [IonicPageModule.forChild(MemberDetailPage), ComponentsModule]
})
export class MemberDetailPageModule {}
