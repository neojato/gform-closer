/**
 *  --------------------------
 *   Google Forms Auto-Close
 *  --------------------------
 * 
 *  Close a Google Form automatically.
 *
 *  All you have to do is:
 *    1. add a script to your current form
 *    2. copy/paste the code from my project
 *    3. edit FORM_ID (line 22) 
 *    4. edit FORM_CLOSE_DATE (line 25)
 *    5. Save and run the "Initialize" function
 *        1. This auto-creates a trigger to run the script for you on the date/time you entered
 *    6. Why would you use this script and not an add-on?
 *        1. you can see what it actually does
 *        2. it isn't written by an unknown 3rd party :)
 * 
 */

/* Set the form_id using the unique code from the Form's edit URL (NOTE: id from the view URL does not work) */
FORM_ID = "1234567890abcdefghijklmnopqrstuvwxyz";

/* Set the form’s close date in YYYY-MM-DD HH:MM format. */
FORM_CLOSE_DATE = "YYYY-MM-DD HH:MM";


/***************************************************/
/******** DO NOT EDIT BELOW THIS LINE **************/
/***************************************************/


/* Initialize the form, setup time based triggers */
function Initialize() {
    deleteTriggers_();

    if (FORM_CLOSE_DATE !== "") {
        ScriptApp.newTrigger("closeForm")
            .timeBased()
            .at(parseDate_(FORM_CLOSE_DATE))
            .create();
    }
}

/* Delete all existing Script Triggers */
function deleteTriggers_() {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i in triggers) {
        ScriptApp.deleteTrigger(triggers[i]);
    }
}

/* Send a mail to the form owner when the form status changes */
function informUser_(subject) {
    var formURL = FormApp.openById(FORM_ID).getPublishedUrl();
    MailApp.sendEmail(Session.getActiveUser().getEmail(), subject, formURL);
}

/* Close the Google Form, Stop Accepting Reponses */
function closeForm() {
    var form = FormApp.openById(FORM_ID);
    form.setAcceptingResponses(false);
    deleteTriggers_();
    informUser_("Your Google Form is no longer accepting responses");
}

/* Parse the Date for creating Time-Based Triggers */
function parseDate_(d) {
    return new Date(d.substr(0, 4), d.substr(5, 2) - 1, d.substr(8, 2), d.substr(11, 2), d.substr(14, 2));
}
