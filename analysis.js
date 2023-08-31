window.onload = function () {
  let setNum = Number(window.localStorage.getItem('setNum'))
  let inputSets = Number(window.localStorage.getItem('inputSets'))

  let avgAccuracy = Number(window.localStorage.getItem('set' + setNum))
  let minAccuracy = Number(window.localStorage.getItem('minAccuracy'))
  let maxAccuracy = Number(window.localStorage.getItem('maxAccuracy'))

  fillProgressBar(avgAccuracy, '.avg-bar', '.avg-value', '평균')
  fillProgressBar(minAccuracy, '.min-bar', '.min-value', '최소')
  fillProgressBar(maxAccuracy, '.max-bar', '.max-value', '최대')

  let setsAccuracy = JSON.parse(window.localStorage.getItem('setsAccuracy'))
  setsAccuracy.push(avgAccuracy)
  window.localStorage.setItem('setsAccuracy', JSON.stringify(setsAccuracy))

  if(setNum == inputSets){
    const nextSetBtn = document.getElementById("nextSetBtn")
    const timer = document.getElementById("timer")
    const timerIcon = document.getElementById("stopwatchIcon")
    nextSetBtn.style.display = "none";
    timer.style.display = 'none';
    timerIcon.style.display = 'none';
  }
  else{
      startTimer();
  }
  
}

function fillProgressBar (accuracy, barName, valueName, typeName) {
  let bar = document.querySelector(barName)
  let value = document.querySelector(valueName)

  console.log(barName)

  let radius = 54
  let circumference = 2 * Math.PI * radius

  let dashOffset = circumference * (1 - accuracy / 100)

  value.innerHTML = typeName + '\n' + accuracy + '%'

  bar.style.strokeDashoffset = dashOffset
  bar.style.strokeDasharray = circumference
}

document.addEventListener('DOMContentLoaded', function () {
  const nextSetButton = document.getElementById('nextSetBtn');
  
  nextSetButton.addEventListener('click', function () {
      clearInterval(timerInterval);
      window.location.href = 'exercise.html';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const quitButton = document.getElementById('quitBtn');
  
  quitButton.addEventListener('click', function () {
      clearInterval(timerInterval);
      window.location.href = 'index.html';
  });
});