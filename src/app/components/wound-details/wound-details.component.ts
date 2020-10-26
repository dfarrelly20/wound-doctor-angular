import { Component, OnInit } from '@angular/core';
import { WoundService } from '../../services/wound.service';
import { FeedbackService } from '../../services/feedback.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Chart } from 'node_modules/chart.js'

import { Wound } from 'src/app/models/Wound';
import { Feedback } from '../../models/Feedback';

@Component({
  selector: 'app-wound-details',
  templateUrl: './wound-details.component.html',
  styleUrls: ['./wound-details.component.css']
})

/**
 * This class contains the code for dynamically creating the wound details
 * page. When a clinician selects a wound from the table on the patient details
 * page, the ID of that wound is used to generate the url for the wound details
 * page. The wound ID is then retrieved in this class and used to dynamically 
 * create the details for that specific wound.
 * 
 * The class displays some basic information about the wound, alongside the latest
 * image taken of the wound and a graph containing the wounds changing condition
 * over time. The graph is created using the Chart.js library.
 */
export class WoundDetailsComponent implements OnInit {

  // The ID of the wound -- retrieved from the url
  woundId: string;
  // The Wound Object created on this page
  wound: Wound;
  // A Feedback array holding all of the feedback data relating to the wound
  allFeedback: Feedback[];
  // A Feedback Object storing only the very latest feedback data for the wound
  latestFeedback: Feedback;
   // The value for this is got from the field 'wondInDanger' in the 'wounds' collection
  isInDanger: boolean = false;
  // Used as the increment for looping through the feedback data array
  i: any;
  // Array stores the dates on which each wound feedback was taken -- represented as the x-axis data on the chart
  labelsArray = [];
  // Array stores the wound condition change (Delta-E value) detected during each wound feedback - y-axis data
  dataArray = [];

  // Inject the WoundService, FeedbackService and ActivatedRoute into the constructor
  constructor(
    private woundService: WoundService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Get the id of the wound from the url using ActivatedRoute
    this.woundId = this.route.snapshot.params['id'];
    // Get wound document from 'wounds' collection, by calling getWound() from wound service
    this.woundService.getWound(this.woundId).subscribe(wound => {
      // Set the Wound Object for this page equal to the Wound that is returned from the service
      this.wound = wound;
      // Checking if the Wound that is returned is in danger
      if(this.wound.woundInDanger){
        this.isInDanger = true;
      }
    })
    // Pass in the ID of the wound to getAllFeedback() method of the feedback service
    // This will return an array of type Feedback holding all the feedback data for this wound
    this.feedbackService.getAllFeedback(this.woundId).subscribe(allFeedback => {
      // Store the feedback data returned in the Feedback array
      this.allFeedback = allFeedback;
      // Loop through the Feedback array
      // This is where the arrays that are used to create the chart data are populated
      for (this.i = 0; this.i < allFeedback.length; this.i++) {
        // Add the change in the wounds condition (Delta-E value) to the data array (y-axis values)
        this.dataArray.push(allFeedback[this.i].woundChangeSinceLast)
        // Get the date that this feedback was taken on -- returned as a Firebase Timestamp
        var date = allFeedback[this.i].date.toDate()
        // Format the Firebase Timestamp to a new date object
        var formatedDate = this.formatDate(date);
        // Add the formatted date to the labels array (x-axis values)
        this.labelsArray.push(formatedDate);
      }
      // Create the chart using the above data
      this.createChart();
    })
    // Retreive the latest feedback for the wound by calling getLatestFeedback() from the feedback service
    this.feedbackService.getLatestFeedback(this.woundId).subscribe(lastestFeedback => {
      this.latestFeedback = lastestFeedback;
    })

  }

  /**
   * Method creates a graph based on the feedback data for this wound. 
   * The graph is built using the Chart.js library.
   */
  createChart() {
    var chart = new Chart("chart", {
      // Indicating the type of chart to create
      type: 'bubble',
      // The data to create the chart with
      data: {
        // The x-axis data -- represents the date on which each feedback was taken
        labels: this.labelsArray,
        // Create each 'bubble' on the graph
        datasets: [{
          // Label the data on the graph
          label: 'Wound Change Since Last Update',
          // The border colour of each 'bubble'
          borderColor: 'rgb(255, 99, 132)',
          // The border width of each 'bubble'
          borderWidth: 3,
          // The radius of each 'bubble'
          radius: 10,
          // The y-axis date -- represents the Delta-E value of each feedback
          data: this.dataArray
        }]
      },
      // Setting the graph configuration properties which determine how the graph looks & behaves
      options: {
        // The x and y-axes are configured seperately
        scales: {
          xAxes: [{
            // Indicating that the x-axis will be used to display time data
            type: 'time',
            // Format the time displayed
            time: {
              // Setting the units that the time data should be measured out in
              unit: 'day',
              // Configure how the date and time should be displayed on the x-axis
              displayFormats: {
                'day': 'MMM D, H:mm',
              }
            },
            // Control how the data values are distributed along the x-axis
            // 'Series' indicates that the data should be spread evenly apart along the axis
            distribution: 'series',
          }],
          // Configuring the y-axis data
          yAxes: [{
            // Set the max value for the y-axis as 100 as this is the maximum Delta-E value for wound change
            ticks: {
              suggestedMax: 100
            }
          }]
        }
      }
    });
  }

  /**
   * Method is used to change the date returned for each feedback into a format
   * to use in the wound condition graph
   * Reference for this code can be found here:
   * https://stackoverflow.com/questions/25275696/javascript-format-date-time/25276435
   * 
   * @param date - The date to format
   */
  formatDate(date) {
    // The hour value of the date
    var hours = date.getHours();
    // The minute value of the date
    var minutes = date.getMinutes();
    // Check if date is AM or PM
    var timeOfDay = hours >= 12 ? 'pm' : 'am';
    // Convert hours into 12 hours clock
    hours = hours % 12;
    // Check if the hour equals 0 -- if so, change to 12
    hours = hours ? hours : 12;
    // If minutes are less than 10 -- add a 0 to start
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + timeOfDay;
    // Return the date in the format: 'Month/Day/Year Time'
    // Note: +1 is added to month as months start at 0
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

}
