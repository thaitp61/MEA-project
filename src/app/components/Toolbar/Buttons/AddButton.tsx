import Button from '@mui/material/Button';
import { AiFillTool } from "react-icons/ai";
import CreateModal from "../../MaintenanceModal/create.maintenace.modal"
import React, { useState, useEffect } from 'react';

interface IProps {
    selectedRows: IEquipment[];
}

export default function AddButton(props: IProps) {
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const { selectedRows } = props;
    const selectedIDs = selectedRows.map(row => row.id);
    const isDisabled = !(selectedRows.length > 0);
    const [searchSupplyCalled, setSearchSupplyCalled] = useState(false);

    const handleClick = () => {
        setOpenCreateModal(true);
    };
    const [data, setData] = useState([]);

    return (
        <>
            <Button
                startIcon={<AiFillTool />}
                disabled={isDisabled}
                onClick={handleClick}
            >
                bảo trì
            </Button>
            <CreateModal
                showModalCreate={openCreateModal}
                setShowModalCreate={setOpenCreateModal}
                equipments={selectedRows}
                supply={data}
            />
        </>
    );
}
