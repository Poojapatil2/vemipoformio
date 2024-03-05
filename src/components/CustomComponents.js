
const customComponents = {
   premium: false,
    firstName: {
      title: 'First Name',
      group: 'custom',
      icon: 'fa-solid fa-user',
      schema: {
        type: 'textfield',
        key: 'officeEmail',
        label: 'First Name ',
        input: true,
        defaultValue: "Test"
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
    customUpload: {
      title: 'File Upload',
      group: 'custom',
      icon: 'fa fa-file',
      schema: {
        type: 'file',
        key: 'customUpload',
        label: 'File Upload',
        input: true,
      },
    },
  };

  console.log("test")

  export default customComponents;