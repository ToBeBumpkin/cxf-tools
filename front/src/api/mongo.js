
import fetch from "./fetch";

export const find = async(params) => {
    const url = `/find`
    const method = "POST"
    const data = {
        "name": params.name,
    }
    const query = {
        "skip": params.skip,
        "limit": params.limit,
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}
export const insert = async(params) => {
    const url = `/insert`
    const method = "POST"
    const data = params
    const query = {
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}
export const count = async(params) => {
    const url = `/count`
    const method = "GET"
    const data = {}
    const query = {
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}
export const remove = async(params) => {
    const url = `/remove`
    const method = "DELETE"
    const data = {}
    const query = {
        "_id":params._id
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}
export const update = async(params) => {
    const url = `/update`
    const method = "POST"
    const data = params
    const query = {}
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}