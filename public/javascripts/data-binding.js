// Default Email Body
var defaultEmail = "I received an email regarding your recent EWS and wanted to " +
              "follow up with you to see how things are going. I know freshmen " +
              " year can be a big transition and I'd like you to stop by my " +
              "office hours so we can touch base. As your LA I want to do " +
              "whatever I can to make sure you're performing at your absolute " +
              "best. My office hours are 9pm to 10pm on Mondays and Thursdays in " +
              "my room, Barton 3308. If you can't make it please respond to " +
              "this email so we can either find another time or just to let me" +
              " know more about your situation.";
// Load Defaults
$('#email-content').val(defaultEmail);
$('#email-body').text(defaultEmail);

// Data Bindings
$('#preferred-name').change(function() {
  $('#la-name').text($('#preferred-name').val());
});

$('#email-content').change(function() {
  $('#email-body').text($('#email-content').val())
});
