import { Component, Input, OnInit } from "@angular/core";
import { Group } from "../model/group.model";
import { GroupService } from "../service/group.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { UserService } from "src/app/service";

@Component({
  selector: "app-group-table",
  templateUrl: "./group-table.component.html",
  styleUrls: ["./group-table.component.css"],
})
export class GroupTableComponent implements OnInit {
  @Input() groups: Group[];
  loggedUser?: any;
  editing = false;
  form: FormGroup;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  notification: any;
  returnUrl: string;
  groupAdmins: any;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  deleteGroup(groupId: number) {
    this.groupService.delete(groupId).subscribe((group) => {
      this.router.navigate([""]);
    });
  }

  editGroup(groupId, groupName, groupDesc) {
    this.editing = true;

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.form = this.formBuilder.group({
      id: groupId,
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
    this.form.get("name").setValue(groupName);
    this.form.get("description").setValue(groupDesc);
  }

  onSubmit() {
    this.groupService.edit(this.form.value).subscribe((result) => {});
  }

  isGroupAdmin(groupId: number): boolean {
    this.getGroupAdmins(groupId);

    console.log(this.groupAdmins);
    this.groupAdmins.forEach((admin) => {
      if (admin.username === this.loggedUser) {
        return true;
      }
    });

    return false;
  }

  getGroupAdmins(groupId: number) {
    this.groupService
      .getGroupAdmins(groupId)
      .subscribe((admins) => (this.groupAdmins = admins));
  }

  getLoggedUser(): void {
    const user = this.userService.currentUser;
    this.loggedUser = user.username;
  }
}
