
import fetch from "./fetch";

export const getfn = async(params) => {
    const url = `/getfn`
    const method = "GET"
    const data = {

    }
    const query = {
        gqd:'gqd',
        qget:params && params.qget,
        mc:document.cookie.csrfToken
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}

export const postfn = async(params) => {
    const url = `/postfn`
    const method = "POST"
    const data = {
        pdd:"pdd",
        dpost:params && params.dpost
    }
    const query = {
        pqd:"pqd",
        qpost:params && params.qpost
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}

export const headfn = async(params) => {
    const url = `/headfn`
    const method = "HEAD"
    const data = {
        
    }
    const query = {
        hqd:"hqd",
        qhead:params && params.qhead
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}

export const deletefn = async(params) => {
    const url = `/deletefn`
    const method = "DELETE"
    const data = {
        ddd:'ddd'
    }
    const query = {
        dqd:"dqd",
    }
    try {
        return await fetch(url,method,data,query)
    }catch(err){
        return err
    }
}