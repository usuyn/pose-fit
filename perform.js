import {
  calculateAccuracy,
  getAngle,
  scoreToPercent,
  checkAngles
} from './accuracy.js'

let model, webcam, ctx, labelContainer, maxPredictions
let inputExercise = 'squat'
let inputReps = 3
let inputSets = 1

let models = {
  squat: 'https://teachablemachine.withgoogle.com/models/VjoSZwCaL/'
}

window.onload = function () {
  window.localStorage.clear() // 삭제할 것
  // inputExercise = // local storage
  // inputReps = // local storage
  // inputSets = // local storage
  window.localStorage.setItem('setNum', 1) // 현재까지 수행한 세트 수
  window.localStorage.setItem('totalScore', 0)
  window.localStorage.setItem('minScore', 11)
  window.localStorage.setItem('maxScore', -1)
  window.localStorage.setItem('minAccuracy', 101)
  window.localStorage.setItem('maxAccuracy', -1)
  window.localStorage.setItem('inputReps', inputReps) // 삭제할 것

  $('#inputReps').html(inputReps)
  init()
}

async function init () {
  const modelPath = models[inputExercise] + 'model.json'
  const metadataPath = models[inputExercise] + 'metadata.json'

  model = await tmPose.load(modelPath, metadataPath)
  maxPredictions = model.getTotalClasses()

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
  labelContainer = document.getElementById('label-container')

  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement('div'))
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
      $('#counter').html(count)

      userAngles = checkAngles(inputExercise, userAngles)
      console.log(userAngles)
      calculateAccuracy(inputExercise, userAngles)
      userAngles.length = 0
    }
    status = inputExercise + '-prepare'
  } else if (prediction[1].probability.toFixed(2) == 1.0) {
    status = inputExercise

    const poseCopy = _.cloneDeep(pose)
    userAngles = getAngle(inputExercise, poseCopy)
  }

  if (count == inputReps) {
    scoreToPercent()
    let setNum = Number(window.localStorage.getItem('setNum')) + 1
    window.localStorage.setItem('setNum', setNum)
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
