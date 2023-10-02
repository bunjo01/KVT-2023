import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../model/post.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../service/post.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-edit-post-template",
  templateUrl: "./edit-post-template.component.html",
  styleUrls: ["./edit-post-template.component.css"],
})
export class EditPostTemplateComponent implements OnInit {
  @Input() selectedPost: Post;
  post = {};
  form: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      content: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      creationDate: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
      id: [""],
    });
  }

  onSubmit() {
    this.postService.add(this.form.value).subscribe((result) => {
      this.router.navigate([""]);
    });
  }
}
