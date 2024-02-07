import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  groups: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      basicSalary: [0, [Validators.required, Validators.min(100000)]],
      status: ['', Validators.required],
      groupId: ['', Validators.required],
      description: new Date(),
    });
  }

  ngOnInit(): void {
    this._empService.getGroupsList().subscribe((groups: any[]) => {
      this.groups = groups;
      if (this.data) {
        console.log(this.data);
        this.empForm.patchValue(this.data);
        const groupId = this.data.groupId;
        if (groupId !== null && groupId !== undefined) {
          const selectedGroup = this.groups.find(
            (group) => group.id === groupId
          );
          if (selectedGroup) {
            this.empForm.get('groupId')?.setValue(selectedGroup.id);
          }
        }
      }
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    } else {
      this.empForm.markAllAsTouched();
    }
  }
}
