import { Component, OnInit } from '@angular/core';

/**
 * The dashboard is where the user is sent when they log in.
 * Contains the table of patients associated with the user.
 * The table is created dynamically in the 'patients' component
 * depedning on the docotr who is signed in. This table is then 
 * placed in the html of the dashboard component
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
