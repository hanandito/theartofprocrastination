// QUESTIONS

const questions = [
  {
    "question": "I often find myself performing tasks that I had intended to do days before.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-01"
  },
  {
    "question": "When planning a meeting, I make the necessary arrangements in advance.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-01"
  },
  {
    "question":
      "I generally return emails and phone calls promptly.",
      "answer1": "Yes",
      "answer1Total": "5",
      "answer2": "Maybe",
      "answer2Total": "3",
      "answer3": "No",
      "answer3Total": "1",
      "background": "bg-01"
  },
  {
    "question": "I often postpone my job even when it only requires a little effort.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-02"
  },
  {
    "question": "Once I have the information needed, I usually make decisions as soon as possible.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-02"
  },
  {
    "question":
      "When I have something difficult to do, I tell myself that it is better for me to do it until I feel inspired.",
      "answer1": "Yes",
      "answer1Total": "5",
      "answer2": "Maybe",
      "answer2Total": "3",
      "answer3": "No",
      "answer3Total": "1",
      "background": "bg-02"
  },
  {
    "question": "I usually have to rush to complete tasks on time.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-02"
  },
  {
    "question": "I usually accomplish all the things I plan to do in a day.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-03"
  },
  {
    "question": "I usually start a task as soon as it is assigned to me.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-03"
  },
  {
    "question": "When deadlines are approaching, I often waste my time by doing other things.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-03"
  },
  {
    "question": "I often have a task finished sooner than the deadline.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-03"
  },
  {
    "question": "When preparing for a meeting, I seldom rush to do something at the last minute.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-04"
  },
  {
    "question": "I often delay starting a task that I have to do.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-04"
  },
  {
    "question": "When faced with a huge task, I figure out the first step to get me going.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-04"
  },
  {
    "question": "I usually have to rush to complete tasks on time.",
    "answer1": "Yes",
    "answer1Total": "5",
    "answer2": "Maybe",
    "answer2Total": "3",
    "answer3": "No",
    "answer3Total": "1",
    "background": "bg-04"
  }
]

var number = 0;
let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const logomain = document.querySelector('.logoopening');
// const result = document.querySelector('.result');

//------//

const start_btn = document.querySelector(".start_btn")
const header = document.querySelector(".atas");
const footer = document.querySelector(".footer");
const resulth1 = document.querySelector("#results_1");
const resulth2 = document.querySelector(".result_h2_c");
const closepromt = document.querySelector(".none-prompt-container");
const closeyok = document.querySelector(".close-prompt");



start_btn.addEventListener('click', letsgo)
function letsgo (){
  logomain.classList.add("hidden");
  start_btn.classList.add("hidden");
  container.classList.add("active");
  header.classList.add("activestatic");
  footer.classList.add("activestatic");
  resulth1.classList.add("hidden");
  resulth2.classList.add("hidden");
  document.body.style.backgroundImage = "url('bg-01.jpg')",
  document.body.style.transition = "all 1s";

  if (window.matchMedia('(max-width: 846px)').matches){
    document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
  }
}



//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}

// const numberSteps = $('.quiz__step').length - 1;

function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
      closepromt.classList.add("unhide");
      // alert('Please select your answer!');
      // return;
  }else{
    nextButton.classList.remove("enable");
    nextButton.classList.add("disable");
  }

    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);
    

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions && totalScore >= 60) {

        window.location.href = "/h1/index.html";

    }
    
    else if (currentQuestion == totalQuestions && totalScore >= 45) {
      window.location.href = "/h2/index.html";
    }

    else if (currentQuestion == totalQuestions && totalScore >= 31) {
      window.location.href = "/h3/index.html";
    }

    else if (currentQuestion == totalQuestions && totalScore >= 16) {
      window.location.href = "/h4/index.html";
    }

    else if (currentQuestion == totalQuestions && totalScore >= 5) {
      window.location.href = "/h5/index.html";
    }
    
    // width = $(".progress__inner").css("width");
    // width.substring(0, width.length - 1);
    // width = width+10;
    // $(".progress__inner").css("width", width+"%");

    // $('progress_inner').css({
    //   'width' : $('progress_inner').width() * 1.1
    // })

    // const numberSteps = $('.quiz-container').length - 1;
    // let currentIndex = Number($('.quiz-container--current').attr('.question'));
    // const percentage = (currentIndex * 100)/ numberSteps;
    // $('.progress_inner').width(percentage+ '%');
    
    number++;
    generateQuestions(currentQuestion);
    


}

//Function to load previous question
function loadPreviousQuestion() {
  number-= 1;
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
  number=0
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}

closeyok.addEventListener('click', tutup);

function tutup(){
  closepromt.classList.remove("unhide");
}




generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
restartButton.addEventListener('click',restartQuiz);


// $(document).increase(function() {
//   $('.next').click(function(){
//     $(this).css({
//       'width' : $(this).width() * '1.1',
//     });
//   });
// });

// $(".next").click(function () {
  
//   // Select the element that
//   // is clicked on
//   var curr_elem = $(".progress__inner");

//   // Set the amount to increase
//   let increase_modifier = 1.5;

//   // Get the current width of the element
//   let curr_width = curr_elem.width();

//   // Get the current height of the element
//   let curr_height = curr_elem.height();

//   // Use the same methods to set
//   // the new dimensions
//   curr_elem.height(
//     curr_height * increase_modifier
//   );
//   curr_elem.width(
//     curr_width * increase_modifier
//   );
// });

$(".next").on('click', function () {
  if (number > 0)
  $(".progress_inner").width('6.7%'),
  document.body.style.backgroundImage = "url('bg-01.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 1)
  $(".progress_inner").width('13.4%'),
  document.body.style.backgroundImage = "url('bg-01.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 2)
  $(".progress_inner").width('20.1%'),
  document.body.style.backgroundImage = "url('bg-01.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 3)
  $(".progress_inner").width('26.8%'),
  document.body.style.backgroundImage = "url('bg-02.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 4)
  $(".progress_inner").width('33.5%'),
  document.body.style.backgroundImage = "url('bg-02.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 5)
  $(".progress_inner").width('40.2%'),
  document.body.style.backgroundImage = "url('bg-02.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 6)
  $(".progress_inner").width('46.9%'),
  document.body.style.backgroundImage = "url('bg-03.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 7)
  $(".progress_inner").width('53.6%'),
  document.body.style.backgroundImage = "url('bg-03.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 8)
  $(".progress_inner").width('60.3%'),
  document.body.style.backgroundImage = "url('bg-03.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 9)
  $(".progress_inner").width('67%'),
  document.body.style.backgroundImage = "url('bg-03.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 10)
  $(".progress_inner").width('73.7%'),
  document.body.style.backgroundImage = "url('bg-04.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 11)
  $(".progress_inner").width('80.4%'),
  document.body.style.backgroundImage = "url('bg-04.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 12)
  $(".progress_inner").width('87.1%'),
  document.body.style.backgroundImage = "url('bg-04.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 13)
  $(".progress_inner").width('93.8%'),
  document.body.style.backgroundImage = "url('bg-02.jpg')",
  document.body.style.transition = "all 1s";
  if (number > 14)
  $(".progress_inner").width('100%'),
  document.body.style.backgroundImage = "url('bg-02.jpg')",
  document.body.style.transition = "all 1s";
  
})



if (window.matchMedia('(max-width: 846px)').matches){
  $(".next").on('click', function () {
    if (number > 0)
    $(".progress_inner").width('6.7%'),
    document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
    document.body.style.transition = "all 1s";
    if (number > 1)
    $(".progress_inner").width('13.4%'),
    document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
    document.body.style.transition = "all 1s";
    if (number > 2)
    $(".progress_inner").width('20.1%'),
    document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
    document.body.style.transition = "all 1s";
    if (number > 3)
    $(".progress_inner").width('26.8%'),
    document.body.style.backgroundImage = "url('bg-phone2-02.jpg')";
    document.body.style.transition = "all 1s";
    if (number > 4)
    $(".progress_inner").width('33.5%'),
    document.body.style.backgroundImage = "url('bg-phone2-02.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 5)
    $(".progress_inner").width('40.2%'),
    document.body.style.backgroundImage = "url('bg-phone2-02.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 6)
    $(".progress_inner").width('46.9%'),
    document.body.style.backgroundImage = "url('bg-phone2-03.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 7)
    $(".progress_inner").width('53.6%'),
    document.body.style.backgroundImage = "url('bg-phone2-03.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 8)
    $(".progress_inner").width('60.3%'),
    document.body.style.backgroundImage = "url('bg-phone2-03.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 9)
    $(".progress_inner").width('67%'),
    document.body.style.backgroundImage = "url('bg-phone2-03.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 10)
    $(".progress_inner").width('73.7%'),
    document.body.style.backgroundImage = "url('bg-phone2-04.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 11)
    $(".progress_inner").width('80.4%'),
    document.body.style.backgroundImage = "url('bg-phone2-04.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 12)
    $(".progress_inner").width('87.1%'),
    document.body.style.backgroundImage = "url('bg-phone2-04.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 13)
    $(".progress_inner").width('93.8%'),
    document.body.style.backgroundImage = "url('bg-phone2-02.jpg')",
    document.body.style.transition = "all 1s";
    if (number > 14)
    $(".progress_inner").width('100%'),
    document.body.style.backgroundImage = "url('bg-phone2-02.jpg')",
    document.body.style.transition = "all 1s";
    
  })
}












// $(".next").on('click', function () {
//   if (number > 0)
//   $(".progress_inner").width('6.7%'),
//   document.body.style.backgroundImage = "url('bg-01.jpg')",
//   document.body.style.transition = "all 1s";
//       if (window.matchMedia('(max-width: 846px)').matches){
//         document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
//       }
//   if (number > 1)
//   $(".progress_inner").width('13.4%'),
//   document.body.style.backgroundImage = "url('bg-01.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
//   }
//   if (number > 2)
//   $(".progress_inner").width('20.1%'),
//   document.body.style.backgroundImage = "url('bg-01.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-01.jpg')";
//   }
//   if (number > 3)
//   $(".progress_inner").width('26.8%'),
//   document.body.style.backgroundImage = "url('bg-02.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-02.jpg')";
//   }
//   if (number > 4)
//   $(".progress_inner").width('33.5%'),
//   document.body.style.backgroundImage = "url('bg-02.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-02.jpg')";
//   }
//   if (number > 5)
//   $(".progress_inner").width('40.2%'),
//   document.body.style.backgroundImage = "url('bg-02.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-02.jpg')";
//   }
//   if (number > 6)
//   $(".progress_inner").width('46.9%'),
//   document.body.style.backgroundImage = "url('bg-03.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-03.jpg')";
//   }
//   if (number > 7)
//   $(".progress_inner").width('53.6%'),
//   document.body.style.backgroundImage = "url('bg-03.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-03.jpg')";
//   }
//   if (number > 8)
//   $(".progress_inner").width('60.3%'),
//   document.body.style.backgroundImage = "url('bg-03.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-03.jpg')";
//   }
//   if (number > 9)
//   $(".progress_inner").width('67%'),
//   document.body.style.backgroundImage = "url('bg-03.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-03.jpg')";
//   }
//   if (number > 10)
//   $(".progress_inner").width('73.7%'),
//   document.body.style.backgroundImage = "url('bg-04.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-04.jpg')";
//   }
//   if (number > 11)
//   $(".progress_inner").width('80.4%'),
//   document.body.style.backgroundImage = "url('bg-04.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-04.jpg')";
//   }
//   if (number > 12)
//   $(".progress_inner").width('87.1%'),
//   document.body.style.backgroundImage = "url('bg-04.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-04.jpg')";
//   }
//   if (number > 13)
//   $(".progress_inner").width('93.8%'),
//   document.body.style.backgroundImage = "url('bg-02.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-02.jpg')";
//   }
//   if (number > 14)
//   $(".progress_inner").width('100%'),
//   document.body.style.backgroundImage = "url('bg-02.jpg')",
//   document.body.style.transition = "all 1s";
//   if (window.matchMedia('(max-width: 846px)').matches){
//     document.body.style.backgroundImage = "url('bg-phone2-02.jpg')";
//   }
// })










$(".previous").on('click', function () {
  if (number >= 0)
  $(".progress_inner").width('0%');
  if (number >= 1)
  $(".progress_inner").width('6.7%');
  if (number >= 2)
  $(".progress_inner").width('13.4%');
  if (number >= 3)
  $(".progress_inner").width('20.1%');
  if (number >= 4)
  $(".progress_inner").width('26.8%');
  if (number >= 5)
  $(".progress_inner").width('33.5%');
  if (number >= 6)
  $(".progress_inner").width('40.2%');
  if (number >= 7)
  $(".progress_inner").width('46.9%');
  if (number >= 8)
  $(".progress_inner").width('53.6%');
  if (number >= 9)
  $(".progress_inner").width('60.3%');
  if (number >= 10)
  $(".progress_inner").width('67%');
  if (number >= 11)
  $(".progress_inner").width('73.7%');
  if (number >= 12)
  $(".progress_inner").width('80.4%');
  if (number >= 13)
  $(".progress_inner").width('87.1%');
  if (number >= 14)
  $(".progress_inner").width('93.8%');
})



$(document).ready(function() {
  $('.quiz-container label.option').click(function(e) {
    $('.footer .controls .next').addClass("enable");
    $('.footer .controls .next').removeClass("disable");
  });
});







// function loadNextQuestion () {
//   const selectedOption = document.querySelector('input[type="radio"]:checked');
//   //Check if there is a radio input checked
//   if(!selectedOption) {
//       alert('Please select your answer!');
//       return;
//   }
//   //Get value of selected radio
//   const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

//   ////Add the answer score to the score array
//   score.push(answerScore);

//   selectedAnswersData.push()
  

//   const totalScore = score.reduce((total, currentNum) => total + currentNum);
  

//   //Finally we incement the current question number ( to be used as the index for each array)
//   currentQuestion++;

//       //once finished clear checked
//       selectedOption.checked = false;
//   //If quiz is on the final question
//   if(currentQuestion == totalQuestions - 1) {
//       nextButton.textContent = 'Finish';
//   }
//   //If the quiz is finished then we hide the questions container and show the results 
//   if(currentQuestion == totalQuestions) {
//       container.style.display = 'none';
//       result.innerHTML =
//        `<h1 class="final-score">Your score: ${totalScore}</h1>
//        <div class="summary">
//           <h1>Summary</h1>
//           <p>Possible - Personality Traits, see below for a summary based on your results:</p>
//           <p>15 - 21- You Need Help</p>
//           <p>10 - 15 - Good Soul</p>
//           <p>5 - 10 - Meh </p>
//           <p>5 - Are You Even Real</p>
//       </div>
//       <button class="restart">Restart Quiz</button>
//        `;
//       return;
//   }
//   generateQuestions(currentQuestion);
// }