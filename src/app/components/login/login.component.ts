import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { __asyncDelegator } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * The login component takes care of logging a doctor into
 * the web app.
 */
export class LoginComponent implements OnInit {

  // The email address of the clinician
  email: string;
  // The password of the clinician
  password: string;

  // Injecting the AuthService and Router into the constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check AuthService to see if there is a user signed in already
    this.authService.getAuth().subscribe(auth => {
      if (auth){
        // If so, redirect that user to their dashboard
        this.router.navigate(['/']);
      }
    })
  }

  /**
   * Method called when the login form is submitted
   */
  onSubmit(){
    // Call login() AuthService and pass in email and password, which will return a Promise
    // If the result (res) of the Promise is successful, navigate user to their dashboard
    // If tthe Promise returns an error (err), create an alert using the message from the error
    this.authService
      .login(this.email, this.password)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(err => {
        alert(err.message)
      });
  }

}
