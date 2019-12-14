import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-assignment-new',
  templateUrl: './assignment-new.component.html',
  styleUrls: ['./assignment-new.component.scss']
})
export class AssignmentNewComponent implements OnInit {
  newAssignmentForm: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.newAssignmentForm.controls; }

  onSubmit() {}

  ngOnInit() {
    this.newAssignmentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required]
    });
  }

}
