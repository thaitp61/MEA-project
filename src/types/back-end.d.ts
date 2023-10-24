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
}