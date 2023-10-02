import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  user = this.userService.currentUser;
  userGroups?: any;
  userForm = {};
  form: FormGroup;
  editing = false;
  image;
  imageForm : FormGroup;
  selectedFile: File | null = null;

  sleep = (ms) => new Promise(r => setTimeout(r, ms));

  reportedUsers$!: Observable<any[]>;
  reportedPosts$!: Observable<any[]>;
  reportedComments$!: Observable<any[]>;
  bannedUsers$!: Observable<any[]>;
  friendRequests$?: Observable<any[]>;
  friends$?: Observable<any[]>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.userService.currentUser;
    this.findUserGroups();
    this.findUserFriendRequests();
    this.findUserFriends();
    this.getReportedNonGroupComments();
    this.getReportedNonGroupPosts();
    this.getReportedUsers();
    this.getAcceptedReportedUsers();
    this.findUserFriends();
    this.findUserFriendRequests();

    this.form = this.formBuilder.group({
      firstName: [
        this.user.firstName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      lastName: [
        this.user.lastName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
      description: [
        this.user.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
    });

    this.imageForm = this.formBuilder.group({
      path: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
  }

  onSubmit() {
    this.userService.changeProfile(this.form.value).subscribe();
  }

  editProfile() {
    this.editing = true;
  }

  findUserGroups() {
    this.userService
      .findUserGroups(this.user.id)
      .subscribe((userGroups) => (this.userGroups = userGroups));
  }

  findUserFriendRequests() {
    this.friendRequests$ = this.userService.findUserFriendRequests(this.user.id);
    }

  findUserFriends() {
    this.friends$ = this.userService.findUserFriends(this.user.id);
  }

  approveFriendRequest(requestId: number) {
    this.userService.approveFriendRequest(requestId).subscribe((result) => {
      this.findUserFriendRequests();
      this.findUserFriends();
    });
  }

  declineFriendRequest(requestId: number) {
    this.userService.declineFriendRequest(requestId).subscribe((result) => {
      this.findUserFriendRequests();
    });
  }

  isAdmin(): boolean {
    let userIsAdmin = false;
    let currentUser = this.userService.currentUser;
    if (currentUser.role == "ADMIN") {
      userIsAdmin = true;
    }
    return userIsAdmin;
  }

  getReportedUsers() {
    this.reportedUsers$ = this.userService.getReportedUsers();
  }

  getAcceptedReportedUsers() {
    this.bannedUsers$ = this.userService.getAcceptedReportedUsers();
  }

  getReportedNonGroupPosts() {
    this.reportedPosts$ = this.userService.getReportedNonGroupPosts();
  }

  getReportedNonGroupComments() {
    this.reportedComments$ = this.userService.getReportedNonGroupComments();
  }

  acceptReport(requestId: number) {
    this.userService.acceptReport(requestId).subscribe((result) => {
      this.refresh();
    });
  }

  declineReport(requestId: number) {
    this.userService.declineReport(requestId).subscribe((result) => {
      this.refresh()
    });
  }

  refresh() {
    this.getReportedNonGroupComments();
    this.getReportedNonGroupPosts();
    this.getReportedUsers();
    this.getAcceptedReportedUsers();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmitPicture() {
    if (!this.selectedFile) {
      return;
    }

    const filePath = this.selectedFile.name; 

    this.userService.changePicture(filePath);
  }

  unban(username) {
    this.userService.unban(username).subscribe((result) => {
      this.getAcceptedReportedUsers();
    });
  }
}
