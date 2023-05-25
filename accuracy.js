const index = {
  leftShoulder: 5,
  rightShoulder: 6,
  leftElbow: 7,
  rightElbow: 8,
  leftHip: 11,
  rightHip: 12,
  leftKnee: 13,
  rightKnee: 14,
  leftAnkle: 15,
  rightAnkle: 16
}

// 1.스쿼트 왼쪽 상체, 2.왼쪽 하체
// 1.래터럴 레이즈 왼쪽 팔, 2.오른쪽 팔
// 1.레그레이즈 오른쪽(왼발 수행) 상체, 2.왼쪽 하체
// 1.레그레이즈 왼쪽(오른발 수행) 상체, 2.오른쪽 하체
// 1.런지 왼쪽 상체, 2.왼쪽 하체
// 1.런지 오른쪽 상체, 2.오른쪽 하체

const angleIndex = {
  squat: {
    index1: [index.rightHip, index.rightShoulder, index.rightKnee],
    index2: [index.rightKnee, index.rightHip, index.rightAnkle]
  },

  lateralraise: {
    index1: [index.rightShoulder, index.rightHip, index.rightElbow],
    index2: [index.leftShoulder, index.leftHip, index.leftElbow]
  },

  'legraise-left': {
    index1: [index.rightHip, index.rightShoulder, index.rightKnee],
    index2: [index.leftHip, index.leftKnee]
  },

  'legraise-right': {
    index1: [index.leftHip, index.leftShoulder, index.leftKnee],
    index2: [index.rightHip, index.rightKnee]
  },

  'lunge-left': {
    index1: [index.rightHip, index.rightShoulder, index.rightKnee],
    index2: [index.rightKnee, index.rightHip, index.rightAnkle]
  },

  'lunge-right': {
    index1: [index.leftHip, index.leftShoulder, index.leftKnee],
    index2: [index.leftKnee, index.leftHip, index.leftAnkle]
  }
}

// 올바른 각도, 각도 간격, 최소, 최대
const scoreInfo = {
  squat: {
    upper: [40, 10, 10, 90],
    lower: [85, 5, 30, 140]
  },

  lateralraise: {
    left: [90, 5, 45, 110],
    right: [90, 5, 45, 110]
  },

  'legraise-left': {
    upper: [180, 5, 150, 185],
    lower: [50, 5, 30, 90]
  },

  'legraise-right': {
    upper: [180, 5, 150, 185],
    lower: [50, 5, 30, 90]
  },

  'lunge-left': {
    upper: [90, 5, 70, 110],
    lower: [90, 5, 60, 110]
  },

  'lunge-right': {
    upper: [90, 5, 70, 110],
    lower: [90, 5, 60, 110]
  }
}

const CORRECT_ANGLE = 0
const INTERVAL = 1
const MIN_ANGLE = 2
const MAX_ANGLE = 3
const PERFECT_SCORE = 10

let points = new Array()
let angles = new Array()

function getPoint (pose) {
  for (let i = 0; i < 17; i++) {
    points.push([0, 0])
  }

  for (let part in index) {
    points[index[part]] = [
      pose.keypoints[index[part]].position.x,
      pose.keypoints[index[part]].position.y
    ]
  }
}

export function getAngle (inputExercise, pose) {
  getPoint(pose)

  for (let key in angleIndex[inputExercise]) {
    let idx = angleIndex[inputExercise][key]

    let cx = points[idx[0]][0]
    let cy = points[idx[0]][1]
    let x1 = points[idx[1]][0]
    let y1 = points[idx[1]][1]
    let x2, y2

    if (idx.length == 2) {
      x2 = points[idx[0]][0]
      y2 = points[idx[1]][1]
    } else {
      x2 = points[idx[2]][0]
      y2 = points[idx[2]][1]
    }

    calculateAngle(cx, cy, x1, y1, x2, y2)
  }

  points.length = 0
  angles.length = 0
}

function calculateAngle (cx, cy, x1, y1, x2, y2) {
  let v1X = x1 - cx
  let v1Y = y1 - cy
  let v2X = x2 - cx
  let v2Y = y2 - cy

  let v1 = Math.sqrt(Math.pow(v1X, 2) + Math.pow(v1Y, 2))
  let v2 = Math.sqrt(Math.pow(v2X, 2) + Math.pow(v2Y, 2))

  let angle = (Math.acos((v1X * v2X + v1Y * v2Y) / (v1 * v2)) * 180) / Math.PI
  angles.push(angle)
}

export function calculateAccuracy (inputExercise) {
  let idx = 0
  let score = 0

  for (let part in scoreInfo[inputExercise]) {
    let info = scoreInfo[inputExercise][part]

    if (angles[idx] <= info[MIN_ANGLE] || angles[idx] >= info[MAX_ANGLE]) {
      score = 0
    } else {
      let diff = Math.abs(info[CORRECT_ANGLE] - userAngle)
      score += PERFECT_SCORE - parseInt(diff / info[INTERVAL])
    }

    idx++
  }

  score /= idx

  score += window.localStorage.getItem('totalScore')
  minScore = window.localStorage.getItem('minScore')
  maxScore = window.localStorage.getItem('maxScore')

  window.localStorage.setItem('totalScore', score)
  window.localStorage.setItem('minScore', Math.min(minScore, score))
  window.localStorage.setItem('maxScore', Math.max(maxScore, score))
}

export function scoreToPercent () {
  let averageAccuracy =
    (window.localStorage.getItem('totalScore') /
      window.localStorage.getItem('inputReps')) *
    10
  let minAccuracy = Math.min(
    window.localStorage.getItem('minAccuracy'),
    window.localStorage.getItem('minScore') * 10
  )

  let maxAccuracy = Math.max(
    window.localStorage.getItem('maxAccuracy'),
    window.localStorage.getItem('maxScore') * 10
  )

  let setNum = window.localStorage.getItem('setNum')
  window.localStorage.setItem('set' + setNum, averageAccuracy)
  window.localStorage.setItem('minAccuracy', minAccuracy)
  window.localStorage.setItem('maxAccuracy', maxAccuracy)

  window.localStorage.removeItem('totalScore')
  window.localStorage.removeItem('minScore')
  window.localStorage.removeItem('maxScore')
}
