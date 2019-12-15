import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '@app/core/services/toast.service';
import { ReviewService } from '@app/core/services/review.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-mod-user-create',
  templateUrl: './mod-user-create.component.html',
  styleUrls: ['./mod-user-create.component.scss']
})
export class ModUserCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit() {
  }

}
