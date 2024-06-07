import { useState } from "react";
import { FormInput } from "./FormInput";
import { SubmitButton } from "./SubmitButton";
import { SignupType } from "@dinesh4762/common-zod-type";
import { AuthHeader } from "./AuthHeader";
import {BACKEND_URL} from "../../config"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthForm = ({type} : {type: string}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  function onSubmit() {
    setLoading(true);
    console.log(postInputs);
    if(!postInputs.email || !postInputs.password){
      alert("inputs are empty!")
      setLoading(false);  
      return
    } 
      axios.post(`${BACKEND_URL}/api/v1/user${type==="signup"? "/signup" : "/signin"}`,postInputs)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("token",res.data.token);
        navigate("/blogs");
      }).catch((e)=>{
        setLoading(false)
        alert(e.response.data.error)
      })
    
  }

  return (
    <div className="w-full md:w-1/2 h-[100svh] flex items-center">
      <div className="w-3/4 min-w-[300px] md:w-1/2 mx-auto">
        {/* header */}
        <AuthHeader type={type} />
        {/* Form */}
        <div className="flex flex-col gap-6">
          {type === "signup"? (<FormInput
            label="Name"
            placeholder="John Cena"
            value={postInputs.name}
            type="text"
            onChange={(e) =>
              setPostInputs((prev) => ({ ...prev, name: e.target.value }))
            }
          />): null}

          <FormInput
            label="Email"
            placeholder="johncena@wwe.com"
            value={postInputs.email}
            type="email"
            onChange={(e) =>
              setPostInputs((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <FormInput
            label="Password"
            placeholder="youCANTseeME"
            value={postInputs.password}
            type="password"
            onChange={(e) =>
              setPostInputs((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <SubmitButton loading={loading} label={type === "signup"? "Sign Up": "Sign In"} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
};
