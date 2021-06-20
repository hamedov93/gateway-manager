import { stringify } from 'query-string'
import { isObject, api_url as apiUrl } from '../utils/common'
import { httpClient } from './httpClient'

export default {
    getList: (resource, params) => {
        let { page, perPage } = params.pagination
        const { field, order } = params.sort
        const filter = { ...params.filter }

        const myParams = { ...params }

        delete myParams.filter
        delete myParams.sort
        delete myParams.pagination

        const query = {
            sortBy: `${field || 'createdAt'}:${order.toLowerCase()}`,
            page: page || 1,
            limit: perPage || 10,
            ...myParams,
        }

        for (var key in filter) {
            if (filter[key] == '' || ! filter[key]) { continue }
            if (filter[key].constructor === Array) {
                for (var i = 0; i < filter[key].length; i++) {
                    query['filter['+key+']['+i+']'] = filter[key][i]
                }
            } else {                        
                query['filter['+key+']'] = filter[key]
            }
        }

        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url).then(({ headers, json }) => {
            return ({
                data: json.data,
                total: json.total,
            })
        })
    },

    getOne: (resource, params) => {
        let url = `${apiUrl}/${resource}/${params.id}`
        url = params.endpointExt ? url + '/' + params.endpointExt : url
        if (params.params) {
            url = url + '?' + stringify(params.params)
        }

        return httpClient(url).then(({ json }) => ({
            data: json,
        }))
    },

    getMany: (resource, params) => {
        let query = {
            sortBy: 'createdAt:desc',
            limit: 25,
        }

        for (var i = 0; i < params.ids.length; i++) {
            query['filter[id]['+i+']'] = params.ids[i]
        }

        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url).then(({ json }) => ({ data: json.data }))
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination
        const { field, order } = params.sort
        const filter = { ...params.filter }

        filter[params.target] = params.id

        const query = {
            sortBy: `${field || 'createdAt'}:${order.toLowerCase()}`,
            page: page || 1,
            limit: perPage || 10,
        }

        for (var key in filter) {
            if (filter[key].constructor === Array) {
                for (var i = 0; i < filter[key].length; i++) {
                    query['filter['+key+']['+i+']'] = filter[key][i]
                }
            } else {                        
                query['filter['+key+']'] = filter[key]
            }
        }

        const url = `${apiUrl}/${resource}?${stringify(query)}`

        return httpClient(url).then(({ headers, json }) => ({
            data: json.data,
            total: json.total,
        }))
    },

    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`
        const data = new FormData()
        let method = 'PUT'

        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method,
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`
        const data = new FormData()
        let method = 'POST'
        
        return httpClient(`${apiUrl}/${resource}`, {
            method,
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },

    delete: (resource, params) => {
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }))
    },

    deleteMany: (resource, params) => {
        const url = `${apiUrl}/${resource}/${encodeURIComponent(JSON.stringify(params.ids))}`
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }))
    }

}
