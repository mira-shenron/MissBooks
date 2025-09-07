import { debounce } from "../services/util.service.js";

const { useState, useEffect, useRef } = React;

export function SearchCmp({ onSetFilter, filterBy }) {
  const [searchTxt, setSearchTxt] = useState(filterBy);
  
  const onSetFilterDebounce = useRef(debounce(onSetFilter, 300)).current;

  useEffect(() => {
    onSetFilterDebounce(searchTxt);
  }, [searchTxt]);

  function handleChange({ target }) {
    setSearchTxt(target.value);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    onSetFilter(searchTxt);
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
