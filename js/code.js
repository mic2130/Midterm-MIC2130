/***************************** MY PSEUDOCODE ****************************/

/*----------------------------------------------------------------------*/

/*Functionality for VIDEO
computer is listening [Play Video] Button
user clicks on [Play Video] Button
computer listens to click
computer calls the modal window code that contains the video link
computer shows the modal window code that contains the video link
user clicks the [Play] Button of the video-player
computer reproduces the linked video
if user clicks [Pause] Button
  computer stops reproducing the video
if user clicks on the [time-bar] (where 0 is 0seg and 100% is x)
  computer jumps to the time point selected by the user in the time-bar
if user clicks and holds [volume-bar] (where 0 is mute and 100% is x)
	computer adjusts volume of the video to the point that the user selected
if user clicks [x] close button
	computer pauses video
	computer resets video to 0 in timeline
	computer closes modal window

/*----------------------------------------------------------------------*/

/*Functionality for GAME
computer is listening [Play Game] Button
user clicks on [Play Game] Button
computer listens to click
computer calls the modal window code that contains the game code
computer shows the modal window code that contains the game code
computer shows the animated instructions
computer shows [Start] Button

if user clicks Start Button
  computer reproduce the video-game
  while dark-side speech (x seg to x seg of the time-line) is true
		if user click Dark Vader (key >)
			Dark Vader sword bright is true
			Dark Vader moves forward
			Luke sword bright is false
			Luke moves backwards
				If Dark Vader hit Luke
					Player gains 1 red point (dark side points) in the counter bar
		if user click Luke (key <)
			Dark Vader sword bright is false
			Dark Vader is stuck
			Luke sword bright is false
			Luke is stuck
			Player looses 1 red point (dark side points) in the counter bar
        if points in the red bar are less than 1
          quit game
          show game over
          show results table
while bright-side speech (x seg to x seg of the time-line) is true
		if user clicks Luke (key <)
			Luke sword bright is true
			Luke moves forward
			Dark Vader sword bright is false
			Dark Vader moves backwards
				If Luke hits Dark Vader
					Player gains 1 blue point (bright side points) in the counter bar
            if points in the blue bar are less than 1
              computer quits game
              computer shows game over
              computer shows results table and play again button
		if user clicks Dark Vader (key <)
			Dark Vader sword bright is false
			Dark Vader is stuck
			Luke sword bright is false
			Luke is stuck
			Player looses 1 blue point (bright side points) in the counter bar
        if points in the red bar are less than 1
          computer quits game
          computer shows game over
          computer shows results table
	While applause or laugh (x seg to x seg of the time-line) is true
		Computer displays bright stars
			If user clicks jump (key ˆ)
				computer adds a star to the stars counter bar (audience engagement bar)
			Else
				computer makes stars disappear
	If user clicks [ESC] on the game window or the speech finished
      computer show table results and play again button
  If user clicks [X] on the modal window
      computer closes modal window


/*----------------------------------------------------------------------*/

/*Functionality Form
  computer listening [Start Writing your structure] Button
  computer sets as current fieldset as "current"
  user clicks Button [Start Writing your structure] computer pass the function NEXT:
    computer shows the next fieldset
    computer hide the current fieldset
    computer sets current fieldset as "previous"
    computer sets the next fieldset as "current"
      if user clicks [next] Button computer pass the function NEXT again
      if user clicks [previous] Button computer pass the function PREVIOUS:
        computer shows the previous fieldset
        computer hide the current fieldset
        computer sets current fieldset as "next"
        computer sets the previous fieldset as "current"

/*----------------------------------------------------------------------*/

/*Functionality Save
  Computer listening [Save] Button
    Computer grabs texs-codes introduced in the fields by the user
    Computer creates a word document
    Computer place the text-codes in the word with pre-programed styles
    Computer download the document into the default download folder of the user
    Computer Alert that the structure is ready (see function at the bottom of the page)
/*----------------------------------------------------------------------*/


/******************************** CODE **********************************/
/*The following codes were writen following a tutorial step by step and addapted to my design purposes. I tried to explain line by line how I think they work*/

/*----------------------------------------------------------------------*/


//HERE IS THE VIDEO MODAL FUNCTION

$('.launch-modal').on('click', function(e) { //Grab the button with the class .launch-modal and, when the user click on it, pass the function that shows the modal that seems to be selected by id #
    e.preventDefault();
    $('#' + $(this).data('modal-id')).modal();
});


/*----------------------------------------------------------------------*/

//HERE IS THE MULTIPHASES FORM FUNCTIONS

//REFERENCE: http://thecodeplayer.com/walkthrough/jquery-multi-step-form-with-progress-bar


//Here are the variables declared
var current_fs, next_fs, previous_fs; //3 variables for 3 posible stateg of the fieldset
var left, opacity, scale; //fieldset properties wich we will animate


//HERE IS THE FUNCTION CLICK TO GO NEXT
$(".next").click(function() { //when click on the button with .next class call the function that sets the variable current_fs as the parent and next_fs as the next fieldset after the parent.
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();


    //show the next fieldset
    next_fs.show();

    //I think this whole function current_fs.animate({},{})  is about the animation of the hide and show function. It hide the current fieldset with style and show the next one, it change the opacity of the elements and move them from different sides, but I am not familiar with the code structure.
    current_fs.animate({
        opacity: 0
    }, {
        step: function(now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale down current_fs
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs
            top = (now * 50) + "%";
            //3. increase opacity of next_fs
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: 100, //this define the duration of the whole animation!
        complete: function() {
            current_fs.hide();
        },
        //this comes from a plugin
        easing: 'easeInOutBack'
    });
});


//HERE IS THE FUNCTION CLICK TO GO PREVIOUS
//This function makes something similar to the last one but instead of call the next_fs it calls the previous one when the user click in the previous button.

$(".previous").click(function() {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();


    previous_fs.show();
    current_fs.animate({
        opacity: 0
    }, {
        step: function(now, mx) {

            scale = 0.8 + (1 - now) * 0.2;
            left = ((1 - now) * 50) + "%";
            opacity = 1 - now;
            current_fs.css({
                'left': left
            });
            previous_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: 100,
        complete: function() {
            current_fs.hide();
        },
        easing: 'easeInOutBack'
    });
});


//HERE IS THE FUNCTION CLICK SAVE
//This function only generates the alert that told you that you finished the training. To download the word document I will need another function to make the computer do so. That function is explained in the pseudocode above.

var savefunction = function() {
    alert("CONGRATULATIONS! Your structure is ready, now you can write your speech in the document that have been downloaded");
};

document.getElementById('savebutton').addEventListener('click', savefunction);
