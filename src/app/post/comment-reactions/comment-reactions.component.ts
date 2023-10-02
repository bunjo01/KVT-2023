import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-comment-reactions',
  templateUrl: './comment-reactions.component.html',
  styleUrls: ['./comment-reactions.component.css']
})
export class CommentReactionsComponent implements OnInit {
  @Input() commentId: number;
  commentReactions;

  constructor(private commentService: CommentService,) { 
  }

  ngOnInit() {
    this.getCommentReactions(this.commentId);
  }

  getCommentReactions(commentId) {
    return this.commentService.getCommentReaction(commentId).subscribe((result) => {this.commentReactions = result.toString()})
  }

}
