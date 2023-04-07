import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    filter: languageFiltersData[0].id,
    data: '',
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  filtering = id => {
    console.log(id)
    this.setState({filter: id}, this.getDetails)
  }

  getDetails = async () => {
   
    const {filter} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${filter}`

    const response = await fetch(url)
    this.setState({status: apiStatus.inProgress})
    const data = await response.json()
    console.log(response, data)
    if (response.ok === true) {
      const metaData = {
        popularRepos: data.popular_repos,
      }
      const {popularRepos} = metaData
      const newData = popularRepos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({data: newData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {data, filter} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1>Popular</h1>
          <ul className="list-item item1">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                filtering={this.filtering}
                each={each}
                valid={each.id === filter}
                key={each.id}
              />
            ))}
          </ul>
          <ul className="list-item item2">
            {data.map(each => (
              <RepositoryItem key={each.id} each={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderFailureView = () => {
    const {filter} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1>Popular</h1>
          <ul className="list-item item1">
            {languageFiltersData.map(each => (
              <LanguageFilterItem
                filtering={this.filtering}
                each={each}
                valid={each.id === filter}
                key={each.id}
              />
            ))}
          </ul>
          <img
            className="imageFailure"
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
          <h1 className="h1">Something Went Wrong</h1>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="bg-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()

      case apiStatus.failure:
        return this.renderFailureView()

      default:
        return this.renderLoadingView()
    }
  }
}

export default GithubPopularRepos
