'use client'
import ApiContext from '@/app/context/ApiContext';
import { MenuItem, Select, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Controller, UseFormReturn, useForm } from "react-hook-form";
import { Supply } from '../MaintenanceModal/create.maintenace.modal';
import { IRepairReportItem } from './repair.report.item.form';
import { IRepairReportForm } from './repair.report.form';


export interface ISupplyForm {
    quantity: number,
    supplyId: string
}
export const defaultValues: ISupplyForm = {
    quantity: 1,
    supplyId: ""
}
interface SupplyFormProps {
    formMethods: UseFormReturn<IRepairReportForm, any, undefined>
    index: number;
    subIndex: number;
    equipmentId: string;
}

const SupplyForm: React.FC<SupplyFormProps> = ({ formMethods, index, equipmentId, subIndex }) => {



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
                        name={`repairReportItems.${index}.replaceItems.${subIndex}.quantity`}
                        control={formMethods.control}
                        render={({ field }) => (
                            <TextField label="quantity" type='number' fullWidth {...field} />
                        )}
                    />

                    <Controller
                        name={`repairReportItems.${index}.replaceItems.${subIndex}.supplyId`}
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

                            let replaceItems = formMethods.getValues(`repairReportItems.${index}.replaceItems`);


                            replaceItems = replaceItems.filter((item, index2) => index2 !== subIndex)
                            formMethods.setValue(`repairReportItems.${index}.replaceItems`, replaceItems);
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