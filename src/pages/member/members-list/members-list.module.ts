import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembersListPage } from './members-list';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [MembersListPage],
  imports: [IonicPageModule.forChild(MembersListPage), ComponentsModule]
})
export class MembersListPageModule {}
