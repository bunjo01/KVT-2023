import { Component, OnInit } from "@angular/core";
import { GroupService } from "../service/group.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/service";
import { CommentService } from "src/app/service/comment.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-group-details",
  templateUrl: "./group-details.component.html",
  styleUrls: ["./group-details.component.css"],
})
export class GroupDetailsComponent implements OnInit {
  loggedUser?: any;
  groupOwner;

  group?: any;
  groupRequests: any;
  groupMembers: any;
  groupAdmins: any;
  groupPosts$: Observable<any[]>;
  posts: any;
  blockedMembers: any;
  id = Number(this.route.snapshot.paramMap.get("id"));

  post = {};
  form: FormGroup;

  suspend = {};
  suspendForm: FormGroup;
  suspending = false;

  selectedPost: any;
  watchingComments = false;
  comments: any;

  commenting = false;
  comment = {};
  formComment: FormGroup;

  reply = {};
  formReply: FormGroup;
  replies: any;
  watchingReplies = false;

  reportedPosts$!: Observable<any[]>;
  reportedComments$!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getGroup();
    this.getGroupRequests();
    this.getGroupAdmins();
    this.getGroupMembers();
    this.getGroupPosts();
    this.getLoggedUser();
    this.getBlockedUsers();
    this.getReportedGroupComments();
    this.getReportedGroupPosts();

    this.form = this.formBuilder.group({
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });

    this.suspendForm = this.formBuilder.group({
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });

    this.formComment = this.formBuilder.group({
      commentText: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });

    this.formReply = this.formBuilder.group({
      commentText: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
  }

  getGroup(): void {
    this.groupService
      .getGroup(this.id)
      .subscribe((group) => (this.group = group));
  }

  isGroupOwner(): boolean {
    let owner = this.groupAdmins[0]
    console.log(owner)
    let loggedUser = this.userService.currentUser
    return owner.username == loggedUser.username;
  }

  sendGroupRequest(): void {
    this.groupService.sendGroupRequest(this.id).subscribe();
  }

  promoteMember(memberId: number): void {
    this.groupService.promoteMember(this.id, memberId).subscribe((result) =>{
      this.groupMembers = this.getGroupMembers();
      this.groupAdmins = this.getGroupAdmins();
    });
  }

  getGroupRequests(): void {
    this.groupService
      .getGroupRequests(this.id)
      .subscribe((groupRequests) => (this.groupRequests = groupRequests));
  }

  suspendGroup(): void {
    this.suspending = true;
  }

  approveRequest(requestId: number): void {
    this.groupService.approveRequest(requestId).subscribe((result)=>{
      this.groupMembers = this.getGroupMembers();
      this.groupRequests = this.getGroupRequests();
    });
  }

  declineRequest(requestId: number): void {
    this.groupService.declineRequest(requestId).subscribe((result) => {
      this.groupRequests = this.getGroupRequests();
    });
  }

  getGroupAdmins(): void {
    this.groupService
      .getGroupAdmins(this.id)
      .subscribe((groupAdmins) => (this.groupAdmins = groupAdmins));
  }

  getGroupPosts(): void {
    this.groupPosts$ = this.groupService
      .getGroupsPosts(this.id);
  }

  getGroupMembers(): void {
    this.groupService
      .getGroupsMembers(this.id)
      .subscribe((groupMembers) => (this.groupMembers = groupMembers));
  }

  onSubmit(): void {
    this.groupService.addGroupPost(this.form.value, this.id).subscribe((result) => {
      this.getGroupPosts()
    });
  }

  onSubmitSuspend(): void {
    this.groupService.suspendGroup(this.form.value, this.id).subscribe();
  }

  getLoggedUser(): void {
    const user = this.userService.currentUser;
    this.loggedUser = user.username;
  }

  isGroupAdmin(): boolean {
    let userIsAdmin = false;

    this.groupAdmins.forEach((admin) => {
      if (admin.username === this.loggedUser) {
        userIsAdmin = true;
      }
    });

    return userIsAdmin;
  }

  isAdmin(): boolean {
    let userIsAdmin = false;
    let currentUser = this.userService.currentUser;
    if (currentUser.role == "ADMIN") {
      userIsAdmin = true;
    }
    return userIsAdmin;
  }

  isUserAdmin(username: string): boolean {
    let userIsAdmin = false;

    this.groupAdmins.forEach((admin) => {
      if (admin.username === username) {
        userIsAdmin = true;
      }
    });

    return userIsAdmin;
  }

  isMember(): boolean {
    let userIsMember = false;

    this.groupMembers.forEach((member) => {
      if (member.username === this.loggedUser) {
        userIsMember = true;
      }
    });

    return userIsMember;
  }

  onSeeComments(post, postId) {
    this.selectedPost = post;
    this.watchingComments = true;
    this.commentService.getPostComments(postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  onSubmitReply(commentId) {
    this.commentService
      .reply(this.formReply.value, commentId)
      .subscribe((result) => {});
  }

  onSubmitComment(postId) {
    this.commentService
      .create(this.formComment.value, postId)
      .subscribe((result) => {
        this.getGroupPosts();
      });
  }

  deleteGroup(groupId: number) {
    this.groupService.delete(groupId).subscribe((group) => {
      this.router.navigate(["groups"]);
      this.groupAdmins = this.getGroupAdmins();
    });
  }

  deleteGroupAdmin(userId) {
    this.groupService.removeGroupAdmin(userId,this.id).subscribe((result) => {});
  }

  blockMember(memberId) {
    this.groupService.blockMember(memberId, this.id).subscribe((result) => {
      this.groupMembers = this.getGroupMembers();
      this.getBlockedUsers();
      this.getGroupPosts();
    });
  }

  unblockMember(memberId) {
    this.groupService.unblockMember(memberId, this.id).subscribe((result) => {});
  }

  getBlockedUsers() {
    this.groupService.getBlockedMembers(this.id).subscribe((result) => {this.blockedMembers = result})
  }

  isBlockedMember(): boolean {
    let userIsBlocked = false;

    this.blockedMembers.forEach((user) => {
      if (user.username === this.loggedUser) {
        userIsBlocked = true;
      }
    });

    return userIsBlocked;
  }

  getReportedGroupPosts() {
    this.reportedPosts$ = this.groupService.getReportedGroupPosts(this.id);
  }

  getReportedGroupComments() {
    this.reportedComments$ = this.groupService.getReportedGroupComments(this.id);
  }

  acceptReport(requestId: number) {
    this.userService.acceptReport(requestId).subscribe((result) => {
      this.getGroupPosts();
      this.getReportedGroupPosts();
      this.getReportedGroupComments();
    });
  }

  declineReport(requestId: number) {
    this.userService.declineReport(requestId).subscribe((result) => {
      this.getReportedGroupPosts();
      this.getReportedGroupComments();
    });
  }

}
