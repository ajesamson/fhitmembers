import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { MembersListComponent } from './members-list/members-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberDetailComponent } from './member-detail/member-detail';
import { SearchMemberComponent } from './search-member/search-member';
import { ImportMemberComponent } from './import-member/import-member';
import { GoogleLoginComponent } from './google-login/google-login';

@NgModule({
  declarations: [
    MembersListComponent,
    MemberFormComponent,
    MemberDetailComponent,
    SearchMemberComponent,
    ImportMemberComponent,
    GoogleLoginComponent
  ],
  imports: [IonicModule, IonicImageLoader],
  exports: [
    MembersListComponent,
    MemberFormComponent,
    MemberDetailComponent,
    SearchMemberComponent,
    ImportMemberComponent,
    GoogleLoginComponent
  ]
})
export class ComponentsModule {}
