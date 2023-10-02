import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post-reactions',
  templateUrl: './post-reactions.component.html',
  styleUrls: ['./post-reactions.component.css']
})
export class PostReactionsComponent implements OnInit {
  @Input() postId: number;
  postReactions;

  constructor(private postService: PostService) { 
  }

  ngOnInit() {
    this.getPostReactions(this.postId);
  }

  getPostReactions(commentId) {
    return this.postService.getPostReaction(commentId).subscribe((result) => {this.postReactions = result.toString()})
  }

}
