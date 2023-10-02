import { Component, OnInit } from "@angular/core";
import { Post } from "../../model/post.model";
import { PostService } from "../../service/post.service";
import { Observable } from "rxjs";
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  postList$!: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postList$ = this.postService.getPostsForUser();
  }

  // getPosts(): void {
  //   this.postList = this.postService.getNonGroupPosts();
  // }

  refresh(){
    this.postList$ = this.postService.getPostsForUser();
  }

  getNewestPosts(): void {
    this.postList$ = this.postService.getNewestPosts();
  }

  getOldestPosts(): void {
    this.postList$ = this.postService.getOldestPosts();
  }
}
