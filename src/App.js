import React, { Component } from 'react';
import ProductList from './components/ProductList.jsx'
import './App.css';
import ContainerOverview from './components/ContainerOverview.jsx';
import ProductListTab from "./components/ProductListTab.jsx";
import * as utils from './utils.js'
import StoredBales from './components/StoredBales.jsx';
import { ThemeProvider } from '@material-ui/styles'
import storedStacks from './stacks.json'
import * as api from "./api.js"
import ResponseModal from './components/ResponseModal.jsx';
// import testData from './testData.json'

const theme = {
  background: '1D8549'
}

class App extends Component {
  state = {
    date: '',
    containerNumber: '',
    sealNumber: '',
    // TODO: change "container" to "content"
    container: [],
    view: 1,
    storedStacks,
    response: null
  }

  componentDidMount () {
    if (!localStorage.getItem(utils.getDate())) {
      const date = utils.getDate()
      this.setState({
        date
      })
    } else {
      const currentContainer = JSON.parse(localStorage.getItem(utils.getDate())) 
      this.setState(currentContainer)
    }
  }

  checkForLoadingSession = () => {
    
  }


  downloadStacks = () => {
    //download saved stacks an put into state
  }

  handleViews = (event) => {
    const { value } = event.target
    this.changeView(Number(value))
  }

  changeView = (view) => {
    this.setState({
      view
    })
  }

  displayView = (viewIndex, container) => {
    let view;
    switch (viewIndex) {
      case 0:
        view = <StoredBales stacks={this.state.storedStacks} add={this.addToContainer}/>
        break;
      case 1:
        view = <ProductList 
        add={this.addToContainer} 
        container={container} 
        addToDB={this.addToDB}
        />
        break;
      case 2:
        view = <ContainerOverview 
        containerDetails={this.state} 
        overview={this.toggleContainerOverview} 
        update={this.updateContainerAndSeal}/>
        break;
      default:
        view = <h1>500 - Something's gone horribly wrong</h1>
    }
    return view
  }

  render() {
    const { container, view, response } = this.state
      return (    
        <div id="App">         
          {!!response && <ResponseModal response={response} close={this.closeModal} />}
          <ProductListTab changeView={this.changeView} />
          {this.displayView(view, container)} 
        </div>
      );
    
  }
  addToContainer = (stack) => {
    const { container } = this.state
    const modifiedContainer = [...container]
    modifiedContainer.push(stack)
    this.setState({
      container: modifiedContainer
    }, () => {
      this.saveProgress()
    })
  }

  addToDB = async (item) => {
    console.log('runn')
    const response = await api.saveStackToDB(item)
    
    console.log(response)
    this.setState({
      response: response.data
    })
  }

  toggleContainerOverview = () => {
    const { containerOverview } = this.state
    this.setState({
      containerOverview: !containerOverview
    })
  }

  saveProgress = () => {
    const { date } = this.state
    localStorage.setItem(date, JSON.stringify(this.state))
  }

  closeModal = () => {
    this.setState({
      response: null
    })
  }


  updateContainerAndSeal = ({containerNumber, sealNumber}) => {
    console.log('APP__UPDATE CONTAINER')
    this.setState({
      containerNumber,
      sealNumber
    })
  }

}

export default App;
