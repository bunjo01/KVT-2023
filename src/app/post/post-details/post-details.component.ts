import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  id;
  selectedPost;
  reportForm: FormGroup;
  editing = false;
  form: FormGroup;
  loggedUser;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private http: HttpClient) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.postService.getPost(this.id).subscribe((result) => {this.selectedPost = result});
    this.getLoggedUser();

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

  editPost(postId, postContent) {
    this.editing = true;

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

  isOwnerOfPost(user): boolean{
    this.loggedUser = this.userService.currentUser;
    return this.loggedUser.username == user;
  }

  deletePost() {
    this.postService.delete(this.selectedPost.id).subscribe((post) => {});
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


  convertTime(dateTime) {
    const dateObject = new Date(dateTime[0], dateTime[1] - 1, dateTime[2], dateTime[3], dateTime[4], dateTime[5], dateTime[6] / 1000000);

    // Retrieve the date components from the Date object
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1; // Months in JavaScript are zero-based (0-11)
    let day = dateObject.getDate();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  
  getLoggedUser(): void {
    const user = this.userService.currentUser;
    this.loggedUser = user.username;
  }


  isPostOwner(username: String): boolean {
    console.log(username, this.loggedUser)
    return this.loggedUser == username;
  }

  startEditing(){
    this.editing = true;
  }


}
