import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserService } from "src/app/service";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-user-search",
  templateUrl: "./user-search.component.html",
  styleUrls: ["./user-search.component.css"],
})
export class UserSearchComponent implements OnInit {
  users$!: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.userService.searchUser(term))
    );
  }
}
