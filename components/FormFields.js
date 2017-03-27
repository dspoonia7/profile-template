import React from 'react'
import _ from 'lodash'

import FormField from './FormField'

export default class FormFields extends React.Component {
  render () {
    const { fields, editMode } = this.props

    let mappedFormFields = _.map(fields, (field, index) => {
      return (
        <FormField
          key={index}
          index={index}
          field={field}
          onFieldChange={this.props.onFieldChange}
          editMode={editMode}
        />
      )
    })

    return (
      <div className="fields-wrapper">
        {mappedFormFields}
      </div>
    )
  }
}
