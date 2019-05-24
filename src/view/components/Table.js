
const Search = ({value, onChange, onSubmit, placeHolder, className, children}) =>
      (<form onSubmit={onSubmit}>
        <input
        className={className}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
        />

        <button type="submit">
          {children}
        </button>

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
export default {
  Search,
  Table,
  Button
}
