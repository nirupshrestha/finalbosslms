// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { useState } from "react";
// import { getPasswordValidationStates } from "@/utils/passwordValidator";

// function FormControls({ formControls = [], formData, setFormData }) {
//   function renderComponentByType(getControlItem) {
//     let element = null;
//     const currentControlItemValue = formData[getControlItem.name] || "";

//     switch (getControlItem.componentType) {
//       case "input":
//         element = (
//           <Input
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             type={getControlItem.type}
//             value={currentControlItemValue}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//       case "select":
//         element = (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={currentControlItemValue}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options && getControlItem.options.length > 0
//                 ? getControlItem.options.map((optionItem) => (
//                     <SelectItem key={optionItem.id} value={optionItem.id}>
//                       {optionItem.label}
//                     </SelectItem>
//                   ))
//                 : null}
//             </SelectContent>
//           </Select>
//         );
//         break;
//       case "textarea":
//         element = (
//           <Textarea
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             value={currentControlItemValue}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;

//       default:
//         element = (
//           <Input
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             type={getControlItem.type}
//             value={currentControlItemValue}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//     }

//     return element;
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       {formControls.map((controleItem) => (
//         <div key={controleItem.name}>
//           <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
//           {renderComponentByType(controleItem)}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FormControls;


// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { useState } from "react";
// import { getPasswordValidationStates } from "@/utils/passwordValidator";

// function FormControls({ formControls = [], formData, setFormData, showPasswordCheck = false }) {
//   // const [passwordValidation, setPasswordValidation] = useState({});

//   function renderPasswordValidation(password) {
//     const validation = getPasswordValidationStates(password || "");
//     return (
//       <div className="mt-2 space-y-1 text-sm">
//         <p className={validation.length ? "text-green-600" : "text-red-600"}>
//           {validation.length ? "✔" : "✖"} At least 8 characters
//         </p>
//         <p className={validation.uppercase ? "text-green-600" : "text-red-600"}>
//           {validation.uppercase ? "✔" : "✖"} At least one uppercase letter
//         </p>
//         <p className={validation.lowercase ? "text-green-600" : "text-red-600"}>
//           {validation.lowercase ? "✔" : "✖"} At least one lowercase letter
//         </p>
//         <p className={validation.number ? "text-green-600" : "text-red-600"}>
//           {validation.number ? "✔" : "✖"} At least one number
//         </p>
//         <p className={validation.specialChar ? "text-green-600" : "text-red-600"}>
//           {validation.specialChar ? "✔" : "✖"} At least one special character
//         </p>
//       </div>
//     );
//   }



//   function renderComponentByType(getControlItem) {
//     let element = null;
//     const currentValue = formData[getControlItem.name] || "";

//     const handleChange = (event) => {
//       const value = event.target.value;
//       setFormData({
//         ...formData,
//         [getControlItem.name]: value,
//       });

//       // If password field, update validation
//       {
//         getControlItem.name === "password" &&
//         currentValue.length > 0 &&
//         renderPasswordValidation(currentValue)
//       }

//     };

//     switch (getControlItem.componentType) {
//       case "input":
//         element = (
//           <>
//             <Input
//               id={getControlItem.name}
//               name={getControlItem.name}
//               placeholder={getControlItem.placeholder}
//               type={getControlItem.type}
//               value={currentValue}
//               onChange={handleChange}
//             />
//             {showPasswordCheck &&
//               getControlItem.name === "password" &&
//               currentValue.length > 0 &&
//               renderPasswordValidation()}
//           </>
//         );
//         break;
//       case "select":
//         element = (
//           <Select
//             onValueChange={(value) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: value,
//               })
//             }
//             value={currentValue}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder={getControlItem.label} />
//             </SelectTrigger>
//             <SelectContent>
//               {getControlItem.options?.map((optionItem) => (
//                 <SelectItem key={optionItem.id} value={optionItem.id}>
//                   {optionItem.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );
//         break;
//       case "textarea":
//         element = (
//           <Textarea
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             value={currentValue}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 [getControlItem.name]: event.target.value,
//               })
//             }
//           />
//         );
//         break;
//       default:
//         element = (
//           <Input
//             id={getControlItem.name}
//             name={getControlItem.name}
//             placeholder={getControlItem.placeholder}
//             type={getControlItem.type}
//             value={currentValue}
//             onChange={handleChange}
//           />
//         );
//         break;
//     }

//     return element;
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       {formControls.map((controlItem) => (
//         <div key={controlItem.name}>
//           <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
//           {renderComponentByType(controlItem)}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FormControls;
// naya

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useState, useEffect } from "react";
import { getPasswordValidationStates } from "@/utils/passwordValidator";

function FormControls({ formControls = [], formData, setFormData, showPasswordCheck = false }) {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // Handle password change and update validation states
  const handleChange = (event, controlItemName) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [controlItemName]: value,
    });

    // Update password validation if password is being typed
    if (controlItemName === "password") {
      const validation = getPasswordValidationStates(value);
      setPasswordValidation(validation); // Update password validation
    }
  };

  function renderPasswordValidation() {
    return (
      <div className="mt-2 space-y-1 text-sm">
        <p className={passwordValidation.length ? "text-green-600" : "text-red-600"}>
          {passwordValidation.length ? "✔" : "✘"} At least 8 characters
        </p>
        <p className={passwordValidation.uppercase ? "text-green-600" : "text-red-600"}>
          {passwordValidation.uppercase ? "✔" : "✘"} At least one uppercase letter
        </p>
        {/* <p className={passwordValidation.lowercase ? "text-green-600" : "text-red-600"}>
          {passwordValidation.lowercase ? "✔" : "✘"} At least one lowercase letter
        </p> */}
        <p className={passwordValidation.number ? "text-green-600" : "text-red-600"}>
          {passwordValidation.number ? "✔" : "✘"} At least one number
        </p>
        <p className={passwordValidation.specialChar ? "text-green-600" : "text-red-600"}>
          {passwordValidation.specialChar ? "✔" : "✘"} At least one special character
        </p>
      </div>
    );
  }

  function renderComponentByType(getControlItem) {
    const currentValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        return (
          <>
            <Input
              id={getControlItem.name}
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              type={getControlItem.type}
              value={currentValue}
              onChange={(e) => handleChange(e, getControlItem.name)}
            />
            {showPasswordCheck && getControlItem.name === "password" && currentValue.length > 0 && renderPasswordValidation()}
          </>
        );
      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={currentValue}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentValue}
            onChange={(e) => handleChange(e, getControlItem.name)}
          />
        );
      default:
        return (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentValue}
            onChange={(e) => handleChange(e, getControlItem.name)}
          />
        );
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {formControls.map((controlItem) => (
        <div key={controlItem.name}>
          <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
