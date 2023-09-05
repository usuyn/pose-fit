//setsAccuracy, minAccuracy, meanAccuracy, maxAccuracy
let setNum = Number(window.localStorage.getItem("setNum"));

let minAccuracy = Number(window.localStorage.getItem("minAccuracy"));
let maxAccuracy = Number(window.localStorage.getItem("maxAccuracy"));
let meanAccuracy = Number(window.localStorage.getItem("set" + setNum));
let setsAccuracy = JSON.parse(window.localStorage.getItem("setsAccuracy"));

const minChart = new Highcharts.Chart("minChart", {
  chart: {
    renderTo: "minChart",
    type: "solidgauge",
    backgroundColor: "transparent",
    width: 230,
    height: 230,
  },

  credits: {
    enabled: false,
  },

  title: {
    text: "최소",
    style: {
      fontSize: "23px",
      fontWeight: 600,
    },
  },

  tooltip: {
    enabled: false,
  },

  pane: {
    background: null,
  },

  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [],
    stops: [
      [
        1,
        {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#78A6C8"],
            [1, "#326789"],
          ],
        },
      ],
    ],
  },

  plotOptions: {
    solidgauge: {},
  },

  series: [
    {
      data: [
        {
          radius: "112%",
          innerRadius: "90%",
          y: minAccuracy,
        },
      ],

      dataLabels: {
        enabled: true,
        style: {
          fontSize: "40px",
          fontWeight: 800,
          letterSpacing: "2px",
        },
        y: -30,
        borderWidth: 0,
      },
    },
  ],
});

const meanChart = new Highcharts.Chart("meanChart", {
  chart: {
    renderTo: "meanChart",
    type: "solidgauge",
    backgroundColor: "transparent",
    width: 230,
    height: 230,
  },

  credits: {
    enabled: false,
  },

  title: {
    text: "평균",
    style: {
      fontSize: "23px",
      fontWeight: 600,
    },
  },

  tooltip: {
    enabled: false,
  },

  pane: {
    background: null,
  },

  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [],
    stops: [
      [
        1,
        {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#78A6C8"],
            [1, "#326789"],
          ],
        },
      ],
    ],
  },

  plotOptions: {
    solidgauge: {},
  },

  series: [
    {
      data: [
        {
          radius: "112%",
          innerRadius: "90%",
          y: meanAccuracy,
        },
      ],

      dataLabels: {
        enabled: true,
        style: {
          fontSize: "40px",
          fontWeight: 800,
          letterSpacing: "2px",
        },
        y: -30,
        borderWidth: 0,
      },
    },
  ],
});

let maxChart = new Highcharts.Chart("maxChart", {
  chart: {
    renderTo: "maxChart",
    type: "solidgauge",
    backgroundColor: "transparent",
    width: 230,
    height: 230,
  },

  credits: {
    enabled: false,
  },

  title: {
    text: "최대",
    style: {
      fontSize: "23px",
      fontWeight: 600,
    },
  },

  tooltip: {
    enabled: false,
  },

  pane: {
    background: null,
  },

  yAxis: {
    min: 0,
    max: 100,
    lineWidth: 0,
    tickPositions: [],
    stops: [
      [
        1,
        {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#78A6C8"],
            [1, "#326789"],
          ],
        },
      ],
    ],
  },

  plotOptions: {
    solidgauge: {},
  },

  series: [
    {
      data: [
        {
          radius: "112%",
          innerRadius: "90%",
          y: maxAccuracy,
        },
      ],

      dataLabels: {
        enabled: true,
        style: {
          fontSize: "40px",
          fontWeight: 800,
          letterSpacing: "2px",
        },
        y: -30,
        borderWidth: 0,
      },
    },
  ],
});

let setsGraph = new Highcharts.Chart("setsAccuracyGraph", {
  chart: {
    renderTo: "setsAccuracyGraph",
    type: "spline",
    backgroundColor: "transparent",
    width: 700,
    height: 350,
  },

  title: {
    text: "",
  },

  legend: {
    enabled: false,
  },

  credits: {
    enabled: false,
  },

  tooltip: {
    enabled: false,
  },

  xAxis: {
    categories: Array.from(
      { length: setsAccuracy.length },
      (_, i) => `${i + 1}`
    ),
    lineColor: "#B0B0B0",
    gridLineColor: "#B0B0B0",
    gridLineWidth: 1,
    gridLineDashStyle: "Solid",
    tickmarkPlacement: "on",
    labels: {
      style: {
        fontFamily: "Pretendard",
        fontSize: "12px",
      },
    },
  },

  yAxis: {
    min: 20,
    max: 100,
    tickInterval: 20,
    gridLineColor: "#B0B0B0",
    gridLineWidth: 1,
    gridLineDashStyle: "Solid",
    title: {
      text: "",
    },
    labels: {
      style: {
        fontFamily: "Pretendard",
        fontSize: "12px",
      },
    },
  },

  plotOptions: {
    spline: {
      marker: {
        enabled: true,
        symbol: "circle",
        radius: 7,
      },
      lineWidth: 5,
    },
  },

  series: [
    {
      data: setsAccuracy,
      color: "#326789",
    },
  ],
});

const restTime = 30;
let timerValue = restTime;
let timerInterval;

const timerChart = Highcharts.chart("timer", {
  chart: {
    type: "solidgauge",
    backgroundColor: "transparent",
  },

  title: null,

  pane: {
    background: null,
    startAngle: 0,
    endAngle: 360,
  },

  tooltip: {
    enabled: false,
  },

  credits: {
    enabled: false,
  },

  yAxis: {
    min: 0,
    max: timerValue,
    lineWidth: 0,
    tickPositions: [],
    stops: [
      [
        1,
        {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#78A6C8"],
            [1, "#326789"],
          ],
        },
      ],
    ],
  },
  plotOptions: {
    solidgauge: {},
  },
  series: [
    {
      data: [
        {
          radius: "112%",
          innerRadius: "90%",
          y: timerValue,
        },
      ],

      dataLabels: {
        enabled: true,
        style: {
          fontSize: "40px",
          fontWeight: 800,
          letterSpacing: "2px",
        },
        y: -30,
        borderWidth: 0,
      },
    },
  ],
});

function startTimer() {
  clearInterval(timerInterval);
  timerValue = restTime;
  timerChart.series[0].points[0].update(timerValue);

  timerInterval = setInterval(function () {
    timerValue--;
    if (timerValue == 0) {
      clearInterval(timerInterval);
      window.location.href = "exercise.html";
    }

    timerChart.series[0].points[0].update(timerValue);
  }, 1000);
}
