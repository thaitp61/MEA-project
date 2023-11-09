const config = {
    columnNames: [
        'Mã thiết bị',
        'Tên thiết bị',
        'Loại thiết bị',
        'Ngày sản xuất',
        'Ngày nhập kho',
        'Bảo hành đến',
        'Ngày bảo trì tiếp theo',
        'Trạng thái',
    ],
    keys: ['code', 'name', 'description', 'mfDate', 'importDate', 'expiredDate', 'endOfWarrantyDate', 'lastStatus'],
    fileName: 'data.xlsx',
    sheetName: 'Personal Info',
};

export { config };
