// import ProjectInfo from '../store/transation.store';
export default {
  color:  ['#5CDC3B','#FE6868', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  legend: {
    data:['Buying Price','Selling Price'],
  },  
  xAxis: {
    splitNumber: 5,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Buying Price',
      type: 'line',
      // showSymbol: false,
      data: []
    },
    {
      name: 'Selling Price',
      type: 'line',
      // showSymbol: false,
      data: []
    }
  ]
};
