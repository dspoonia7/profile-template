import _ from 'lodash'

export function updateForm(data, formKey, formFieldName) {
  return (dispatch, getState) => {
    const state = getState().formReducer

    let forms = _.cloneDeep(state.forms)

    let updatedForm = {...forms[formKey], [formFieldName]: data}

    // forms.splice(formIndex, 1, updatedForm)
    forms[formKey] = updatedForm

    dispatch({type: 'UPDATE_FORMS', data: forms})
  }
}

export function formatString(string) {
  if (!_.isEmpty(string)) {
    return string.split('_').join(' ')
  }
  return ''
}
