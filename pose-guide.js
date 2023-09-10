window.onload = function () {
  poseGuideImageChange()
}

function poseGuideImageChange () {
  let inputExercise = window.localStorage.getItem('inputExercise')
  let poseImg = document.getElementById('pose-img')

  const exerciseImages = {
    squat: 'pose-guide-squat',
    'lunge-left': 'pose-guide-lunge',
    'legraise-left': 'pose-guide-legraise',
    lateralraise: 'pose-guide-lateralraise'
  }

  if (exerciseImages[inputExercise]) {
    poseImg.src = exerciseImages[inputExercise] + '.svg'
  }
}
