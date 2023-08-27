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

function settingButtonHandler () {
  let inputExercise = $(".exercise-radio-btn input[type='radio']:checked").val()

  window.localStorage.setItem('inputExercise', inputExercise)
}
