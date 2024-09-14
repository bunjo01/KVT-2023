import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { UserMenuComponent } from "./user-menu/user-menu.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

import { AngularMaterialModule } from "./angular-material/angular-material.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ApiService } from "./service/api.service";
import { AuthService } from "./service/auth.service";
import { UserService } from "./service/user.service";
import { ConfigService } from "./service/config.service";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./interceptor/TokenInterceptor";
import { TableComponent } from "./post/table/table/table.component";
import { PostListComponent } from "./post/post-list/post-list/post-list.component";
import { NavbarAdminComponent } from "./core/navbar-admin/navbar-admin.component";
import { NavbarUserComponent } from "./core/navbar-user/navbar-user.component";
import { AddPostTemplateComponent } from "./post/add-post-template/add-post-template.component";
import { GroupListComponent } from "./group/group-list/group-list.component";
import { AddGroupTemplateComponent } from "./group/add-group-template/add-group-template.component";
import { GroupTableComponent } from "./group/group-table/group-table.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { GroupDetailsComponent } from './group/group-details/group-details.component';
import { UserSearchComponent } from './user/user-search/user-search.component';
import { FriendProfileComponent } from './user/friend-profile/friend-profile.component';
import { CommentComponent } from './comment/comment/comment.component';
import { PostCommentComponent } from './post/post-comment/post-comment.component';
import { CommentReactionsComponent } from './post/comment-reactions/comment-reactions.component';
import { GroupPostsComponent } from './group/group-posts/group-posts.component';
import { CommentListComponent } from "./comment/comment-list/comment-list.component";
import { CommentItemComponent } from './comment/comment-item/comment-item.component';
import { PostDetailsComponent } from './post/post-details/post-details.component';
import { PostReactionsComponent } from './post/post-reactions/post-reactions.component';
import { EditPostTemplateComponent } from "./post/edit-post-template/edit-post-template.component";
import { SearchGroupComponent } from './group/search-group/search-group.component';
import { SearchPostComponent } from './post/search-post/search-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserMenuComponent,
    LoginComponent,
    SignUpComponent,
    TableComponent,
    PostListComponent,
    NavbarAdminComponent,
    NavbarUserComponent,
    AddPostTemplateComponent,
    GroupListComponent,
    AddGroupTemplateComponent,
    GroupTableComponent,
    ChangePasswordComponent,
    ProfileComponent,
    GroupDetailsComponent,
    UserSearchComponent,
    FriendProfileComponent,
    CommentComponent,
    PostCommentComponent,
    CommentReactionsComponent,
    GroupPostsComponent,
    CommentListComponent,
    CommentItemComponent,
    PostDetailsComponent,
    PostReactionsComponent,
    EditPostTemplateComponent,
    SearchGroupComponent,
    SearchPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthService,
    ApiService,
    UserService,
    ConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
