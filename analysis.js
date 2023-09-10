window.onload = function () {
  let setNum = Number(window.localStorage.getItem('setNum'))
  let inputSets = Number(window.localStorage.getItem('inputSets'))

  prepareResult()

  if (setNum == inputSets || !inputSets) {
    removeData()
  } else {
    startTimer()
  }
}

function prepareResult () {
  let stop = window.localStorage.getItem('inputSets') ? false : true
  let setNum = Number(window.localStorage.getItem('setNum'))

  if (stop) {
    window.localStorage.setItem('minAccuracy', 0)
    window.localStorage.setItem('maxAccuracy', 0)
    window.localStorage.setItem('set' + setNum, 0)

    let feedbackList = ['운동 중단으로 피드백을 제공하지 않습니다.']
    printFeedback(feedbackList)
  } else {
    let avgAccuracy = Number(window.localStorage.getItem('set' + setNum))

    let setsAccuracy = JSON.parse(window.localStorage.getItem('setsAccuracy'))
    setsAccuracy.push(avgAccuracy)
    window.localStorage.setItem('setsAccuracy', JSON.stringify(setsAccuracy))

    let feedbackList = JSON.parse(window.localStorage.getItem('feedbackList'))
    printFeedback(feedbackList)
  }
}

function printFeedback (feedbackList) {
  let feedbackContent = document.getElementById('feedbackList')

  feedbackList.forEach((feedback, index) => {
    let li = document.createElement('li')
    li.textContent = feedback

    feedbackContent.appendChild(li)
  })
}

function removeData () {
  $('#nextSetBtn').hide()
  $('#timer').hide()
  $('#stopwatchIcon').hide()

  window.localStorage.clear()
}
