import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  userId!: number;
  user!: User;

  constructor(private activeRouter: ActivatedRoute,
              private api: ApiService) {
  }

  ngOnInit() {
    this.activeRouter.params.subscribe(value => {
      this.userId = value['id']
      this.fetchUserDetail(this.userId)
    })
  }

  fetchUserDetail(id: number) {
    this.api.findRegistrationById(id).subscribe(value => {
      this.user = value;
      console.log(this.user)
    })
  }

}
