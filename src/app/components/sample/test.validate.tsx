// import { TextField } from '@mui/material';
// import React from 'react'
// import { Controller, useForm } from 'react-hook-form';
// import { joiResolver } from "@hookform/resolvers/joi"
// import joi from 'joi'

// interface ITest {
//     quantity: number;
// }

// interface TestValidateProps {

// }

// const schema = joi.object<ITest>({
//     quantity: joi.number().min(1).max(100).required(),
// })

// const TestValidate: React.FC<TestValidateProps> = () => {
//     const formMethods = useForm<ITest>({
//         defaultValues: {
//             quantity: 0,
//         },
//         resolver: joiResolver(schema),
//     })

//     console.log(formMethods.formState.errors)


//     const onSubmit = (data: ITest) => {
//         console.log(data)
//     }

//     return (<div>
//         <form
//             onSubmit={formMethods.handleSubmit(onSubmit)}
//         >

//             <Controller
//                 name={`quantity`}
//                 control={formMethods.control}
//                 render={({ field }) => (
//                     <TextField

//                         label="quantity" type='number' fullWidth {...field} />
//                 )}
//             />
//             <div>
//                 <div>
//                     {formMethods.formState.errors["quantity"]?.message}
//                 </div>
//             </div>
//             <button>
//                 submit
//             </button>
//         </form>

//     </div>);
// }

// export default TestValidate;