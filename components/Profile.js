import React from 'react'
import { connect } from 'react-redux'

import FormWidget from './FormWidget'

@connect((store) => {
  return {
    forms: store.formReducer.forms
  }
})
export default class Profile extends React.Component {

  render () {
    const { dispatch, forms } = this.props

    let mappedForms = _.map(forms, (form, index) => {
      return (
        <FormWidget
          dispatch={dispatch}
          key={index}
          index={index}
          form={form}
        />
      )
    })

    return (
      <div className="row margin0">
        {mappedForms}
      </div>
    );
  }
}
