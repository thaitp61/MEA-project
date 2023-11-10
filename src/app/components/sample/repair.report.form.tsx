"use client"
import React, { useEffect, useState } from 'react'
import RepairReportItemForm, { IRepairReportItem } from './repair.report.item.form';
import { Controller, useForm } from 'react-hook-form';
import { Equipments } from '@/app/MedicalEquipment/page';
import ApiContext from '@/app/context/ApiContext';
import { MenuItem, Select, Stack, TextField } from '@mui/material';
import { defaultValues as repairReportItemDefaultValues } from "./repair.report.item.form";

export interface IRepairReportForm {
    description: string,
    note: string,
    startAt: string,
    endAt: string,
    repairReportItems: IRepairReportItem[]
}

const defaultValues: IRepairReportForm = {
    description: '',
    note: 'string',
    startAt: 'string',
    endAt: 'string',
    repairReportItems: []

}

interface RepairReportFormProps {
    test: string[]
}

const RepairReportForm: React.FC<RepairReportFormProps> = ({ test = ["6441bc51-9f89-43ba-87dd-a3b3f659bb47", "121ec482-a325-4e19-afd4-d607c65c28a7"] }) => {
    const formMethods = useForm<IRepairReportForm>({ defaultValues });
    const repairReportItemsWatch = formMethods.watch("repairReportItems")
    // const equipmentId = formMethods.watch("equipmentId");

    const [equipments, setEquipments] = useState<Equipments[]>([]);


    // useEffect(() => {
    //     ApiContext.get("/equipment/select-options").then((res) => {
    //         setEquipments(res.data);
    //         if (res.data.length) {
    //             formMethods.setValue("equipmentId", res.data[0].id);
    //         }
    //     });
    // }, [])

    useEffect(() => {
        formMethods.setValue("repairReportItems", test.map(item => {
            return {
                ...repairReportItemDefaultValues,
                equipmentId: item,
            }
        }))
    }, [])


    const onSubmit = (data: IRepairReportForm) => {
        console.log(data);
    };



    return (<div>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>

            <Stack spacing={2}>
                <Controller
                    name="description"
                    control={formMethods.control}
                    render={({ field }) => (
                        <TextField label="Description" fullWidth {...field} />
                    )}
                />

                {repairReportItemsWatch.map((item, index) => {
                    return <RepairReportItemForm key={index} index={index} formMethods={formMethods} />
                })}
                <div>
                    <button
                        onClick={() => {
                            const repairReportItems = formMethods.getValues("repairReportItems");
                            repairReportItems.push(repairReportItemDefaultValues)
                            formMethods.setValue("repairReportItems", repairReportItems);
                        }}
                    >
                        Add More Equipment Fixing
                    </button>
                </div>
                <button type="submit">Submit</button>
            </Stack>

        </form>
    </div>);
}

export default RepairReportForm;