const responsiblePartyInfo = {
    relationship: {
        title: 'Relationship to Patient',
        group: 'custom',
        icon: 'fa-solid fa-users',
        schema: {
          type: 'select',
          key: 'relationshipToPatient',
          label: 'Relationship to Patient',
          input: true,
          data: {
            values: [
                {
                    label: 'Self',
                    value: 'self'
                },
                {
                    label: 'Spouse', 
                    value: 'spouse'
                },
                {
                    label: 'Gaurdian',
                    value: 'gaurdian'
                }
              ]
          }      
        },
    },
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
      homePhoneNumber: {
        title: 'Home Number',
        group: 'custom',
        icon: 'fa-solid fa-phone',
        schema: {
          type: 'number',
          key: 'homeNumber',
          label: 'Home Number',
          input: true,
        },
      },
      cellPhoneNumber: {
        title: 'Cell Phone Number',
        group: 'custom',
        icon: 'fa-solid fa-mobile',
        schema: {
          type: 'number',
          key: 'cellPhoneNumber',
          label: 'Cell Phone Number',
          input: true,
        },
      },
      workPhoneNumber: {
        title: 'Work Phone Number',
        group: 'custom',
        icon: 'fa-solid fa-phone',
        schema: {
          type: 'number',
          key: 'workPhoneNumber',
          label: 'Work Phone Number',
          input: true,
        },
      },
      workExtensionNumber: {
        title: 'Work Extension Number',
        group: 'custom',
        icon: 'fa-solid fa-phone',
        schema: {
          type: 'number',
          key: 'workExtensionNumber',
          label: 'Work Extension Number',
          input: true,
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

export default responsiblePartyInfo