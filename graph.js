let min_score = 68
let mean_score = 75
let max_score = 92

let sets_acc = [20, 52, 70, 89, 42, 68, 52]

let min_chart = new Highcharts.Chart('min-chart', {
    chart: {
        renderTo: 'min-chart',
        type: 'solidgauge',
        backgroundColor: "transparent",
        width: 230,
        height: 230
    },

    credits: {
        enabled: false
    },

    title: {
        text: '최소',
        style: {
            fontSize: '23px',
            fontWeight: 600
        }
    },

    tooltip: {
        enabled: false
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
            [1, {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#78A6C8'],
                    [1, '#326789']
                ]
            }]
        ],
    },

    plotOptions: {
        solidgauge: {

        }
    },

    series: [{
        data: [
            {
                radius: '112%',
                innerRadius: '90%',
                y: min_score
            }
        ],

        dataLabels: {
            enabled: true,
            style: {
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '2px'
            },
            y: -30,
            borderWidth: 0
        }
    }]
})

let mean_chart = new Highcharts.Chart('mean-chart', {
    chart: {
        renderTo: 'mean-chart',
        type: 'solidgauge',
        backgroundColor: "transparent",
        width: 230,
        height: 230
    },

    credits: {
        enabled: false
    },

    title: {
        text: '평균',
        style: {
            fontSize: '23px',
            fontWeight: 600
        }
    },

    tooltip: {
        enabled: false
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
            [1, {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#78A6C8'],
                    [1, '#326789']
                ]
            }]
        ],
    },

    plotOptions: {
        solidgauge: {

        }
    },

    series: [{
        data: [
            {
                radius: '112%',
                innerRadius: '90%',
                y: mean_score
            }
        ],

        dataLabels: {
            enabled: true,
            style: {
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '2px'
            },
            y: -30,
            borderWidth: 0
        }
    }]
})

let max_chart = new Highcharts.Chart('max-chart', {
    chart: {
        renderTo: 'max-chart',
        type: 'solidgauge',
        backgroundColor: "transparent",
        width: 230,
        height: 230
    },

    credits: {
        enabled: false
    },

    title: {
        text: '최대',
        style: {
            fontSize: '23px',
            fontWeight: 600
        }
    },

    tooltip: {
        enabled: false
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
            [1, {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#78A6C8'],
                    [1, '#326789']
                ]
            }]
        ],
    },

    plotOptions: {
        solidgauge: {

        }
    },

    series: [{
        data: [
            {
                radius: '112%',
                innerRadius: '90%',
                y: max_score
            }
        ],

        dataLabels: {
            enabled: true,
            style: {
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '2px'
            },
            y: -30,
            borderWidth: 0
        }
    }]
})

let sets_graph = new Highcharts.Chart('sets-accuracy-graph', {
    chart: {
        renderTo: 'sets-accuracy-graph',
        type: 'spline',
        backgroundColor: "transparent",
        width: 700,
        height: 350
    },

    title: {
        text: ''
    },

    legend: {
        enabled: false
    },

    credits: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    xAxis: {
        categories: Array.from({ length: sets_acc.length }, (_, i) => `${i + 1}`),
        lineColor: '#B0B0B0',
        gridLineColor: '#B0B0B0',
        gridLineWidth: 1,
        gridLineDashStyle: 'Solid',
        tickmarkPlacement: 'on',
        labels: {
            style: {
                fontFamily: 'Pretendard',
                fontSize: '12px'
            }
        }
    },

    yAxis: {
        min: 20,
        max: 100,
        tickInterval: 20,
        gridLineColor: '#B0B0B0',
        gridLineWidth: 1,
        gridLineDashStyle: 'Solid',
        title: {
            text: ''
        },
        labels: {
            style: {
                fontFamily: 'Pretendard',
                fontSize: '12px'
            }
        }
    },

    plotOptions: {
        spline: {
            marker: {
                enabled: true,
                symbol: 'circle',
                radius: 7,
            },
            lineWidth: 5,
        }
    },

    series: [{
        data: sets_acc,
        color: '#326789'
    }]
})

let timerValue = 60;
let timerInterval;

let timerChart = Highcharts.chart('timer', {
    chart: {
        type: 'solidgauge',
        backgroundColor: "transparent"
    },

    title: null,

    pane: {
        background: null,
        startAngle: 0,
        endAngle: 360,
    },

    tooltip: {
        enabled: false
    },

    credits: {
        enabled: false
    },

    yAxis: {
        min: 0,
        max: 60,
        lineWidth: 0,
        tickPositions: [],
        stops: [
            [1, {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#78A6C8'],
                    [1, '#326789']
                ]
            }]
        ],
    },
    plotOptions: {
        solidgauge: {

        }

    },
    series: [{
        data: [{
            radius: '112%',
            innerRadius: '90%',
            y: timerValue
        }],
        
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '2px'
            },
            y: -30,
            borderWidth: 0
        }
    }]
});

function startTimer() {
    clearInterval(timerInterval);
    timerValue = 60;
    timerChart.series[0].points[0].update(timerValue);

    timerInterval = setInterval(function () {
        timerValue--;
        if (timerValue == 0) {
            clearInterval(timerInterval);
        }

        timerChart.series[0].points[0].update(timerValue);
    }, 1000);
}

document.getElementById('stopwatch-icon').addEventListener('click', startTimer);