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
  form: FormGroup;
  submitted = false;

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
      pdf: [null, Validators.required]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        pdf: file
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  
    const formData = new FormData();
    const group = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
    };
  
    formData.append('group', JSON.stringify(group));
    formData.append('pdf', this.form.get('pdf').value);
  
    this.groupService.add(formData).subscribe((result) => {
      this.location.back();
    });
  }
  
}
