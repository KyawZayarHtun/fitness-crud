import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from "../../models/user.model";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {NgConfirmService} from "ng-confirm-box";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {

  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sortColumn: MatSort;
  users!: User[];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'mobile',
    'bmiResult',
    'gender',
    'package',
    'enquiryDate',
    'action'
  ]

  constructor(private apiService: ApiService,
              private router: Router,
              private confirm: NgConfirmService,
              private toast: NgToastService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getRegistration()
      .subscribe(res => {
        this.users = res;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sortColumn;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(id: User) {
    this.router.navigate(['update/', id])
  }

  delete(id: number) {
    this.confirm.showConfirm(
      "Are You Sure to delete",
      () => {
        this.apiService.deleteRegistration(id)
          .subscribe(res => {
            this.toast.success({
              detail: "Delete Successful",
              summary: "Enquiry Deleted",
              duration: 3000
            });
            this.getUsers();
          })
      },
      () => {

      },
    )

  }

}
