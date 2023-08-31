window.onload = function () {
  let setNum = Number(window.localStorage.getItem('setNum'))

  let avgAccuracy = Number(window.localStorage.getItem('set' + setNum))

  let setsAccuracy = JSON.parse(window.localStorage.getItem('setsAccuracy'))
  setsAccuracy.push(avgAccuracy)
  window.localStorage.setItem('setsAccuracy', JSON.stringify(setsAccuracy))

  let feedbackList = JSON.parse(window.localStorage.getItem('feedbackList'));
  printFeedback(feedbackList)
}

function printFeedback (feedbackList) {
  let feedbackContent = document.getElementById('feedbackContent');

  feedbackList.forEach((feedback, index) => {
    let span = document.createElement('span');
    span.textContent = (index + 1) + '. ' + feedback;

    feedbackContent.appendChild(span);
  });
}
