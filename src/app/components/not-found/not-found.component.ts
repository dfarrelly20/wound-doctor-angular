import { Component, OnInit } from '@angular/core';

/**
 * This component is used to display a message if the user visits
 * a web apage that does not exist
 */
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
