import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePicker, DatePickerOptions } from '@ionic-native/date-picker';
import * as moment from 'moment';
import { Member } from '../../models/member/member.interface';

@Component({
  selector: 'app-member-form',
  templateUrl: 'member-form.component.html'
})
export class MemberFormComponent implements OnInit, OnChanges {
  @Output()
  memberModified: EventEmitter<any>;
  @Input()
  memberData = {} as Member;
  active = true;
  memberBirthDate: string;
  memberForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  gender: FormControl;
  phoneNumber: FormControl;
  email: FormControl;
  address: FormControl;
  birthDate: FormControl;
  department: FormControl;
  status: FormControl;
  statusReason: FormControl;

  constructor(private datePicker: DatePicker) {
    this.memberModified = new EventEmitter();
  }

  ngOnInit() {
    this.createFormControls();
    this.createMemberForm();
  }

  ngOnChanges() {
    if (this.memberData) {
      this.memberForm.patchValue(this.memberData);
      this.memberBirthDate = this.memberData.birthDate;
      this.active = this.memberData.status;
    }
  }

  /**
   * Creates instances of form control for form inputs
   */
  createFormControls() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.gender = new FormControl('', [Validators.required]);
    this.phoneNumber = new FormControl('', []);
    this.email = new FormControl('', []);
    this.address = new FormControl('', [Validators.required]);
    this.birthDate = new FormControl('', [Validators.required]);
    this.department = new FormControl('', [Validators.required]);
    this.status = new FormControl(true, []);
    this.statusReason = new FormControl('', []);
  }

  /**
   * Creates member form
   */
  createMemberForm() {
    this.memberForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      phoneNumber: this.phoneNumber,
      email: this.email,
      address: this.address,
      birthDate: this.birthDate,
      department: this.department,
      status: this.status,
      statusReason: this.statusReason
    });
  }

  /**
   * Updates member status
   */
  updateStatus() {
    this.active = !this.active;
  }

  /**
   * Shows date picker
   */
  async showDatePicker() {
    try {
      const datePickerOptions: DatePickerOptions = {
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      };
      const selectedDate = await this.datePicker.show(datePickerOptions);
      this.memberBirthDate = moment(selectedDate).format('MMM DD');
      this.memberForm.patchValue({ birthDate: this.memberBirthDate });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Submits form data for creation or updating
   * of member details
   */
  onSubmit() {
    console.log(this.memberForm.value);
    if (this.memberForm.valid) {
      if (this.memberData.key === undefined) {
        // add member data
        this.memberData = this.memberForm.value;
        this.memberData.status = this.active;
      } else {
        // update member data
        const profiles = this.memberForm.value;
        this.memberData.firstName = profiles.firstName;
        this.memberData.lastName = profiles.lastName;
        this.memberData.gender = profiles.gender;
        this.memberData.phoneNumber = profiles.phoneNumber;
        this.memberData.email = profiles.email;
        this.memberData.address = profiles.address;
        this.memberData.birthDate = profiles.birthDate;
        this.memberData.department = profiles.department;
        this.memberData.status = profiles.status;
        this.memberData.statusReason = profiles.status
          ? ''
          : profiles.statusReason || '';
      }

      this.memberModified.emit(this.memberData);
    }
  }
}
