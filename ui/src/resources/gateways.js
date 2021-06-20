import React from 'react'

import {
    List, Show, Delete, Datagrid, EmailField, TextField, EditButton,
    DateField, ChipField, ShowButton, required, SimpleForm, Edit,
    TextInput, SelectInput, Filter, FunctionField, ReferenceField,
    TabbedShowLayout, Tab, ReferenceManyField, ReferenceInput,
    AutocompleteInput, NumberInput, Create, BooleanInput,
    ImageField, ImageInput
} from 'react-admin'

import Chip from '@material-ui/core/Chip'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'

import { ucFirst } from '../utils/common'

export const GatewayIcon = MonetizationOnIcon

const statuses = [
    { id: 'done', name: 'Done' },
    { id: 'pending', name: 'Pending' },
]

const GatewayFilter = props => (
    <Filter {...props}>
        <TextInput label="Search by name" source="q" alwaysOn />
    </Filter>
)

export const GatewayList = props => (
    <List title="Gateways" {...props} filters={<GatewayFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="_id" label="ID" />
            <TextField source="name" />
            <TextField source="serialNumber" />
            <TextField source="ipAddress" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
)

export const GatewayCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="serialNumber" validate={required()} />
            <TextInput source="ipAddress" validate={required()} />
            <SelectInput source="status" choices={statuses} validate={required()} />
        </SimpleForm>
    </Create>
)

export const GatewayEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="serialNumber" validate={required()} />
            <TextInput source="ipAddress" validate={required()} />
            <SelectInput source="status" choices={statuses} validate={required()} />
        </SimpleForm>
    </Edit>
)

export const GatewayShow = props => (
    <Show {...props}>
        <TabbedShowLayout>
            <Tab label="Gateway details">
                <TextField source="_id" label="ID" />
                <TextField source="name" />
                <TextField source="serialNumber" />
                <TextField source="ipAddress" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
            </Tab>
            <Tab label="Peripheral devices">
                <ReferenceManyField reference="devices" target="gateway" label="">
                    <Datagrid>
                        <TextField source="_id" label="ID" />
                        <TextField source="uid" label="UID" />
                        <TextField source="vendor" />
                        <TextField source="status" />
                        <DateField source="createdAt" />
                        <DateField source="updatedAt" />
                        <EditButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
)
