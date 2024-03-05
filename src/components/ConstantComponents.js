import { useState, useEffect } from "react";
import axios from "axios";

const ConstantComponents = () => {
    const [customComponents, setCustomComponents] = useState([]);

    useEffect(() => {
        axios.get(`http://3.23.40.210:8081/form/constants`)
          .then((response) => {
            // Transform the API response into the desired format and update customComponents state
            const updatedCustomComponents = {};
            // response.data.forEach(item => {
            //   updatedCustomComponents[item.fieldKey] = {
            //     title: item.title,
            //     group: 'custom',
            //     icon: 'fa-solid fa-user', // Assuming icon is constant
            //     schema: {
            //       type: item.dataType,
            //       key: item.fieldKey,
            //       label: item.title,
            //       input: true,
            //       defaultValue: item.defaultValue
            //     }
            //   };
            // });
            console.log(response.data, "constant")
            setCustomComponents(response.data);
            return response.data
          })
          .catch((error) => {
            console.error("Error fetching custom components:", error);
          });
      }, []);

      return customComponents;
    
}

export default ConstantComponents