import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../model/post.model";
import { PostService } from "../../service/post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { CommentService } from "src/app/service/comment.service";
import { Observable } from "rxjs-compat";
import { UserService } from "src/app/service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() posts: Post[];
  editing = false;
  form: FormGroup;
  reportForm: FormGroup;
  returnUrl: string;
  notification: any;
  selectedPost: any;
  loggedUser = this.userService.currentUser;

  groupPosts;

  postReactions:any;

  constructor(
    private postService: PostService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router,
    private userService: UserService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.loggedUser = this.userService.currentUser;
    this.getPostsFromUserGroups();

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

  getPostsFromUserGroups() {
    this.postService.getPostsFromUserGroups().subscribe((result) => {
      this.groupPosts = result;
    });
  }

  isOwnerOfPost(user): boolean{
    this.loggedUser = this.userService.currentUser;
    return this.loggedUser.username == user;
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


  onSubmit() {
    this.postService.edit(this.form.value).subscribe((result) => {});
  }

  onSubmitReport() {
    this.postService.report(this.reportForm.value, this.selectedPost.id).subscribe((result)=>{});
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

  convertTime(dateTime) {
    const dateObject = new Date(dateTime[0], dateTime[1] - 1, dateTime[2], dateTime[3], dateTime[4], dateTime[5], dateTime[6] / 1000000);

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1; 
    let day = dateObject.getDate();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  isGroupPost(postId): boolean {
    let isGroupPost = false;
    this.groupPosts.forEach(element => {
      if(element.id == postId){
        isGroupPost = true;
      }
    });
    return isGroupPost;
  }

  returnPostsGroup(postId){
    let group;
    this.postService.getGroupByPostId(postId).subscribe((result) => {
      group = result
    });
    return group;
  }

  getLoggedUser(): void {
    const user = this.userService.currentUser;
    this.loggedUser = user.username;
  }
}
