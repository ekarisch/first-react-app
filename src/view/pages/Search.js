
import {Search, Table, Button} from './view/components/Table'

const __DEFAULT_QUERY = 'redux';
const __DEFAULT_HPP = '100';

const __PATH_BASE = 'https://hn.algolia.com/api/v1';
const __PATH_SEARCH = '/search';
const __PARAM_SEARCH = 'query=';
const __PARAM_PAGE = 'page=';
const __PARAM_HPP = 'hitsPerPage=';

const __URL = `${__PATH_BASE}${__PATH_SEARCH}?${__PARAM_SEARCH}${__DEFAULT_QUERY}`;


const isSearched = searchTerm => item =>
(item.title + ' ' + item.author).toLowerCase().includes(searchTerm.toLowerCase()) // concatenating strings of fields you want to search for, includes will find subsbtr exists (true/false)



  /**
  constructor(props) {
    super(props) //this allows props to be used within constructor method
  }
  **/

  state = {

    result:null,
    searchTerm: __DEFAULT_QUERY

  }

  setSearchTopStories = result => {

    const { hits, page } = result

    const oldHits = page !== 0 ? this.state.result.hits
    : []

    const updatedHits = [
      ...oldHits,
      ...hits
    ]

    this.setState({ result: { hits: updatedHits, page } })

  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${__PATH_BASE}${__PATH_SEARCH}?${__PARAM_SEARCH}${searchTerm}&${__PARAM_PAGE}${page}&${__PARAM_HPP}${__DEFAULT_HPP}`)
    .then(response => response.json())
     .then(result => this.setSearchTopStories(result))
     .catch(error => error)
  }

  handleDismiss = id => {
    const isNotId = item => item.objectID !== id
    const updatedHits = this.state.result.hits.filter(isNotId)
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    })
  }

  handleSearch = e => {

    this.setState({ searchTerm: e.target.value }) //when searchTerm is updated, this.state.list property will be unchanged, and only elements updated by searchTerm will get rerendered by React vDOM

  }

  onSearchSubmit = event => {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  componentDidMount(){

    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)

  }

  render(){

    const { result, searchTerm } = this.state
    const page = (result && result.page) || 0;
    let helloWorld = "Welcome to the Road to React, Codemonkey!"

    return (
    <div className="App">
      <h2>{helloWorld}</h2>
      <div className="page">

        <div className="interactions">
          <Search
            className="mb-2"
            onChange={(e)=>this.handleSearch(e)}
            onSubmit={(e)=>this.onSearchSubmit(e)}
            value={searchTerm}
            placeHolder="Search frameworks..."
            > Search {/* Here's where the children property comes into effect: it's not just text that can be passed as children. You can also pass an element, or element trees that can be encapsulated by components, as children. The children property makes it possible to weave components into each other. */}
          </Search>
        </div>
        {/* When passing up params, you must put them on both sides of the arrow function , i.e. "id" above */}

        <hr className="no-margin"/>

        <div className="interactions">

          { result &&
            <>
              <Table
                list={result.hits}
                pattern={searchTerm}
                onDismiss={(id)=> this.handleDismiss(id)}
              />

              <hr className="no-margin"/>

              <p className="mt-2"><em>{ 'Showing ' + result.hits.filter(isSearched(searchTerm)).length + ' of ' + result.hits.length } </em></p>
            </>
          }

        </div>

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
              More
            </Button>
        </div>

      </div>
    </div>
    )
  }
