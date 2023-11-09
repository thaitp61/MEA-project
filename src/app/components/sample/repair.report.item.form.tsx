"use client"
import React, { useEffect, useState } from 'react'
import SupplyForm, { ISupplyForm } from './supply.from';
import { Controller, useForm } from 'react-hook-form';
import { Equipments } from '@/app/MedicalEquipment/page';
import ApiContext from '@/app/context/ApiContext';
import { MenuItem, Select, Stack, TextField } from '@mui/material';
import { defaultValues as replaceItemDefaultValues } from "./supply.from";
export interface IRepairReportItem {
    "description": string,
    "equipmentId": string,
    "imageUrls": string[],
    "replaceItems": ISupplyForm[]
}

const defaultValues: IRepairReportItem = {
    description: '',
    imageUrls: [],
    equipmentId: '',
    replaceItems: []

}

interface RepairReportItemFormProps {

}

const RepairReportItemForm: React.FC<RepairReportItemFormProps> = () => {
    const formMethods = useForm<IRepairReportItem>({ defaultValues });
    const replaceItemWatch = formMethods.watch("replaceItems")
    const equipmentId = formMethods.watch("equipmentId");

    const [equipments, setEquipments] = useState<Equipments[]>([]);


    useEffect(() => {
        ApiContext.get("/equipment/select-options").then((res) => {
            setEquipments(res.data);
            if (res.data.length) {
                formMethods.setValue("equipmentId", res.data[0].id);
            }
        });
    }, [])


    const onSubmit = (data: IRepairReportItem) => {
        console.log(data);
    };



    return (<div>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <div>
                <button
                    onClick={() => {
                        const replaceItems = formMethods.getValues("replaceItems");
                        replaceItems.push(replaceItemDefaultValues)
                        formMethods.setValue("replaceItems", replaceItems);
                    }}
                >
                    Add More Supply Item
                </button>
            </div>
            <Stack spacing={2}>
                <Controller
                    name="description"
                    control={formMethods.control}
                    render={({ field }) => (
                        <TextField label="Description" fullWidth {...field} />
                    )}
                />
                <Controller
                    name="equipmentId"
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
                {replaceItemWatch.map((item, index) => {
                    return <SupplyForm key={index} index={index} formMethods={formMethods} equipmentId={equipmentId} />
                })}
                <button type="submit">Submit</button>
            </Stack>

        </form>
    </div>);
}

export default RepairReportItemForm;