import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * The navbar that is shown at the top of every web page.
 * If there is a user signed in the logout button will be displayed.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Boolean that is set to true if there is currently a user signed into the app
  isUserLoggedIn: boolean;

  // Inject the AuthService and Router into the constructor
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Checking here if there is a user signed into the webapp when the app is started
    // Use the auth service to call getAuth method, which checks for an authorised user signed in
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        // Here if a user is signed in
        // Set boolean to true to display 'logout' button in navbar
        this.isUserLoggedIn = true;
      } else {
        // Here if no user signed in 
        // Set boolean to false to display 'login' button in navbar
        this.isUserLoggedIn = false;
      }
    });
  }

  /**
   * Method called when the user clicks the 'logout' button in the navbar
   */
  onLogout() {
    // Call the logout method from auth service
    this.authService.logout();
    // Navigate the user to login page
    this.router.navigate(['/login']);
  }

}
