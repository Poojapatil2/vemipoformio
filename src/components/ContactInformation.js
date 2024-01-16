
const contactInfo = {
    email: {
        title: 'Email',
        group: 'custom',
        icon: 'fa-solid fa-at',
        schema: {
            type: 'email',
            key: 'email',
            label: 'Email',
            input: true,
        },
    },
    homePhoneNumber: {
        title: 'Home Phone Number',
        group: 'custom',
        icon: 'fa-solid fa-phone',
        schema: {
          type: 'number',
          key: 'homePhoneNumber',
          label: 'Home Phone Number',
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
      
};

export default contactInfo;