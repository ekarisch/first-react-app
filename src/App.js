import React, {Component} from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item =>
(item.title + ' ' + item.author).toLowerCase().includes(searchTerm.toLowerCase()) // concatenating strings of fields you want to search for, includes will find subsbtr exists (true/false)


export default class App extends Component {

  /**
  constructor(props) {
    super(props) //this allows props to be used within constructor method

    this.state = {
      list:list,
    }
  }
  **/

  state = {
    list,
    searchTerm: '',
  }

  handleDismiss = id => {
    const isNotId = item => item.objectID !== id
    const updatedList = this.state.list.filter(isNotId)
    this.setState({ list:updatedList })
  }

  handleSearch = e => {

    this.setState({ searchTerm: e.target.value }) //when searchTerm is updated, this.state.list property will be unchanged, and only elements updated by searchTerm will get rerendered by React vDOM

  }

  render(){

    const { list, searchTerm } = this.state
    let helloWorld = "Welcome to the Road to React, Codemonkey!"

    return (
    <div className="App">
      <h2>{helloWorld}</h2>
      <Search
        className="mb-2"
        onChange={(e)=>this.handleSearch(e)}
        value={searchTerm}
        placeHolder="Search frameworks..."
        >
        Search {/* Here's where the children property comes into effect: it's not just text that can be passed as children. You can also pass an element, or element trees that can be encapsulated by components, as children. The children property makes it possible to weave components into each other. */}
        </Search>

          <hr className="no-margin"/>

        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={(id)=> this.handleDismiss(id)}
        />
        {/* When passing up params, you must put them on both sides of the arrow function , i.e. "id" above */}

        <hr className="no-margin"/>

        <p className="mt-2"><em>{ 'Showing ' + list.filter(isSearched(searchTerm)).length + ' of ' + list.length } </em></p>

    </div>
    )
  }
}


const Search = ({value, onChange, placeHolder, className, children}) =>
      (<form>
        {children} <input
        className={className}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
        />
      </form>)



const Table = ({list, pattern, onDismiss }) => {

  const [col1,col2,col3,col4,col5] = ['40%','30%','10%','10%','10%'];

 return (
      <div className="table">

      <div className="row-item table-row">
        <span style={{ width: col1 }}>
          Framework
        </span>
        <span style={{ width: col2 }}>
          Author
        </span>
        <span style={{ width: col3 }}>
          Comments
        </span>
        <span style={{ width: col4 }}>
          Score
        </span>
        <span style={{ width: col5 }}>
        </span>

      </div>

      {

        list.filter(isSearched(pattern)).map( item => (
          <div key={item.objectID} className="row-item table-row">
            <span style={{ width: col1 }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: col2 }}>
              {item.author}
            </span>
            <span style={{ width: col3 }}>
              {item.num_comments}
            </span>
            <span style={{ width: col4 }}>
              {item.points}
            </span>
            <span style={{ width: col5 }}>
              <Button
                onClick={() => onDismiss(item.objectID)}
                className= 'button-inline'
                >
                Dismiss
              </Button>
            </span>
          </div>
        ))
      }
      </div>
    )
  }

const Button = ({ onClick,
                  className = 'btn-default', //set a default value for the className property if not passed in
                  children}) => (
                    <button
                      onClick={onClick}
                      className={'btn ' + className}
                      type="button"
                    > {children}
                    </button>
                  )
