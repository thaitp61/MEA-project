import { GridToolbarExportContainer, GridCsvExportMenuItem, GridPrintExportMenuItem } from '@mui/x-data-grid';
import { ExportMenuItem } from './ExportMenuItem';
import * as React from 'react';

export function ExportButton(props: any) {
    return (
        <GridToolbarExportContainer {...props}>
            <GridCsvExportMenuItem />
            <GridPrintExportMenuItem />
            <ExportMenuItem />
        </GridToolbarExportContainer>
    );
}
