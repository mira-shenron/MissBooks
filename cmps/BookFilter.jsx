const { useState, useEffect } = React;

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field } = target;

    switch (target.type) {
      case "range":
      case "number":
        //prevent becoming 0 when empty
        if (value !== "") {
          value = +target.value;
        }
        break;
      case "checkbox":
        value = target.checked;
        break;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { title, maxPrice } = filterByToEdit;
  return (
    <section className="book-filter">
      <h2>Filter Books</h2>
      <form onSubmit={onSubmitFilter} className="book-filter-form">
        <section>
          <label htmlFor="title">Title </label>
          <input
            onChange={handleChange}
            type="text"
            value={title}
            name="title"
            id="title"
          />
        </section>

        <section>
          <label htmlFor="maxPrice">Max Price </label>
          <input
            onChange={handleChange}
            type="number"
            value={maxPrice}
            name="maxPrice"
            id="maxPrice"
          />
        </section>

        <button>Submit</button>
      </form>
    </section>
  );
}
