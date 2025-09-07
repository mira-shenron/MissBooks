import { debounce } from "../services/util.service.js";

const { useState, useEffect } = React;

export function SearchCmp({ onSetFilterBy, filterBy }) {
  const [searchTxt, setSearchTxt] = useState(filterBy);
  
  //later add debounce
  //const onSetFilterDebounce = debounce(onSetFilterBy, 300);

  useEffect(() => {
    onSetFilterBy(searchTxt);
  }, [searchTxt]);

  function handleChange({ target }) {
    setSearchTxt(target.value);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    onSetFilterBy(searchTxt);
  }


  return (
    <section className="book-filter">
      <form onSubmit={onSubmit} className="book-filter-form">
        <section>
          <label htmlFor="searchTxt">Find a book to add </label>
          <input
            onChange={handleChange}
            type="text"
            value={searchTxt}
            name="searchTxt"
            id="searchTxt"
          />
        </section>

        {/* <button>Submit</button> */}
      </form>
    </section>
  );
}
