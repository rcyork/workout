//! Title
// user action
//? data notes

//! Welcome screen
// be able to read a description of the program and how the app works
//? static description hard coded
// click start button to begin first workout

//! first workout screen
//? build out workout screen from fixed workouts stored elsewhere
// input weight that they can do for each new exercise
//? have increment and decrement buttons surrounding a number
// log completed workout and be returned to home screen
//? update state and as well add new workout to local storage

//! home screen
// click 'about' icon to toggle program and app explanation again
// view snapshot of next workout
//? calculate next workout based on state that keeps track of what the next workout should be
// click button that brings them to their next workout
// click log button that brings them to their log of workouts

//! workout screen
//? pass prop that determines if its a 'snapshot' (won't need radio buttons), 'collectingData' (needs weight input), or 'normal' (needs radio buttons)
// be able to view next weeks weight so they can find a weight in the middle of the two in order to progress easier
// check off completed exercise and leave failed exercises unchecked
//? radio button that way you can use the true or false value of the 'completed' attribute to track exercise status when saving
// log workout and return to home screen
//? if this is a first workout then all exercises are 'completed',
//? update state and local storage to reflect completed workout

//! log
// hit back button and be returned to home screen
// view a scrolling list of workouts labled by date and workout type
// click edit button to edit workout

//! edit workout
//? takes you to an 'active workout' screen that has knowledge of what workout is being edited and operates similarly on save as a new workout, it just updates state and local storage instead of creating a new item
// click cancel button and be returned to log screen
// change completed status of different exercises and save workout to the log
// be returned to log screen upon save

// ------------------------------------------------------------------------

//! how to calculate weight
// have a piece of state {object} that keeps track of each exercise as well as if it's time to increase weight on the next workout or not, also if the weight should be dropped 10% due to multiple failures on a given exercise

// TODO :
// figure out how to fix weights increasing everyt time the workout component gets rendered
