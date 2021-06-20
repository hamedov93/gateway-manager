import React from 'react'
import { render } from 'react-dom'
import { Admin, Resource } from 'react-admin'
import { httpClient } from './clients/httpClient'
import restClient from './clients/restClient'

import { GatewayList, GatewayCreate, GatewayEdit, GatewayShow, GatewayIcon } from './resources/gateways'
import { DeviceList, DeviceCreate, DeviceEdit, DeviceIcon } from './resources/devices'

const history = require('history').createBrowserHistory()

const App = () => (
  <Admin title="Gateway Manager UI" dataProvider={restClient} history={history}>
    <Resource name="gateways" options={{label:"Gateways"}} list={GatewayList} create={GatewayCreate} edit={GatewayEdit} show={GatewayShow} icon={GatewayIcon} />
    <Resource name="devices" options={{label:"Devices"}} list={DeviceList} create={DeviceCreate} edit={DeviceEdit} icon={DeviceIcon} />
  </Admin>
)

export default App
