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

export const DeviceIcon = MonetizationOnIcon

const statuses = [
    { id: 'online', name: 'Online' },
    { id: 'offline', name: 'Offline' },
]

const DeviceFilter = props => (
    <Filter {...props}>
        <TextInput label="Search by vendor" source="q" alwaysOn />
        <SelectInput source="status" choices={statuses} />
        <ReferenceInput source="gateway" reference="gateways">
            <AutocompleteInput optionValue="id" optionText="name" />
        </ReferenceInput>
    </Filter>
)

export const DeviceList = props => (
    <List title="Devices" {...props} filters={<DeviceFilter />} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="_id" label="ID" />
            <TextField source="uid" label="UID" />
            <TextField source="vendor" />
            <TextField source="status" />
            <ReferenceField source="gateway" reference="gateways">
                <TextField source="name" />
            </ReferenceField>
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton />
        </Datagrid>
    </List>
)

export const DeviceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="gateway" reference="gateways" validate={required()}>
                <AutocompleteInput optionValue="id" optionText="name" />
            </ReferenceInput>
            <NumberInput source="uid" validate={required()} />
            <TextInput source="vendor" validate={required()} />
            <SelectInput source="status" choices={statuses} validate={required()} />
        </SimpleForm>
    </Create>
)

export const DeviceEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="gateway" reference="gateways" validate={required()}>
                <AutocompleteInput optionValue="id" optionText="name" />
            </ReferenceInput>
            <NumberInput source="uid" validate={required()} />
            <TextInput source="vendor" validate={required()} />
            <SelectInput source="status" choices={statuses} validate={required()} />
        </SimpleForm>
    </Edit>
)
