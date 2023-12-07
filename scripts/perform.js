import {
  calculateAccuracy,
  getAngle,
  scoreToPercent,
  checkAngles,
  generateFeedback
} from './accuracy.js'

let model, webcam, ctx
let inputExercise, inputReps, inputSets

let models = {
  squat: 'https://teachablemachine.withgoogle.com/models/VjoSZwCaL/',
  lateralraise: 'https://teachablemachine.withgoogle.com/models/Lx3OtCKiQ/',
  'legraise-left': 'https://teachablemachine.withgoogle.com/models/wDXxvzk9i/',
  'legraise-right': 'https://teachablemachine.withgoogle.com/models/wDXxvzk9i/',
  'lunge-left': 'https://teachablemachine.withgoogle.com/models/IJsMr6OiC/',
  'lunge-right': 'https://teachablemachine.withgoogle.com/models/IJsMr6OiC/'
}

window.onload = function () {
  prepareData()

  $('#inputReps').html(inputReps)
  $('#inputSets').html(inputSets)
  $('#setCounter').html(Number(window.localStorage.getItem('setNum')))
  init()
}

function prepareData () {
  window.localStorage.setItem('totalScore', 0)
  window.localStorage.setItem('minScore', 11)
  window.localStorage.setItem('maxScore', -1)
  window.localStorage.setItem('minAccuracy', 101)
  window.localStorage.setItem('maxAccuracy', -1)
  window.localStorage.setItem('feedbackAngles', JSON.stringify([0, 0]))

  let setNum = Number(window.localStorage.getItem('setNum'))
  window.localStorage.setItem('setNum', setNum ? setNum + 1 : 1)

  let setsAccuracy = JSON.parse(window.localStorage.getItem('setsAccuracy'))
  window.localStorage.setItem(
    'setsAccuracy',
    setsAccuracy ? JSON.stringify(setsAccuracy) : JSON.stringify([])
  )

  inputExercise = window.localStorage.getItem('inputExercise')
  inputReps = Number(window.localStorage.getItem('inputReps'))
  inputSets = Number(window.localStorage.getItem('inputSets'))
}

const cameraDeniedToast = Swal.mixin({
  toast: true,
  position: 'center-center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

async function init () {
  const modelPath = models[inputExercise] + 'model.json'
  const metadataPath = models[inputExercise] + 'metadata.json'

  model = await tmPose.load(modelPath, metadataPath)

  try {
    const size = 500
    const flip = true
    webcam = new tmPose.Webcam(size, size, flip)
    await webcam.setup()
    await webcam.play()
    window.requestAnimationFrame(loop)

    const canvas = document.getElementById('cam-canvas')
    canvas.width = size
    canvas.height = size
    ctx = canvas.getContext('2d')
  } catch (error) {
    await cameraDeniedToast.fire({
      icon: 'error',
      title: '카메라 권한이 거부되어 운동을 시작할 수 없습니다!'
    })
    window.localStorage.clear()
    window.location.href = 'index.html'
  }
}

async function loop (timestamp) {
  webcam.update()
  await predict()
  window.requestAnimationFrame(loop)
}

let status = inputExercise + '-prepare'
let count = 0

let flag = true
let userAngles

async function predict () {
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)
  const prediction = await model.predict(posenetOutput)

  if (flag) {
    prediction[0].probability = 1.0
    flag = false
  }

  if (prediction[0].probability.toFixed(2) == 1.0) {
    if (status == inputExercise) {
      count++
      $('#repsCounter').html(count)

      userAngles = checkAngles(inputExercise, userAngles)
      window.localStorage.setItem('feedbackAngles', saveAngles())
      calculateAccuracy(inputExercise, userAngles)
      userAngles.length = 0
    }
    status = inputExercise + '-prepare'
  } else if (
    prediction[1].probability.toFixed(2) == 1.0 ||
    (prediction[2] ? prediction[2].probability.toFixed(2) == 1.0 : false)
  ) {
    inputExercise =
      prediction[1].probability.toFixed(2) == 1.0
        ? prediction[1].className
        : prediction[2].className
    window.localStorage.setItem('inputExercise', inputExercise)
    status = inputExercise

    const poseCopy = _.cloneDeep(pose)
    userAngles = _.cloneDeep(getAngle(inputExercise, poseCopy))
  }

  if (count == inputReps) {
    scoreToPercent()
    generateFeedback()

    window.location.replace(
      document.location.href.replace('exercise.html', 'analysis.html')
    )
  }

  drawPose(pose)
}

function drawPose (pose) {
  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0)

    if (pose) {
      const minPartConfidence = 0.5
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx)
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx)
    }
  }
}

function saveAngles () {
  let feedbackAngles = JSON.parse(window.localStorage.getItem('feedbackAngles'))

  feedbackAngles.forEach((angle, index) => {
    feedbackAngles[index] = Number((angle + userAngles[index]).toFixed(2))
  })

  return JSON.stringify(feedbackAngles)
}
