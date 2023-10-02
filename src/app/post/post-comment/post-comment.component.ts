import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/service/comment.service';
import { Post } from '../model/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {
  @Input() selectedPost: Post;

  commenting = false;
  comment = {};
  formComment: FormGroup;


  watchingComments = false;

  commentReactions : any;

  constructor(    
    private formBuilder: FormBuilder,
    private commentService: CommentService) { }

  ngOnInit() {

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

  }

  createComment(postId: number) {
    this.commentService
      .create(this.formComment, postId)
      .subscribe((result) => {});
  }

  startCommenting() {
    this.commenting = true;
  }

  onSubmitComment(postId) {
    this.commentService
      .create(this.formComment.value, postId)
      .subscribe((result) => {});
  }

}
