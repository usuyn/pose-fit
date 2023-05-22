const URL = 'https://teachablemachine.withgoogle.com/models/KJRP6ylE8/'
let model, webcam, ctx, labelContainer, maxPredictions

window.onload = function () {
  init()
}

async function init () {
  const modelURL = URL + 'model.json'
  const metadataURL = URL + 'metadata.json'

  model = await tmPose.load(modelURL, metadataURL)
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

var status = 'stand'
var count = 0

async function predict () {
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)
  const prediction = await model.predict(posenetOutput)
  if (prediction[1].probability.toFixed(2) == 1.0) {
    if (status == 'squat') {
      count++
      $('#counter').html(count)
    }
    status = 'stand'
  } else if (prediction[0].probability.toFixed(2) == 1.0) {
    status = 'squat'
  }

  // for (let i = 0; i < maxPredictions; i++) {
  //     const classPrediction =
  //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
  //     labelContainer.childNodes[i].innerHTML = classPrediction;
  // }

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
