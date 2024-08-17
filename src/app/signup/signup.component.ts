import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
public signupForm !: FormGroup;
constructor(private formBuilder : FormBuilder,
  private http : HttpClient,
  private router : Router,
  private userService : UserService
) {}

ngOnInit(): void {
  this.signupForm = this.formBuilder.group({
    fullname:['', [Validators.required]],
    email: ['', [Validators.required, Validators.email],[this.emailUniqueValidator()]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    mobile:['', [Validators.required,Validators.pattern('^[0-9]{10}$')]]
  })
}

signUp() {
  if (this.signupForm.valid) {
    this.userService.createUser(this.signupForm.value)
      .subscribe(res => {
        alert('Sign Up Successful !!!');
        this.signupForm.reset();
        this.router.navigate(['login']);
      }, err => {
        alert('Something went wrong');
      });
  } else {
    alert('Please fill out the form correctly.');
  }
}

emailUniqueValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return this.userService.checkEmailExists(control.value)
      .pipe(
        map(users => {
          return users.length > 0 ? { emailExists: true } : null;
        }),
        catchError(() => of(null))
      );
  };
}


}
