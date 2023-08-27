window.onload = function () {
  exerciseButtonHandler()
}

function exerciseButtonHandler () {
  const radioButtons = document.querySelectorAll(
    ".exercise-radio-btn input[type='radio']"
  )
  const parentDivs = document.querySelectorAll('.exercise-radio-btn')

  radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener('change', () => {
      parentDivs.forEach(div => {
        div.classList.remove('selected')
      })
      parentDivs[index].classList.toggle('selected')
    })
  })
}

const numberRegex = /^((500)|([1-4]\d{2})|([1-9]\d{1})|([1-9]))$/

function settingButtonHandler () {
  let inputExercise = $(".exercise-radio-btn input[type='radio']:checked").val()
  let inputReps = $("#reps-input input[type='number']").val()

  if (!numberRegex.test(inputReps)) {
    $('#alert-box').show()
    $("#reps-input input[type='number']").val('')
    return
  }

  window.localStorage.setItem('inputExercise', inputExercise)
  window.localStorage.setItem('inputReps', inputReps)
}
