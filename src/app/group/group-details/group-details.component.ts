import { Component, OnInit } from '@angular/core';
import { GroupService } from '../service/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service';
import { CommentService } from 'src/app/service/comment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  loggedUser?: any;
  groupOwner: any;
  pdfFile: File | null = null;

  group?: any;
  groupRequests: any;
  groupMembers: any;
  groupAdmins: any;
  groupPosts$: Observable<any[]>;
  posts: any;
  blockedMembers: any;
  id = Number(this.route.snapshot.paramMap.get('id'));

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
      title: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      pdf: [null, Validators.required],
    });

    this.suspendForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]]
    });

    this.formComment = this.formBuilder.group({
      commentText: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]]
    });

    this.formReply = this.formBuilder.group({
      commentText: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.pdfFile = event.target.files[0];
      this.form.patchValue({
        pdf: this.pdfFile
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    const post = {
      title: this.form.get('title').value,
      content: this.form.get('content').value
    }

    formData.append('post', JSON.stringify(post));
    formData.append('pdf', this.form.get('pdf').value);

    this.groupService.addGroupPost(formData, this.id).subscribe((result) => {
      this.getGroupPosts();
      console.log("Submission successful");
    });
  }

  getGroup(): void {
    this.groupService.getGroup(this.id).subscribe(group => (this.group = group));
  }

  isGroupOwner(): boolean {
    let owner = this.groupAdmins[0];
    let loggedUser = this.userService.currentUser;
    return owner.username === loggedUser.username;
  }

  sendGroupRequest(): void {
    this.groupService.sendGroupRequest(this.id).subscribe();
  }

  promoteMember(memberId: number): void {
    this.groupService.promoteMember(this.id, memberId).subscribe(() => {
      this.groupMembers = this.getGroupMembers();
      this.groupAdmins = this.getGroupAdmins();
    });
  }

  getGroupRequests(): void {
    this.groupService.getGroupRequests(this.id).subscribe(groupRequests => (this.groupRequests = groupRequests));
  }

  suspendGroup(): void {
    this.suspending = true;
  }

  approveRequest(requestId: number): void {
    this.groupService.approveRequest(requestId).subscribe(() => {
      this.groupMembers = this.getGroupMembers();
      this.groupRequests = this.getGroupRequests();
    });
  }

  declineRequest(requestId: number): void {
    this.groupService.declineRequest(requestId).subscribe(() => {
      this.groupRequests = this.getGroupRequests();
    });
  }

  getGroupAdmins(): void {
    this.groupService.getGroupAdmins(this.id).subscribe(groupAdmins => (this.groupAdmins = groupAdmins));
  }

  getGroupPosts(): void {
    this.groupPosts$ = this.groupService.getGroupsPosts(this.id);
  }

  getGroupMembers(): void {
    this.groupService.getGroupsMembers(this.id).subscribe(groupMembers => (this.groupMembers = groupMembers));
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
    this.groupAdmins.forEach(admin => {
      if (admin.username === this.loggedUser) {
        userIsAdmin = true;
      }
    });
    return userIsAdmin;
  }

  isAdmin(): boolean {
    let userIsAdmin = false;
    let currentUser = this.userService.currentUser;
    if (currentUser.role === 'ADMIN') {
      userIsAdmin = true;
    }
    return userIsAdmin;
  }

  isUserAdmin(username: string): boolean {
    let userIsAdmin = false;
    this.groupAdmins.forEach(admin => {
      if (admin.username === username) {
        userIsAdmin = true;
      }
    });
    return userIsAdmin;
  }

  isMember(): boolean {
    let userIsMember = false;
    this.groupMembers.forEach(member => {
      if (member.username === this.loggedUser) {
        userIsMember = true;
      }
    });
    return userIsMember;
  }

  onSeeComments(post: any, postId: number): void {
    this.selectedPost = post;
    this.watchingComments = true;
    this.commentService.getPostComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  onSubmitReply(commentId: number): void {
    this.commentService.reply(this.formReply.value, commentId).subscribe();
  }

  onSubmitComment(postId: number): void {
    this.commentService.create(this.formComment.value, postId).subscribe(() => {
      this.getGroupPosts();
    });
  }

  deleteGroup(groupId: number): void {
    this.groupService.delete(groupId).subscribe(() => {
      this.router.navigate(['groups']);
      this.groupAdmins = this.getGroupAdmins();
    });
  }

  deleteGroupAdmin(userId: number): void {
    this.groupService.removeGroupAdmin(userId, this.id).subscribe();
  }

  blockMember(memberId: number): void {
    this.groupService.blockMember(memberId, this.id).subscribe(() => {
      this.groupMembers = this.getGroupMembers();
      this.getBlockedUsers();
      this.getGroupPosts();
    });
  }

  unblockMember(memberId: number): void {
    this.groupService.unblockMember(memberId, this.id).subscribe();
  }

  getBlockedUsers(): void {
    this.groupService.getBlockedMembers(this.id).subscribe(result => (this.blockedMembers = result));
  }

  isBlockedMember(): boolean {
    let userIsBlocked = false;
    this.blockedMembers.forEach(user => {
      if (user.username === this.loggedUser) {
        userIsBlocked = true;
      }
    });
    return userIsBlocked;
  }

  getReportedGroupPosts(): void {
    this.reportedPosts$ = this.groupService.getReportedGroupPosts(this.id);
  }

  getReportedGroupComments(): void {
    this.reportedComments$ = this.groupService.getReportedGroupComments(this.id);
  }

  acceptReport(requestId: number): void {
    this.userService.acceptReport(requestId).subscribe(() => {
      this.getGroupPosts();
      this.getReportedGroupPosts();
      this.getReportedGroupComments();
    });
  }

  declineReport(requestId: number): void {
    this.userService.declineReport(requestId).subscribe(() => {
      this.getReportedGroupPosts();
      this.getReportedGroupComments();
    });
  }
}
