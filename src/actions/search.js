import { START_FETCH_GITHUB, FETCH_GITHUB_SUCCESS, LOAD_REPOSITORIES, REMOVE_FETCHED_DATA } from './types.js';
import axios from 'axios';

const baseURL = "https://api.github.com/users";

function fetchGithubSuccess(data){
  return{
    type: FETCH_GITHUB_SUCCESS,
    payload: data
  }
}

function loadRepositoriesAction(data){
  return{
    type: LOAD_REPOSITORIES,
    payload: data
  }
}

function checkChangeAction(){
  return{
    type: REMOVE_FETCHED_DATA
  }
}

export function checkChange(){
  return (dispatch, getState)=>{
    const { isSearched } = getState().search;
    if(isSearched){
      return dispatch(checkChangeAction());
    }
  }
}

export function loadRepositories(value){
  return(dispatch, getState)=>{
    const { data } = getState().search;
    const languageData = data.filter((element)=> element.expand == false);
    let realIndex = null;
    languageData.forEach(
      (element, index)=> {
        if(value === element.name){
          realIndex = index;
          return;
        }
      }
    )
    const firstData = languageData.slice(0, realIndex+1).concat(
      languageData[realIndex].repositories
    );
    const secondData = languageData.slice(realIndex+1);
    const finalData = firstData.concat(secondData);
    dispatch(loadRepositoriesAction(finalData));
  }
}

export function fetchGithub({ searchText }){
  return (dispatch, getState)=>{
    const getAPI = baseURL + `/${searchText}/repos`;
    dispatch({type: START_FETCH_GITHUB});
    axios.get(getAPI, {
        params: {
          per_page: 100
        }
      })
      .then((res)=>{
        const { data } = res;

        const dataNestedRepo = data.map((element, index)=>{
          return {
            language: element.language,
            repositories: {
              repoName: element.name ,
              star: element.stargazers_count,
            }
          }
        }).reduce((dataObj, element, index)=>{
          if( element.language in dataObj){
            dataObj[element.language].push({
              repoName: element.repositories.repoName,
              star: element.repositories.star,
              expand: true,
              name: element.language,
              count: 0
            })
          }else{
            dataObj[element.language] = [{
              repoName: element.repositories.repoName,
              star: element.repositories.star,
              expand: true,
              name: element.language,
              count: 0
            }]
          }
          return dataObj;
        }, {})

        //sorted dataNestedRepo by star
        Object.keys(dataNestedRepo).forEach(
          (element, index) => {
            dataNestedRepo[element].sort(
              (first, second) => second.star - first.star
            )
          }
        )

        const countedLanguages = data.map((element, index)=>{
          return element.language
        }).reduce((dataObj, element)=>{
          (element in dataObj) ? dataObj[element]++ : dataObj[element] = 1;
          return dataObj
        }, {})

        const sortedLanguages = Object.keys(countedLanguages).sort(
          (first, second) => countedLanguages[second] - countedLanguages[first]
        ).reduce(
          (sortedObject, currentValue) => ({
            ...sortedObject,
            [currentValue]: countedLanguages[currentValue]
          })
        , {})

        const finalData = Object.keys(sortedLanguages).map(
          (element, index) => {
            const name = element != "null" ? element : 'Unknown'
            return {
              name: name,
              count: sortedLanguages[element],
              repositories: dataNestedRepo[element],
              expand: false
            }
          }
        )

        // console.log(finalData);

        dispatch(fetchGithubSuccess(finalData));
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
