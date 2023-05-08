// global JQuery call
$(document).ready

(function () {
  // function to display todays date
  var currentDayEl = $('#currentDay') 
  var timeBlockEl = $('.time-block')
  var saveBtnEl = $('.saveBtn')


  $(function displayDate() {

      var todaysDate = dayjs().format('dddd, MMMM D. h:mm A ');
      currentDayEl.text(todaysDate);
  });

// declaring local variables

  var saveTime = 0;
  var saveText = '';
  var saveInput = JSON.parse(localStorage.getItem('userInput')) || [];

  function init() {
    changeBlockColor();
    setUserInput();
    setTimeHeader();
  }

  init();


  $(".saveBtn").click(function(){
    saveTime = $(this).parent().attr('id').split('-')[1];

    saveText = $('textarea').get(saveTime - 9).value;
    var userInput = {
      time: saveTime,
      note: saveText
    };


    saveInput = saveInput.filter(({ time }) => time !== saveTime);
    saveInput.push(userInput);
    localStorage.setItem('userInput', JSON.stringify(saveInput));
  });

// change block color by comparing current hour to time block ids

    function changeBlockColor(){
      var currentTime = dayjs().format('HH');
      $('.time-block').each(function(index) {

        if (index > (currentTime - 9))
          $(this).attr("class", "row time block future");
        if ((index + 9) < currentTime)
          $(this).attr("class", "row time block past");
        if ((index + 9) == currentTime)
          $(this).attr("class", "row time block present");
      });
    }

// saves user text in each time block

    function setUserInput() {
      saveInput.forEach(function(entry) {
        $('.time-block').get(entry.time - 9).children[1].textContent = entry.note;
      });
    }
});
