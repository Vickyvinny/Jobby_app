import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {employFilter, salaryFilter} = props
  const onEmployValue = event => {
    employFilter(event.target.value)
  }
  const onSalaryRange = event => {
    salaryFilter(event.target.value)
  }
  return (
    <div>
      <hr className="hr-line" />
      <h1 className="filter-heading">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(eachList => (
          <li key={eachList.employmentTypeId} className="list-items">
            <input
              type="checkbox"
              value={eachList.employmentTypeId}
              id={eachList.label}
              onChange={onEmployValue}
            />
            <label htmlFor={eachList.label} className="label-heading">
              {eachList.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul>
        {salaryRangesList.map(eachList => (
          <li key={eachList.salaryRangeId} className="list-items">
            <input
              type="radio"
              id={eachList.label}
              name="salary"
              value={eachList.salaryRangeId}
              onChange={onSalaryRange}
            />
            <label htmlFor={eachList.label} className="label-heading">
              {eachList.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FiltersGroup
