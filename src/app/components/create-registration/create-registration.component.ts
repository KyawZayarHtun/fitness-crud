import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {

  packages: string[] = ["Monthly", "Quarterly", "Yearly"];
  genders: string[] = ["Male", "Female", "Other"];
  importantList: string[] = [
    "Toxic Fat Reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ]

  registrationForm: FormGroup;
  userIdToUpdate!: number;
  isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private toastService: NgToastService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      /*firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl(""),
      mobile: new FormControl(""),
      weight: new FormControl(""),
      height: new FormControl(""),
      bmi: new FormControl(""),
      bmiResult: new FormControl(""),
      gender: new FormControl(""),
      requireTrainer: new FormControl(""),
      package: new FormControl(""),
      important: new FormControl(""),
      haveGymBefore: new FormControl(""),
      enquiryDate: new FormControl(""),*/

      //-----------------------------------------------------------------------------------

      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });

    this.registrationForm.controls['height'].valueChanges.subscribe(res => {
      this.calculateBmi(res)
    })

    this.activatedRoute.params.subscribe(value => {
      this.userIdToUpdate = value['id'];
      this.apiService.findRegistrationById(this.userIdToUpdate)
        .subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res)
        })
    })
  }


  submit() {
    this.apiService.postRegistration(this.registrationForm.value)
      .subscribe(res => {
        this.toastService.success({
          detail: "Success Registration",
          summary: "Enquiry Added",
          duration: 3000,
        })
        this.registrationForm.reset();
        this.router.navigate(['list'])
      })
  }

  update() {
    this.apiService.updateRegistration(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({
          detail: "Update Successful",
          summary: "Enquiry Update",
          duration: 3000,
        })
        this.registrationForm.reset();
        this.router.navigate(['list'])
      })
  }

  calculateBmi(heightValue: number) {
    const weight = this.registrationForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight")
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiResult'].patchValue("Normal")
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiResult'].patchValue("Overweight")
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue("Observe")
        break;
    }
  }

  fillFormToUpdate(user: User) {
      this.registrationForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        weight: user.weight,
        height: user.height,
        bmi: user.bmi,
        bmiResult: user.bmiResult,
        gender: user.gender,
        requireTrainer: user.requireTrainer,
        package: user.package,
        important: user.important,
        haveGymBefore: user.haveGymBefore,
        enquiryDate: user.enquiryDate,
      })
  }


}
