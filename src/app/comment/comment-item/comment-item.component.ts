import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../comment/model/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/service/comment.service';
import { UserService } from 'src/app/service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;

  editing = false;
  formEdit: FormGroup;
  loggedUser;


  formComment: FormGroup;
  reportForm: FormGroup;
  formReply: FormGroup;
  reply = {};

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private userService: UserService
  ) { }

  ngOnInit() {
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

  editComment(commentId, commentText) {
    console.log("comment user" + this.comment.belongsToUser.username);
    this.editing = true;

    this.formEdit = this.formBuilder.group({
      id: commentId,
      commentText: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
    this.formEdit.get("commentText").setValue(commentText);
  }


  onSubmitEdit() {
    this.commentService.edit(this.formEdit.value).subscribe((result) => {});
  }


  deleteComment() {
    this.commentService.delete(this.comment.id).subscribe((comment) => {});
  }

  isCommentOwner(user): boolean{
    this.loggedUser = this.userService.currentUser;
    return this.loggedUser.username == user;
  }

  onSubmitReport(commentId) {
    this.commentService.report(this.reportForm.value, commentId).subscribe((result)=>{});
  }

  likeComment(commentId) {
    this.commentService.likeComment(commentId).subscribe((result) => {});
  }

  dislikeComment(commentId) {
    this.commentService.dislikeComment(commentId).subscribe((result) => {});
  }

  hearthComment(commentId) {
    this.commentService.hearthComment(commentId).subscribe((result) => {});
  }

  removeReaction(commentId) {
    this.commentService.deleteReaction(commentId).subscribe((result) => {});
  }

  onSubmitReply(commentId) {
    this.commentService
      .reply(this.formReply.value, commentId)
      .subscribe((result) => {});
  }

  getLoggedUser(): void {
    const user = this.userService.currentUser;
    this.loggedUser = user.username;
  }

}
