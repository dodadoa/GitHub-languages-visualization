import { BarChart, Bar, XAxis, YAxis, Cell, Rectangle, Text, ResponsiveContainer } from 'recharts';
import React, {Component} from 'react';
import reactCSS from 'reactcss'
import SvgIcon from 'material-ui/SvgIcon';

const barChartStyle = {
  tick: {
    fill: 'rgb(0, 0, 0)',
    stroke: 'rgb(0, 0, 0)',
    strokeWidth: 1 ,
    fontFamily: 'roboto',
  },
  tick_active:{
    fill: 'rgb(29, 165, 223)',
    fontFamily: 'roboto',
  },
  label: {
    fontFamily: 'roboto',
    fill: '#8884d8',
  },
  label_active:{
    fontFamily: 'roboto',
    fill: 'rgb(139, 139, 139)',

  }
}

class BarChartVisualizer extends Component{
  constructor(props){
    super(props);
  }

  handleClick=(e)=>{
    const { handleClickTick, fetchedData } = this.props;
    if(fetchedData[e.index].expand == false){
      handleClickTick(e.value);
    }
  }

  render() {

    const { fetchedData, animation } = this.props;

    const customTickYAxis=(props)=>{
      const {x, y ,stroke, payload, index, textAnchor } = props;
      if( fetchedData && fetchedData[index].expand == true){
        const shiftToTop = 11;
        return(
          <Text {...props} textAnchor="start" x={130} y={y - shiftToTop}style={barChartStyle.tick_active}>
            {fetchedData[index].repoName}
          </Text>
        )
      }else{
        return(
          <Text {...props} x={x - 10} style={barChartStyle.tick}>
            {payload.value}
          </Text>
        )
      }
    }

    const customLabel=(props)=>{
      const {x, y, index, width, height, dx, dy} = props;
      if( fetchedData && fetchedData[index].expand == true){
        const shiftToTop = 11;
        return(
          <g className="recharts-layer recharts-bar-labels" key={index}>
            <Text {...props} textAnchor="end" x={870} y={y - shiftToTop} style={barChartStyle.label_active}>
              {fetchedData[index].star}
            </Text>
            <svg x={880} y={y - 9.7 - shiftToTop}>
              <path fill="rgb(101, 101, 101)"  d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218" />
            </svg>
          </g>
        )
      }else{
        return(
          <Text {...props} x={x+10} style={barChartStyle.label}>
            {fetchedData[index].count}
          </Text>
        )
      }
    }

    const customBar =(props)=>{
      const { expand, height, x, y } = props;
      const shiftToBottom = 37;
      const dPath = `M 130,${y + shiftToBottom} h 800 v 1 h -800 Z`
      if(expand){
        return(
        <svg>
          <path d={dPath} fill="rgb(212, 212, 212)" />
        </svg>
        )
      }else{
        return(
          <Rectangle {...props} height={32} fill='#8884d8' />
        )
      }
    }

    const aspect = (900/( fetchedData.length * 50 ));

    return (
      <div>
        <ResponsiveContainer width={900} aspect={aspect} height="100%">
          <BarChart data={fetchedData} layout='vertical' margin={{left: 70, right: 40}} >
            <YAxis onClick={this.handleClick} tick={customTickYAxis} type="category" dataKey="name" axisLine={false} tickLine={false}/>
            <XAxis hide={true} type="number"/>
            <Bar isAnimationActive={animation} shape={customBar} dataKey='count' label={customLabel} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default BarChartVisualizer;
