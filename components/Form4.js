import React from 'react'
import { connect } from 'react-redux'

import FormWidget from './FormWidget'

@connect((store) => {
  return {
    form: store.formReducer.forms.form4
  }
})

export default class form extends React.Component {
  render() {
    const { dispatch, form } = this.props
    return (
      <FormWidget form={form} editMode={form.editMode} dispatch={dispatch} />
    )
  }
}
