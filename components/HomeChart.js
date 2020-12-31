import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: [
    'chartData',
    'label',
    'borderColor',
    'fontColor',
    'rgb1',
    'rgb2',
    'rgb3'
  ],
  data () {
    return {
      gradient: null
    }
  },
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 230, 0, 50)

    this.gradient.addColorStop(1, this.rgb1 || 'rgba(66,134,121,0.15)')
    this.gradient.addColorStop(0.5, this.rgb2 || 'rgba(66,134,121,0.0)')
    this.gradient.addColorStop(0, this.rgb3 || 'rgba(66,134,121,0)')

    this.renderChart({
      labels: this.label,
      datasets: [{
        label: '฿',
        fill: true,
        backgroundColor: this.gradient,
        hoverBackgroundColor: this.gradient,
        borderColor: this.borderColor || '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        data: this.chartData
      }]
    },
    {
      // responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          stacked: true,
          ticks: {
            fontColor: this.fontColor || '#9e9e9e',
            beginAtZero: true
          }
        }],

        xAxes: [{
          stacked: true,
          ticks: {
            fontColor: this.fontColor || '#9e9e9e'
          }
        }]
      }
    })
  }
}
