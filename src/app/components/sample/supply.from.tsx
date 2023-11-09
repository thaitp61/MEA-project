'use client'
import ApiContext from '@/app/context/ApiContext';
import { MenuItem, Select, Stack, TextField } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import React, { useEffect, useState } from 'react'
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import { Supply } from '../MaintenanceModal/create.maintenace.modal';
import { IRepairReportItem } from './repair.report.item.form';


export interface ISupplyForm {
    quantity: number,
    supplyId: string
}
export const defaultValues: ISupplyForm = {
    quantity: 1,
    supplyId: ""
}
interface SupplyFormProps {
    formMethods: UseFormReturn<IRepairReportItem, any, undefined>
    index: number;
    equipmentId: string;
}

const SupplyForm: React.FC<SupplyFormProps> = ({ formMethods, index, equipmentId }) => {



    const [supplies, setSupplies] = useState<Supply[]>([]);



    useEffect(() => {
        ApiContext.get("/supply/select-options").then((res) => {
            console.log(equipmentId)
            setSupplies(res.data);
            if (res.data.length) {
                // setValue("supplyId", res.data[0].id);
            }
        });
    }, [equipmentId])

    return (
        <div>
            <div>
                {/* Include your other form fields here */}
                <Stack spacing={2}>

                    <Controller
                        name={`replaceItems.${index}.quantity`}
                        control={formMethods.control}
                        render={({ field }) => (
                            <TextField label="quantity" type='number' fullWidth {...field} />
                        )}
                    />

                    <Controller
                        name={`replaceItems.${index}.supplyId`}
                        control={formMethods.control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                fullWidth
                            >
                                {supplies.map(item => {
                                    return <MenuItem value={item.id} key={item.id}>
                                        {item.name}
                                    </MenuItem>
                                })}
                            </Select>
                        )}
                    />
                    <button
                        onClick={() => {

                            let replaceItems = formMethods.getValues("replaceItems");


                            replaceItems = replaceItems.filter((item, index2) => index2 !== index)
                            formMethods.setValue("replaceItems", replaceItems);
                        }}
                    >
                        Delete Item
                    </button>

                </Stack>
            </div>
        </div>

    );
}

export default SupplyForm;