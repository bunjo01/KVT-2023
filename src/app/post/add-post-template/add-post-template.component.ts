import { Component, OnInit } from "@angular/core";
import { PostService } from "../service/post.service";
import { Router } from "@angular/router";
import { Post } from "../model/post.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HeaderComponent } from "src/app/header/header.component";

@Component({
  selector: "app-add-post-template",
  templateUrl: "./add-post-template.component.html",
  styleUrls: ["./add-post-template.component.css"],
})
export class AddPostTemplateComponent implements OnInit {
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
    });
  }

  onSubmit() {
    this.postService.add(this.form.value).subscribe((result) => {
      this.router.navigate([""]);
    });
  }
}
