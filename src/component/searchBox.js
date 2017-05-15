import React,{Component} from 'react';
import reactCSS from 'reactcss'
import TextField from 'material-ui/TextField';
import { reduxForm, Field } from 'redux-form';

const pinky = "rgb(255, 84, 146)";

const styles = reactCSS({
  'default': {
    loadingText: {
      top: '13px',
      color: 'rgb(152, 152, 152)',
      fontSize: '16px',
      fontFamily: 'roboto'
    },
  },
})

const materialStyles = {
  underline: {
    borderColor: pinky,
    borderWidth: "2px"
  },
  input: {
    fontSize: "40px",
    color: pinky,
    top: "5px",
  },
  hint:{
    fontSize: "40px",
    bottom: "25px",
  },
  root:{
    width: "100%",
    height: "80px",
  }
};

const searchField =({input})=>{
  return(
    <TextField
      {...input}
      hintText="Enter GitHub username"
      underlineStyle={materialStyles.underline}
      underlineFocusStyle={materialStyles.underline}
      inputStyle={materialStyles.input}
      hintStyle={materialStyles.hint}
      style={materialStyles.root}
    />
  )
}

class SearchBox extends Component{
  constructor(props){
    super(props);
  };

  renderLoadingText=()=>{
    const { isFetch } = this.props;
    if(isFetch){
      return(
        <div style={styles.loadingText}>
          (Loading repositories...)
        </div>
      )
    }
  }

  handleChange=()=>{
    const { onChange } = this.props;
    onChange();
  }

  render(){

    const { handleSubmit, handleEnter } = this.props;
    return(
      <form onSubmit={handleSubmit(handleEnter)}>
        <Field
          name="searchText"
          component={searchField}
          onChange={this.handleChange}
        />
        {this.renderLoadingText()}
      </form>

    )
  }
}

SearchBox = reduxForm({
  form: 'search'
})(SearchBox);

export default SearchBox;
