import {AuthForm} from '../components/AuthForm'
import { Quote } from '../components/Quote'

export const Signup = ()=>{
    return(
        <div className='flex'>
            <AuthForm type="signup"/>
            <Quote/>
        </div>  
    )
}