import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../service/group.service';

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.css']
})
export class SearchGroupComponent implements OnInit {
  searchForm: FormGroup;
  groups: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      keywords: ['', Validators.required]
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const keywords = this.searchForm.value.keywords.split(' ');
    this.groupService.searchGroups({ keywords }).subscribe(response => {
      this.groups = response.content;
    });
  }
}
