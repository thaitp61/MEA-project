interface IDepartment {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: string;
    isRequiredUpdate: string;
    name: string;
    description: string;
    status: string;
}

interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: {
        id: string;
        name: string;
    }
    department: {
        id: string;
        name: string;
    }
    startWorkDate: string;
    endImportDate: string;
    gender: string;
    citizenId: string;
    birthday: string;
    status: string;
}

interface IEquipment {
    id: string;
    name: string;
    code: string;
    description: string;
    mfDate: string;
    importDate: string;
    department: {
        id: string;
        name: string;
    };
    expiredDate: string;
    endOfWarrantyDate: string;
    equipmentCategory: {
        id: string;
        name: string;
    }
    equipmentMaintainSchedule: {
        id: string
        cycleMaintainPerMonth: number;
        lastMaintainDate: string;
        lastNotifyDate: string;
    }
    currentStatus: string;
    brand: string;
    imageUrls: [string];

}
interface IRepairRequest {
    id: string,
    createdAt: string,
    updateAt: string,
    description: string,
    imageUrls: [],
    status: string,
    note: string,
    createdBy: {
        id: string,
        name: string,
    }
    equipment: {
        id: string,
        name: string,
        code: string,
    }
}
interface IRepairReport {
    id: string,
    createdAt: string,
    updateAt: string,
    description: string,
    type: string,
    status: string,
    note: string,
    createdBy: {
        id: string,
        name: string,
    }
    equipments: IEquipment[],
    repairReplaceItems: [],
    startAt: string,
    endAt: string,
    createdBy: {
        id: string,
        name: string,
        status: string,
        role: {
            id: string,
            name: string,
        }
    },
}

