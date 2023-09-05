//  index.html, service-guide.html
function tabItemHandler() {
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach((tabItem) => {
    tabItem.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      window.location.href = page;
    });
  });
}

function indexExerciseButtonHandler() {
  const exerciseButton = document.getElementById("exercise-btn");

  exerciseButton.addEventListener("click", function () {
    window.open("setting.html", "_blank", "width=550px,height=450px");
  });
}

function gitHubButtonHandler() {
  const gitLink = document.getElementById("git-link");

  gitLink.addEventListener("click", function () {
    window.location.href = "https://github.com/hippo-zone";
  });
}

//  setting.html
function settingButtonHandler() {
  const settingButton = document.getElementById("setting-btn");

  settingButton.addEventListener("click", function () {
    window.open("pose-guide-camera.html", "_blank", "width=500px,height=501px");
    window.opener.location.href = "exercise.html";
    window.close();
  });
}

//  pose-guide-camera.html
function cameraConfirmButtonHandler() {
  const cameraConfirmButton = document.getElementById("camera-confirm-btn");

  cameraConfirmButton.addEventListener("click", function () {
    window.open("pose-guide.html", "_blank", "width=500px,height=501px");
    window.close();
  });
}

//  pose-guide.html
function confirmButtonHandler() {
  const confirmButton = document.getElementById("confirm-btn");

  confirmButton.addEventListener("click", function () {
    window.close();
  });
}

//  exercise.html
function quitButtonHandler() {
  const quitButton = document.getElementById("quit-btn");
  let setNum = Number(window.localStorage.getItem("setNum"));

  quitButton.addEventListener("click", function () {
    if (setNum == 0) window.location.href = "index.html";
    else window.location.href = "analysis.html";
  });
}
