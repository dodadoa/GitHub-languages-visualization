import React,{ Component } from 'react';
import reactCSS from 'reactcss'
import { fetchGithub, loadRepositories, checkChange } from '../actions/search.js';
import SearchBox from './searchBox';
import BarChartVisualizer from './barChartVisualizer';
import { connect } from 'react-redux';


const styles = reactCSS({
  'default': {
    wrap: {
      padding: '70px 150px 20px 150px'
    },
    searchBox: {
      paddingRight: '20px'
    },
    barChart: {
      padding: '5px 10px 5px 20px '
    }
  },
})

class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const { search, fetchGithub, loadRepositories, checkChange } = this.props

    return(
      <div style={styles.wrap}>
        <div style={styles.searchBox}>
          <SearchBox
            handleEnter={fetchGithub}
              onChange={checkChange}
            isFetch={search.isFetch}
          />
        </div>
        <div style={styles.barChart}>
          <BarChartVisualizer
            fetchedData={search.data}
            handleClickTick={loadRepositories}
            animation={search.animation}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

export default connect(mapStateToProps, {fetchGithub, loadRepositories,  checkChange})(App);
