import _ from 'lodash'

import { UPDATE_FORMS } from '../constants'

const addressFields = [{
  id: 'street1',
  name: 'Street 1',
  type: 'text'
}, {
  id: 'street2',
  name: 'Street 2',
  type: 'text'
}, {
  id: 'city',
  name: 'City',
  type: 'text'
}, {
  id: 'state',
  name: 'State',
  type: 'text'
}, {
  id: 'zip',
  name: 'Zip',
  type: 'number'
}]

const educationFields = [{
  id: 'exam_type',
  name: 'Type of Exam',
  type: 'select',
  options: [{
    id: 'a',
    name: 'A'
  }, {
    id: 'b',
    name: 'B'
  }, {
    id: 'c',
    name: 'C'
  }]
}, {
  id: 'board',
  name: 'Board',
  type: 'text'
}, {
  id: 'percent',
  name: 'Percent',
  type: 'number',
  max: 100
}]

const experienceFields = [{
  id: 'company',
  name: 'Company Name',
  type: 'text'
}, {
  id: 'number_of_years',
  name: 'No. of Years',
  type: 'number'
}]

const initialState = {
  forms: {
    form1 :{
      id: 'form1',
      pageTitle: 'Personal Info',
      title: 'Personal Information',
      editMode: false,
      fields: [{
        id: 'first_name',
        name: 'First Name',
        type: 'text'
      }, {
        id: 'last_name',
        name: 'Last Name',
        type: 'text'
      }, {
        id: 'father_name',
        name: 'Father\'s Name',
        type: 'text'
      }, {
        id: 'mother_name',
        name: 'Mother\'s Name',
        type: 'text'
      }, {
        id: 'dob',
        name: 'Date Of Birth',
        type: 'date'
      }]
    },
    form2: {
      id: 'form2',
      pageTitle: 'Address',
      title: 'Address',
      editMode: false,
      fields: {
        present_address: _.cloneDeep(addressFields),
        permanent_address: _.cloneDeep(addressFields)
      }
    },
    form3: {
      id: 'form3',
      pageTitle: 'Education',
      title: 'Education Details',
      editMode: false,
      fields: [
        educationFields
      ],
      educationFields: educationFields
    },
    form4: {
      id: 'form4',
      pageTitle: 'Experience',
      title: 'Experience',
      editMode: false,
      fields: [
        experienceFields
      ],
      experienceFields: experienceFields
    }
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_FORMS':
      return {
        ...state,
        forms: action.data,
      }
    default:
      return state;
  }
}
