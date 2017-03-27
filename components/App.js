import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import _ from 'lodash'

@connect((store) => {
  return {
    forms: store.formReducer.forms
  }
})

export default class App extends React.Component {

  render() {
    const { children, forms } = this.props

    let mappedPages = _.map(forms, (form, key) => {
      let path = key === 'form1' ? '/' : `/${key}`

      return (
        <div key={key} className="nav-link">
          <Link to={path} activeClassName="active-page" onlyActiveOnIndex>{form.pageTitle}</Link>
        </div>
      )
    })

    return (
      <div className="app-wrapper">
        <header>
          {mappedPages}
          <div className="nav-link">
            <Link to="/profile" activeClassName="active-page">Profile</Link>
          </div>
        </header>
        <br />
        <div>{children}</div>
      </div>
    )
  }
}
