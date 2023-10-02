import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AddPostTemplateComponent } from "./post/add-post-template/add-post-template.component";
import { AddGroupTemplateComponent } from "./group/add-group-template/add-group-template.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { CanActiveAuthGuardService } from "./service/can-active-auth-guard.service";
import { ProfileComponent } from "./user/profile/profile.component";
import { GroupTableComponent } from "./group/group-table/group-table.component";
import { GroupListComponent } from "./group/group-list/group-list.component";
import { GroupDetailsComponent } from "./group/group-details/group-details.component";
import { FriendProfileComponent } from "./user/friend-profile/friend-profile.component";
import { PostDetailsComponent } from "./post/post-details/post-details.component";
import { EditPostTemplateComponent } from "./post/edit-post-template/edit-post-template.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [CanActiveAuthGuardService],
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignUpComponent,
  },
  {
    path: "posts/add",
    component: AddPostTemplateComponent,
  },
  {
    path: "groups/add",
    component: AddGroupTemplateComponent,
  },
  {
    path: "changePassword",
    component: ChangePasswordComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: ":id/profile",
    component: FriendProfileComponent,
  },
  {
    path: "groups",
    component: GroupListComponent,
  },
  {
    path: "groups/:id",
    component: GroupDetailsComponent,
  },
  {
    path: "posts/:id",
    component: PostDetailsComponent,
  },
  {
    path: "posts/edit/:id",
    component: EditPostTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
