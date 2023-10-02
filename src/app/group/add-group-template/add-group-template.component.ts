import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupService } from "../service/group.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-group-template",
  templateUrl: "./add-group-template.component.html",
  styleUrls: ["./add-group-template.component.css"],
})
export class AddGroupTemplateComponent implements OnInit {
  group = {};
  form: FormGroup;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      description: [
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
    this.groupService.add(this.form.value).subscribe((result) => {
      this.location.back();
    });
  }
}
