import Http from "../http-common.js"

class getBlogData {
    getAll(){
        return Http.get(`getBlogPost`)
    }

    get(id){
        return Http.get(`getBlogPost/id/${id}`)
    }

    findType(type){
        return Http.get(`getBlogPost?type=${type}`)
    }

    findName(name){
        return Http.get(`getBlogPost?name=${name}`)
    }
    
    post(data){
        return Http.post("/post", data)
    }
    
    edit(data){
        return Http.put("/post", data)
    }

    delete(id){
        return Http.delete("/post", id)
    }
}

export default new getBlogData();