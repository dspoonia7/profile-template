import React from 'react'

export default class FormField extends React.Component {

  onFieldChange = (e) => {
    const { index } = this.props
    let value = e.target.value
    this.props.onFieldChange(value, index)
  }

  render () {
    const { index, field, editMode } = this.props
    const { type, value } = field

    let fieldHtml
    if (type === 'textarea') {
      fieldHtml = (
        <textarea rows="2" cols="40"
          value={value}
          onChange={(e) => this.onFieldChange(e)}
          disabled={!editMode}
        />
      )
    } else if (type === 'number') {
      fieldHtml = (
        <input type={type} value={value} min="0" max={field.max}
          onChange={(e) => this.onFieldChange(e)}
          disabled={!editMode} className="form-control input-sm"
        />
      )
    } else if (type === 'select') {
      let mappedOptions = _.map(field.options, (option) => {
        return <option key={option.id} value={option.id}>{option.name}</option>
      })

      fieldHtml = (
        <select value={value} onChange={(e) => this.onFieldChange(e)}
          disabled={!editMode} className="form-control input-sm">
          {mappedOptions}
        </select>
      )
    } else {
      fieldHtml = (
        <input type={type} value={value}
          onChange={(e) => this.onFieldChange(e)}
          disabled={!editMode} className="form-control input-sm"
        />
      )
    }

    return (
      <div className="row margin0 bmargin15">
        <div className="col-xs-4">{field.name}: </div>
        <div className="col-xs-8">
          {fieldHtml}
        </div>
      </div>
    );
  }
}
