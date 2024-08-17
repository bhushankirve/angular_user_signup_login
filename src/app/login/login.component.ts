import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
public loginForm !: FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  private userService: UserService
) { }

ngOnInit(): void {
  this.loginForm = this.formBuilder.group ({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
}

login() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    this.userService.verifyUser(email, password)
      .subscribe(users => {
        if (users.length > 0) {
          alert('Login Successfulll !!!');
          this.loginForm.reset();
          this.router.navigate(['dashboard'], { queryParams: { username: users[0].fullname } });
        } else {
          alert('Invalid Email ID or Password !!!');
        }
      }, err => {
        alert('Something went wrong !!!');
      });
  } else {
    alert('Please enter your email and password.');
  }
}

}
