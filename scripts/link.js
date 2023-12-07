//  index.html, service-guide.html
function tabItemHandler (element) {
  const page = element.getAttribute('data-page')
  window.location.href = page
}

function indexExerciseButtonHandler () {
  window.localStorage.clear()
  window.open('setting.html', '_blank', 'width=550px,height=450px')
}

function gitHubButtonHandler () {
  window.location.href = 'https://github.com/hippo-zone'
}

//  pose-guide-camera.html
function cameraConfirmButtonHandler () {
  window.open('pose-guide.html', '_blank', 'width=500px,height=501px')
  window.close()
}

function closeButtonButtonHandler () {
  window.close()
}

//  pose-guide.html
function confirmButtonHandler () {
  window.close()
}

//  exercise.html
function exerciseQuitButtonHandler () {
  let setNum = Number(window.localStorage.getItem('setNum'))
  window.localStorage.removeItem('inputSets')

  if (setNum == 1) {
    window.localStorage.clear()
    window.location.href = 'index.html'
  } else {
    window.location.href = 'analysis.html'
  }
}

function nextSetButtonHandler () {
  clearInterval(timerInterval)
  window.location.href = 'exercise.html'
}

function quitButtonHandler () {
  clearInterval(timerInterval)
  window.localStorage.clear()
  window.location.href = 'index.html'
}
