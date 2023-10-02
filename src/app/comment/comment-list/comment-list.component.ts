import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/service/comment.service';
import { Comment } from '../comment/model/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postId?;
  comments: any[];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getPostComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  private buildCommentThread(comments: any[]): any[] {
    const nestedComments: Comment[] = [];
  
    function addRepliesToComment(comment: any) {

      const filteredReplies = comments.filter(reply => 
        reply.repliesToComment && 
        reply.repliesToComment.id === comment.id && 
        !reply.suspended
      );
  
      comment.replies = filteredReplies;

      filteredReplies.forEach(addRepliesToComment);
    }
  
    const topLevelComments = comments.filter(comment => 
      !comment.repliesToComment && 
      !comment.suspended
    );
  
    topLevelComments.forEach(comment => {
      nestedComments.push(comment);
      addRepliesToComment(comment);
    });
  
    return nestedComments;
  }
  
  

  getMostLikedComments(){
    this.commentService.getMostLikedComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getLeastLikedComments(){
    this.commentService.getLeastLikedComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getMostDislikedComments(){
    this.commentService.getMostDislikedComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getLeastDislikedComments(){
    this.commentService.getLeastDislikedComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getMostHearthedComments(){
    this.commentService.getMostHearthedComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getLeastHearthedComments(){
    this.commentService.getLeastHearthedComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getOldestComments(){
    this.commentService.getOldestComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getNewestComments(){
    this.commentService.getNewestComments(this.postId).subscribe(
      (comments) => {
        this.comments = this.buildCommentThread(comments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

    // private buildCommentThread(comments: any[]): any[] {
  //   const nestedComments: Comment[] = [];

  //   function addRepliesToComment(comment: any) {
  //     comment.replies = comments.filter(reply => reply.repliesToComment && reply.repliesToComment.id === comment.id);
  //     comment.replies.forEach(addRepliesToComment);
  //   }

  //   const topLevelComments = comments.filter(comment => !comment.repliesToComment);
  
  //   topLevelComments.forEach(comment => {
  //     nestedComments.push(comment);
  //     addRepliesToComment(comment);
  //   });
  
  //   return nestedComments;
  // }


}
