import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommentService } from "src/app/service/comment.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  @Input() commentId: any;

  comments: any;

  reportForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.commentService
      .getCommentReplies(this.commentId)
      .subscribe((comments) => (this.comments = comments));

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

  onSubmitReport(commentId) {
    this.commentService.report(this.reportForm.value, commentId).subscribe((result)=>{});
  }
}
