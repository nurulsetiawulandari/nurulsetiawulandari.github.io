function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}

function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("bt" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Pertanyaan " + currentQuestionNumber + " dari " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Hasil</h1>";
    gameOverHTML += "<h2 id='score'> Selamat! Skor Kamu: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Berapa jumlah Provinsi di Indonesia?", ["31", "32", "33", "34"], "34"),

    new Question("Mamalia terbesar di bumi?", ["Gajah", "Paus", "Komodo", "Orang Utan"], "Paus"),

    new Question("Berasal darimana kue Bika Ambon?", ["Ambon", "Padang", "Lampung", "Medan"], "Medan"),

    new Question("Siapakah presiden ke dua Indonesia?", ["BJ.Habibi", "Soeharto", "Megawati", "Soekarno"], "Soeharto"),

    new Question("Ibu Kota Negara Italia?", ["Firenze", "Madrid", "Roma", "Athena"], "Roma"),

    new Question("Siapakah penyanyi lagu Love Yourself?", ["Jonas Blue", "Justin Bieber", "Shawn Mendes", "Wiz Khalifa"], "Justin Bieber"),

    new Question("Apa huruf kendaraan  bermotor provinsi Banten?", ["A", "B", "D", "N"], "A"),

    new Question("Apa istilah lain percakapan dalam drama?", ["Dialog", "Monolog", "Mimik", "Alur"], "Dialog"),

    new Question("Danau terbesar di Indonesia?", ["Kaolin", "Toba", "Poso", "Sentarum"], "Toba"),

    new Question("Apa mata uang negara Thailand?", ["Yen", "Peso", "Dong", "Bath"], "Bath"),
];

var quiz = new Quiz(questions);

populate();
