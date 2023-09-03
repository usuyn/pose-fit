//  index.html, service-guide.html
document.addEventListener('DOMContentLoaded', function () {
  const tabItems = document.querySelectorAll('.tab-item')
  tabItems.forEach(tabItem => {
    tabItem.addEventListener('click', function () {
      const page = this.getAttribute('data-page')
      window.location.href = page
    })
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const exerciseButton = document.getElementById('exercise-btn')

  exerciseButton.addEventListener('click', function () {
    window.open('setting.html', '_blank', 'width=550px,height=450px')
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const gitLink = document.getElementById('git-link')

  gitLink.addEventListener('click', function () {
    window.location.href = 'https://github.com/hippo-zone'
  })
})

//  setting.html
document.addEventListener('DOMContentLoaded', function () {
  const settingButton = document.getElementById('setting-btn')

  settingButton.addEventListener('click', function () {
    window.open('pose-guide-camera.html', '_blank', 'width=500px,height=501px')
    window.opener.location.href = 'exercise.html'
    window.close()
  })
})

//  pose-guide-camera.html
document.addEventListener('DOMContentLoaded', function () {
  const cameraConfirmButton = document.getElementById('camera-confirm-btn')

  cameraConfirmButton.addEventListener('click', function () {
    window.open('pose-guide.html', '_blank', 'width=500px,height=501px')
    window.close()
  })
})

//  pose-guide.html
document.addEventListener('DOMContentLoaded', function () {
  const confirmButton = document.getElementById('confirm-btn')

  confirmButton.addEventListener('click', function () {
    window.close()
    //window.opener.location.href = 'exercise.html';
  })
})

//  exercise.html
document.addEventListener('DOMContentLoaded', function () {
  const quitButton = document.getElementById('quit-btn')
  let setNum = Number(window.localStorage.getItem('setNum'))

  quitButton.addEventListener('click', function () {
    if (setNum == 0) window.location.href = 'index.html'
    else window.location.href = 'analysis.html'
  })
})
