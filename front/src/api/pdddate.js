import fetch from "./fetch";

//获取线上数据
export const getAllData = async(params) => {
  const url = `/req`
  const method = "POST"
  const data = {
    url:params && params.url
  }
  const query = {
  }
  try {
    return await fetch(url,method,data,query)
  } catch (err) {
    return err
  }
}

