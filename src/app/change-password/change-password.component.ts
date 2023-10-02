import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs/operators";
import { AuthService, UserService } from "../service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"],
})
export class ChangePasswordComponent implements OnInit {
  title = "Change password";
  form: FormGroup;

  submitted = false;

  current;
  password;
  confirm;

  returnUrl: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.form = this.formBuilder.group({
      username: this.userService.currentUser.username,
      current: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ]),
      ],
      confirm: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(64),
        ]),
      ],
    });
    this.current = this.form.controls["current"];
    this.password = this.form.controls["password"];
    this.confirm = this.form.controls["confirm"];
  }

  ngOnDestroy() {}

  onSubmit() {
    this.submitted = true;

    this.userService.changePassword(this.form.value).subscribe(
      (data) => {
        console.log(data);
        this.authService.login(this.form.value).subscribe(() => {
          this.userService.getMyInfo().subscribe();
        });
        this.router.navigate([this.returnUrl]);
      },
      (error) => {
        this.submitted = false;
        console.log("Sign up error");
      }
    );
  }
}
