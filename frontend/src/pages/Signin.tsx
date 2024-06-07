import { AuthForm } from "../components/AuthForm";
import { Quote } from "../components/Quote";

export const Signin = ()=>{
    return (
      <div className="flex">
        <AuthForm type="signin"/>
        <Quote/>
      </div>
    );  
}