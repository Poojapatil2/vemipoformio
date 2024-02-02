const advancedComponents = {
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
     url: {
       title: 'URL',
       group: 'custom',
       icon: 'fa-solid fa-link',
       schema: {
         type: 'url',
         key: 'url',
         label: 'URL',
         input: true,
       },
     },
     phoneNumber: {
       title: 'Phone Number',
       group: 'custom',
       icon: 'fa-solid fa-phone',
       schema: {
         type: 'phoneNumber',
         key: 'phoneNumber',
         label: 'Phone Number',
         input: true,
       }
     },
     address: {
        title: 'Address',
        group: 'custom',
        icon: 'fa-solid fa-home',
        schema: {
          type: 'address',
          key: 'address',
          label: 'Address',
          input: true,
        },
      },
      day: {
        title: 'Day',
        group: 'custom',
        icon: 'fa-solid fa-calendar',
        schema: {
          type: 'day',
          key: 'day',
          label: 'Day',
          input: true,
        },
      },
      currency: {
        title: 'Currency',
        group: 'custom',
        icon: 'fa-solid fa-dollar',
        schema: {
          type: 'currency',
          key: 'currency',
          label: 'Currency',
          input: true,
        },
      },
      signature: {
        title: 'Signature',
        group: 'custom',
        icon: 'fa-solid fa-pencil',
        schema: {
          type: 'signature',
          key: 'signature',
          label: 'Signature',
          input: true,
        },
      },
  
   };
 
   export default advancedComponents;