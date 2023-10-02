import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {ConfigService} from '../service/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clubResponse = {};
  whoamIResponse = {};
  allUserResponse = {};

  constructor(
    private config: ConfigService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
  }



}
