import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMemberPage } from './search-member';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    SearchMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMemberPage),
    ComponentsModule
  ],
})
export class SearchMemberPageModule {}
