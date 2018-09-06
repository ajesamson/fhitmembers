import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import 'rxjs/add/observable/fromEvent';
import { IonicImageLoader } from 'ionic-image-loader';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberDetailComponent } from './member-detail/member-detail';
import { SearchMemberComponent } from './search-member/search-member';

@NgModule({
  declarations: [
    MembersListComponent,
    MemberFormComponent,
    MemberDetailComponent,
    SearchMemberComponent
  ],
  imports: [IonicModule, IonicImageLoader],
  exports: [
    MembersListComponent,
    MemberFormComponent,
    MemberDetailComponent,
    SearchMemberComponent
  ]
})
export class ComponentsModule {}
