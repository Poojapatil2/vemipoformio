
const patientInfo = {
    firstName: {
        title: 'First Name',
        group: 'custom',
        icon: 'fa-solid fa-user',
        schema: {
            type: 'textfield',
            key: 'firstName',
            label: 'First Name ',
            input: true,
        },
    },
    middleName: {
        title: 'Middle Name',
        group: 'custom',
        icon: 'fa-solid fa-user',
        schema: {
            type: 'textfield',
            key: 'middleName',
            label: 'Middle Name ',
            input: true,
        },
    },
    lastName: {
        title: 'Last Name',
        group: 'custom',
        icon: 'fa-solid fa-user',
        schema: {
            type: 'textfield',
            key: 'lastName',
            label: 'Last Name ',
            input: true,
        }
    },
    dateOfBirth: {
        title: 'Date of Birth',
        group: 'custom',
        icon: 'fa-solid fa-birthday-cake',
        required: true,
        schema: {
            type: 'day',
            key: 'dob',
            label: 'Date of Birth',
            input: true
        }
    },
    address: {
        title: 'Address',
        group: 'custom',
        icon: 'fa-solid fa-map-marker',
        schema: {
            type: 'textarea',
            key: 'address',
            label: 'Address',
            input: true,
        }
    },
    city: {
        title: 'City',
        group: 'custom',
        icon: 'fa-solid fa-building',
        schema: {
            type: 'textfield',
            key: 'city',
            label: 'City',
            input: true,
        },
    },
    state: {
        title: 'State',
        group: 'custom',
        icon: 'fa-solid fa-flag',
        schema: {
          type: 'textfield',
          key: 'state',
          label: 'State',
          input: true,
        },
    },
    zipcode: {
        title: 'ZIP Code',
        group: 'custom',
        icon: 'fa-solid fa-envelope',
        schema: {
          type: 'number',
          key: 'zipcode',
          label: 'ZIP Code',
          input: true,
        },
      },
    gender: {
        title: 'Gender',
        group: 'custom',
        icon: 'fa-solid fa-venus-mars',
        schema: {
            type: 'radio',
            key: 'gender',
            label: 'Gender',
            input: true,
            values: [
                {
                    label: "Male",
                    value: "male"
                  },
                  {
                    label: "Female",
                    value: "female"
                  }
            ]
        }
    },
    maritalStatus: {
        title: 'Marital Status',
        group: 'custom',
        icon: 'fa-solid fa-heart',
        schema: {
          type: 'select',
          key: 'maritalStatus',
          label: 'Marital Status',
          input: true,
          data: {
            values: [
                {
                    label: 'Single',
                    value: 'single'
                },
                {
                    label: 'Married', 
                    value: 'married'
                },
                {
                    label: 'Widowed',
                    value: 'widowed'
                },
                {
                    label: 'Divorced',
                    value: 'divorced'
                },
                {
                    label: 'Separated',
                    value: 'separated'
                }
              ]
          }
          
        },
    },
    ssn: {
        title: 'Social Security Number',
        group: 'custom',
        icon: 'fa-solid fa-id-card',
        schema: {
            type: 'textfield',
            key: 'ssn',
            label: 'Social Security Number',
            input: true,
        },
    },
    drivinglicense: {
        title: 'Driving License Number',
        group: 'custom',
        icon: 'fa-regular fa-id-card',
        schema: {
            type: 'textfield',
            key: 'drivinglicense',
            label: 'Driving License Number',
            input: true,
        },
    },
    
};

export default patientInfo;