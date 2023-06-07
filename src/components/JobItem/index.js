import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'

const JobItem = props => {
  const {eachJob} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = eachJob
  return (
    <Link to={`/jobs/${id}`} className="nav-link-card ">
      <li className="card-container">
        <div className="image-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-image"
          />
          <div className="heading-container">
            <h1 className="card-heading">{title}</h1>
            <div className="star-container">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="items-container">
            <div className="icons-container">
              <MdLocationOn className="icon-style" />
              <p className="name-style">{location}</p>
            </div>
            <div className="icons-container">
              <BsBriefcase className="icon-style" />
              <p className="name-style">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="card-description-heading">Description</h1>
        <p className="card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
