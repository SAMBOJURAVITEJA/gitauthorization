import './index.css'

const RepositoryItem = props => {
  const {each} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = each

  return (
    <li className="list-items1">
      <img className="avatar-image" src={avatarUrl} alt={name} />
      <p className="para">{name}</p>
      <div className="stars-count">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div className="forks-count">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount}</p>
      </div>
      <div className="issues-count">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
