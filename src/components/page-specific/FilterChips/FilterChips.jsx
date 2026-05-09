import './FilterChips.css'

function FilterChips({ options, active, onChange }) {
  return (
    <div className="filter-chips">
      {options.map((option) => (
        <button
          key={option}
          className={`filter-chips__chip${active === option ? ' filter-chips__chip--active' : ''}`}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default FilterChips
