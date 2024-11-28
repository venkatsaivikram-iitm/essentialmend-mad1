import { $ } from "./utils/common-utils";
import ConfigHolder from "./utils/config-holder"


const chart1 = $("#chart1");
const chart2 = $("#chart2");
const chart3 = $("#chart3");
const chart4 = $("#chart4");



const mountCharts = () => {
    const chartData = {
        chart1: {
            labels: window.dashboardData.serviceRequests.map((r) => r[0]),
            data: window.dashboardData.serviceRequests.map((r) => r[1]),
        },
        ...(ConfigHolder.isAdmin ? {
            chart2: {
              labels: window.dashboardData.professionals.map((r) => r[0]),
              data: window.dashboardData.professionals.map((r) => r[1]),
            },
            chart3: {
              labels: window.dashboardData.professionalRatings.map((r) => r[0]),
              data: window.dashboardData.professionalRatings.map((r) => r[1]),
            },
            chart4: {
              labels: window.dashboardData.professionalReviews.map((r) => r[0]),
              data: window.dashboardData.professionalReviews.map((r) => r[1]),
            }
          } : {
            chart2: {
              labels: window.dashboardData.reviews.map((r) => r[0]),
              data: window.dashboardData.reviews.map((r) => r[1]),
            }
          }
        )
    }
    
    new Chart(chart1, {
      type: 'bar',
      data: {
        labels: chartData.chart1.labels,
        datasets: [{
          label: 'Service Request Status',
          data: chartData.chart1.data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(chart2, {
        type: 'bar',
        data: {
            labels: chartData.chart2.labels,
            datasets: [{
              label: ConfigHolder.isAdmin ? 'Professional Status' : 'Reviews Rating',
              data: chartData.chart2.data,
              borderWidth: 1
            }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      if (ConfigHolder.isAdmin) {
        new Chart(chart3, {
          type: 'bar',
          data: {
              labels: chartData.chart3.labels,
              datasets: [{
                label: 'Professionals Rating',
                data: chartData.chart3.data,
                borderWidth: 1
              }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        new Chart(chart4, {
          type: 'bar',
          data: {
              labels: chartData.chart4.labels,
              datasets: [{
                label: 'Professionals Reviews',
                data: chartData.chart4.data,
                borderWidth: 1
              }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
};

mountCharts()