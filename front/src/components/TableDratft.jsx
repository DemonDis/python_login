
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const Table = () => {

    return (
        <div className="card">
            <DataTable value={[{'darft_id': 'ss'}]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="darft_id" header="darft_id"></Column>
                <Column field="darft_name" header="darft_name"></Column>
                <Column field="darft_date" header="darft_date"></Column>
            </DataTable>
        </div>
    );
}
        