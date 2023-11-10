"use client"
import React, { useEffect, useState } from 'react'
import SupplyForm, { ISupplyForm } from './supply.from';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import { Equipments } from '@/app/MedicalEquipment/page';
import ApiContext from '@/app/context/ApiContext';
import { MenuItem, Select, Stack, TextField } from '@mui/material';
import { defaultValues as replaceItemDefaultValues } from "./supply.from";
import { IRepairReportForm } from "./repair.report.form"
export interface IRepairReportItem {
    "description": string,
    "equipmentId": string,
    "imageUrls": string[],
    "replaceItems": ISupplyForm[],
    name: string,
    type: string
}

export const defaultValues: IRepairReportItem = {
    description: '',
    imageUrls: [],
    equipmentId: '',
    replaceItems: [],
    name: '',
    type: '',

}

interface RepairReportItemFormProps {
    formMethods: UseFormReturn<IRepairReportForm, any, undefined>
    index: number;
}

const RepairReportItemForm: React.FC<RepairReportItemFormProps> = ({ formMethods, index }) => {
    const replaceItemWatch = formMethods.watch(`repairReportItems.${index}`)
    const equipmentId = formMethods.watch(`repairReportItems.${index}.equipmentId`);


    const [equipments, setEquipments] = useState<Equipments[]>([]);


    useEffect(() => {
        ApiContext.get("/equipment/select-options").then((res) => {
            setEquipments(res.data);
            if (res.data.length) {
                // formMethods.setValue("equipmentId", res.data[0].id);
            }
        });
    }, [])


    const onSubmit = (data: IRepairReportItem) => {
        console.log(data);
    };



    return (<div>

        <Stack spacing={2}>

            <Controller
                name="description"
                control={formMethods.control}
                render={({ field }) => (
                    <TextField label="Description" fullWidth {...field} />
                )}
            />
            <Controller
                name={`repairReportItems.${index}.name`}
                control={formMethods.control}
                render={({ field }) => (
                    <TextField label="name" fullWidth {...field} />
                )}
            />
            <Controller
                name={`repairReportItems.${index}.type`}
                control={formMethods.control}
                render={({ field }) => (
                    <TextField label="type" fullWidth {...field} />
                )}
            />
            <Controller
                name={`repairReportItems.${index}.equipmentId`}
                control={formMethods.control}
                render={({ field }) => (
                    <Select
                        {...field}
                        fullWidth
                    >
                        {equipments.map(item => {
                            return <MenuItem value={item.id} key={item.id}>
                                {item.name}
                            </MenuItem>
                        })}
                    </Select>
                )}
            />
            {replaceItemWatch.replaceItems.map((item, subIndex) => {
                return <SupplyForm key={index} index={index} subIndex={subIndex} formMethods={formMethods} equipmentId={equipmentId} />
            })}
            <div>
                <button
                    onClick={() => {
                        const replaceItems = formMethods.getValues(`repairReportItems.${index}`);
                        replaceItems.replaceItems.push(replaceItemDefaultValues)
                        formMethods.setValue(`repairReportItems.${index}`, replaceItems);
                    }}
                >
                    Add More Supply Item
                </button>
            </div>
            {/* <button type="submit">Submit</button> */}
        </Stack>

    </div>);
}

export default RepairReportItemForm;