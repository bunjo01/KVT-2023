import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/post/service/post.service';
import { CommentService } from 'src/app/service/comment.service';
import { GroupService } from '../service/group.service';
import { UserService } from 'src/app/service';

@Component({
  selector: 'app-group-posts',
  templateUrl: './group-posts.component.html',
  styleUrls: ['./group-posts.component.css']
})
export class GroupPostsComponent implements OnInit {
  @Input() groupId : number;

  groupPosts$!: Observable<any[]>;

  editing = false;
  form: FormGroup;
  returnUrl: string;
  notification: any;
  selectedPost: any;

  postReactions:any;

  loggedUser = this.userService.currentUser;

  reportForm: FormGroup;

  constructor(  
    private groupService: GroupService,  
    private postService: PostService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = this.userService.currentUser;
    this.groupPosts$ = this.groupService.getGroupsPosts(this.groupId);

    this.reportForm = this.formBuilder.group({
      reason: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
  }

  deletePost(postId: number) {
    this.postService.delete(postId).subscribe((post) => {});
  }

  editPost(postId, postContent) {
    this.editing = true;

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.form = this.formBuilder.group({
      id: postId,
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
    this.form.get("content").setValue(postContent);
  }

  onSubmitReport(postId) {
    this.postService.report(this.reportForm.value, postId).subscribe((result)=>{});
  }

  isOwnerOfPost(user): boolean{
    this.loggedUser = this.userService.currentUser;
    return this.loggedUser.username == user;
  }
  
  onSubmit() {
    this.postService.edit(this.form.value).subscribe((result) => {});
  }

  likePost(postId) {
    this.postService.likePost(postId).subscribe((result) => {});
  }

  dislikePost(postId) {
    this.postService.dislikePost(postId).subscribe((result) => {});
  }

  hearthPost(postId) {
    this.postService.hearthPost(postId).subscribe((result) => {});
  }

  removeReaction(postId) {
    this.postService.deleteReaction(postId).subscribe((result) => {});
  }

  onSeeComments(post, postId) {
    this.selectedPost = post;
    this.getPostReactions(postId);
  }

  getPostReactions(postId) {
    this.postService.getPostReaction(postId).subscribe((result) => {this.postReactions = result.toString()});
  }

}
