import React from 'react'

import FormFields from './FormFields'
import { updateForm, formatString } from '../actions/form'

export default class FormWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {...this.props.form}
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      form: {...nextProps.form}
    });
  }

  onFieldChange = (value, fieldIndex, blockIndex) => {
    const { dispatch, index } = this.props
    const {form} = this.state
    let fields = _.cloneDeep(form.fields)

    if (form.id === 'form1') {
      let field = fields[fieldIndex]
      let updatedField = {...field, value: value}

      fields.splice(fieldIndex, 1, updatedField)
    } else {
      // All Repeated fileds block
      let block = fields[blockIndex]

      let field = block[fieldIndex]
      let updatedField = {...field, value: value}

      block.splice(fieldIndex, 1, updatedField)

      if (form.id === 'form2') {
        fields[blockIndex] = block
      } else { // form 3 & 4
        fields.splice(blockIndex, 1, block)
      }
    }

    this.setState({
      form: {...form, fields: fields}
    });
  }

  onFormEdit = () => {
    const { form, dispatch } = this.props
    dispatch(updateForm(true, form.id, 'editMode'))
  }

  addMoreDetails = () => {
    const {form} = this.state
    let fields = _.cloneDeep(form.fields)
    let repeatFields = form.id === 'form3' ? form.educationFields : form.experienceFields
    fields = [...fields, repeatFields]

    this.setState({
      form: {...form, fields: fields}
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { index, dispatch, form } = this.props

    dispatch(updateForm(false, form.id, 'editMode'))
    let {fields} = this.state.form
    dispatch(updateForm(fields, form.id, 'fields'))
  }

  render () {
    let { index, editMode } = this.props
    let { form } = this.state

    if (editMode === undefined) {
      editMode = form.editMode
    }
    
    let formFieldsHtml
    if (form.id === 'form1') {
      formFieldsHtml = (
        <FormFields fields={form.fields} editMode={editMode}
          onFieldChange={this.onFieldChange}
        />
      )
    } else {
      let fieldsHtml = []
      _.forEach(form.fields, (blockFields, blockKey) => {
        fieldsHtml.push(
          <div key={`block-${blockKey}`}>
            {
              (form.id === 'form2') ?
                <h5 className="margin0 bmargin15 capitalize" style={{paddingLeft: '15px'}}>
                  {formatString(blockKey)}
                </h5>
              : ''
            }
            <FormFields fields={blockFields} editMode={editMode}
              onFieldChange={(value, fieldIndex) => this.onFieldChange(value, fieldIndex, blockKey)}
            />
          </div>
        )
      })

      let blockInnerHtml
      if (form.id === 'form2') {
        blockInnerHtml = fieldsHtml
      } else { // form-3 & form-4
        let disabledClass = editMode ? '' : 'pointer-events-none'

        blockInnerHtml = (
          <div className="row margin0">
            {fieldsHtml}
            <div className="col-xs-4"></div>
            <div className="col-xs-8">
              <div className={"btn btn-default btn-sm " + disabledClass} onClick={this.addMoreDetails}>
                Add More Details
              </div>
            </div>
          </div>
        )
      }
      formFieldsHtml = <div className="row margin0 block-wrapper">{blockInnerHtml}</div>
    }

    let submitbtn = (editMode == true) ?
      <input type="submit" className="btn btn-primary btn-sm" value="Save" /> :
      <div className="btn btn-primary btn-sm pull-left" value="Edit" onClick={this.onFormEdit}>Edit </div>

    return (
      <div className="row form-wrapper">
        <form onSubmit={this.onSubmit} ref='form'>
          <div className="row margin0 bmargin15">
            <h4>{form.title}</h4>
            <hr />
          </div>
          {formFieldsHtml}
          <div className="row margin0" style={{paddingLeft: '15px'}}>
            {submitbtn}
          </div>
        </form>
      </div>
    );
  }
}
