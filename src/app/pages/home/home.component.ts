import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mode: string = '';
  actionCode: string = '';

  ngUnsubscribe: Subject<any> = new Subject<any>();
  
  actionCodeChecked: boolean = false;
  verifiedStatus: boolean = false;

  message: string = '';

  password: string = '';

  toggleEye: boolean = true;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        // if we didn't receive any parameters, 
        // we can't do anything
        if (!params) this.router.navigate(['/']);

        this.mode = params['mode'];
        this.actionCode = params['oobCode'];

        switch (params['mode']) {
          case 'resetPassword': {
            // Verify the password reset code is valid.
            this.auth.verifyPasswordResetCode(this.actionCode).then(email => {
              this.actionCodeChecked = true;
            }).catch(err => {
              // Invalid or expired action code.
              //Ask user to try to reset the password again.
             this.toastr.warning('Please try to reset your password again.', 'Code is invalid');

              // redirect user to page where they can input their email address
              // TODO
            });
          } break
          case 'verifyEmail': {

            this.auth.applyActionCode(this.actionCode)
              .then((resp) => {
                this.message = 'Your email has been verified'
                this.verifiedStatus = true;
              })
              .catch(err => {
                this.verifiedStatus = false;
                this.message = 'Your email is either already verified or the code may be expired.'
                this.toastr.warning('The code is either invalid or has expired', 'Code is invalid');
              })

          } break
          default: {
            // console.log('query parameters are missing');
          }
        }
      });
  }


  savePassword() {
    this.spinner.show();
    if(!this.password) {
      this.spinner.hide();
      return this.toastr.warning('Please provide your password.');
    }

    if(this.password.length < 8) {
      this.spinner.hide();
      return this.toastr.warning('Your password cannot be less than 8 characters.');
    }

    if(this.checkPasswordValidity(this.password)) {
      this.spinner.hide();
      return
    }

    return this.auth.confirmPasswordReset(this.actionCode, this.password)
      .then(() => { 
        this.spinner.hide();
        this.toastr.success('Your password has been updated.');
        this.password = '';
        // TODO: (Optional) navigate user back to login
      })
      .catch(err => {
        this.spinner.hide();

        if(err.code == 'auth/invalid-action-code') {
          return this.toastr.warning('The code has either expired or has already been used', 'Invalid code')
        }
        
        return this.toastr.warning(err.message, 'Uh oh!')
      });
  }

  checkPasswordValidity(pass: string) {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(pass)) {
      return this.toastr.warning("Password must not contain whitespaces.");
    }
  
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(pass)) {
      return this.toastr.warning("Password must have at least one uppercase character.");
    }
  
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(pass)) {
      return this.toastr.warning("Password must have at least one lowercase character.");
    }
  
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(pass)) {
      return this.toastr.warning("Password must contain at least one digit.");
    }
  
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(pass)) {
      return this.toastr.warning("Password must contain at least one special symbol.");
    }
  
    const isValidLength = /^.{8,24}$/;
    if (!isValidLength.test(pass)) {
      return this.toastr.warning("Password cannot be more than 24 characters long.");
    }
  
    return null;
  }

  toggleEyeIcon(inputPassword:any) {
		this.toggleEye = !this.toggleEye;
		
		inputPassword.type = inputPassword.type === 'password' ? 'text' : 'password';
	}

  ngOnDestroy() {
    // End all subscriptions listening to ngUnsubscribe
    // to avoid memory leaks.
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }

}
