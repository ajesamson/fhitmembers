import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  OnChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../models/member/member.interface';
import { MemberProvider } from '../../providers/member/member';

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

  constructor(private memberProvider: MemberProvider) {
    this.memberModified = new EventEmitter();
  }

  ngOnInit() {
    this.createFormControls();
    this.createMemberForm();
  }

  ngOnChanges() {
    if (this.memberData && this.memberData.key) {
      this.memberForm.patchValue(this.memberData);
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
   * Submits form data for creation or updating
   * of member details
   */
  onSubmit() {
    if (this.memberForm.valid) {
      if (this.memberData.key === undefined) {
        // add member data
        this.memberData = this.memberForm.value;
        this.memberData.status = this.active;

        this.memberProvider.addMember(this.memberData).then(() => {
          this.memberModified.emit();
        });
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

        this.memberProvider.updateMember(this.memberData).then(() => {
          this.memberModified.emit();
        });
      }
    }
  }
}
