import { useEffect, useState } from "react"
import axios
 from "axios";
import { BACKEND_URL } from "../../config";

interface Blog{
    id: string;
    title: string;
    content: string;
    author:{
        name: string;
    }
}
export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true);
    const [blogs, setblogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            setblogs(res.data.blogs);
            setLoading(false);
        }).catch((e)=>{
            console.error(e);
            alert(e.response.data.error);
        })
    },[])
    
    return {loading, blogs}
}