import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function Chart({data}) {

  let arr = [];
  let axis = [];

  data.all_events.data.map((e) => {
    let date = new Date(e.debut).getFullYear()
    if (axis.indexOf(date) === -1 && date >= 2010) {
      axis.push(date);
    }
  });

  let events = [];

  axis.map(() => {
    events.push(0)
  });

  data.all_events.data.map((e, i) => {
    e.categorie.map((category) => {
      let events = [];

      axis.map(() => {
        events.push(0)
      });

      if (category !== "" && category !== 'publications') {
        if (arr.find((el) => el && el.name === category)) {
          let elementDate = new Date(e.debut).getFullYear()
          arr.find((e) => {
            if (e.name === category) {
              e.data[axis.indexOf(elementDate)]++
            }
          })
        } else {
          let customColor = "#000"
          switch (category) {
            case "controles-et-regulations":
              customColor = "#ff3d00";
              break;

            case "critiques-et-contournements":
              customColor = "#4caf50";
              break;

            case "marche-et-entreprises":
              customColor = "#f79845";
              break;

            case "infrastructures-et-technologies":
              customColor = "#cddc39";
              break;

            case "contexte national-et-international":
              customColor = "#651fff";
              break;

            case "publications":
              customColor = "#d500f9";
              break;
          }
          let elementDate2 = new Date(e.debut).getFullYear()

          events[axis.indexOf(elementDate2)]++;
          let obj = {
            name: category,
            data: events,
            color: customColor,
            marker: {
              symbol: 'round'
            }
          }
          arr.push(obj)
        }
      }
    });
  })

  const options = {

    title: {
      text: 'Nombre d\'événement de 2010 à 2020'
    },

    chart: {
      type: 'spline',
    },

    subtitle: {
      text: ''
    },

    yAxis: {
      title: {
        text: 'Nombre d\'événements'
      }
    },

    xAxis: {
      categories: axis
    },

    legend: {
      labelFormatter: function () {
        return this.name.replace(/-/g, " ").charAt(0).toUpperCase() + this.name.slice(1).replace(/-/g, " ");
      }
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },
    series: arr,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  }

  return <HighchartsReact
    className="chart"
    highcharts={Highcharts}
    options={options}
  />
}