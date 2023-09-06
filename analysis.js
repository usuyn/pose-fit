window.onload = function () {
  let setNum = Number(window.localStorage.getItem('setNum'))
  let inputSets = Number(window.localStorage.getItem('inputSets'))

  let avgAccuracy = Number(window.localStorage.getItem('set' + setNum))

  let setsAccuracy = JSON.parse(window.localStorage.getItem('setsAccuracy'))
  setsAccuracy.push(avgAccuracy)
  window.localStorage.setItem('setsAccuracy', JSON.stringify(setsAccuracy))

  let feedbackList = JSON.parse(window.localStorage.getItem('feedbackList'))
  printFeedback(feedbackList)

  if (setNum == inputSets) {
    const nextSetBtn = document.getElementById('nextSetBtn')
    const timer = document.getElementById('timer')
    const timerIcon = document.getElementById('stopwatchIcon')
    nextSetBtn.style.display = 'none'
    timer.style.display = 'none'
    timerIcon.style.display = 'none'

    window.localStorage.clear()
  } else {
    startTimer()
  }
}

function printFeedback (feedbackList) {
  let feedbackContent = document.getElementById('feedbackContent')

  feedbackList.forEach((feedback, index) => {
    let span = document.createElement('span')
    span.textContent = index + 1 + '. ' + feedback

    feedbackContent.appendChild(span)
  })
}

function nextSetButtonHandler () {
  clearInterval(timerInterval)
  window.location.href = 'exercise.html'
}

function quitButtonHandler () {
  clearInterval(timerInterval)
  window.location.href = 'index.html'
}
