// app.js
var app = angular.module('quizApp', []);

app.controller('QuizCtrl', function($scope, $http) {
  $http.get('questions.json').then(function(response) {
    $scope.questions = response.data;
  });
  
  $scope.submit = function() {
    var correctAnswers = 0;
    angular.forEach($scope.questions, function(question) {
      if (question.type === 'truefalse') {
        if (question.answer === question.userAnswer) {
          correctAnswers++;
        }
      } else if (question.type === 'multiplechoice') {
        if (question.answer === question.userAnswer) {
          correctAnswers++;
        }
      } else if (question.type === 'multiplecorrect') {
        var userAnswers = question.userAnswer.sort();
        var correctAnswers = question.answer.sort();
        if (angular.equals(userAnswers, correctAnswers)) {
          correctAnswers++;
        }
      }
    });
    $scope.score = correctAnswers;
  };
});
