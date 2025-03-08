import React, { Dispatch, HTMLInputTypeAttribute } from 'react'

interface InputProps{
    logo: string
    flexType: string
    placeholder: string
    label: string
    name: string
    value: string
    type: HTMLInputTypeAttribute
    isSubmtting: boolean
    setValue: Dispatch<React.SetStateAction<string>>
    setError: Dispatch<React.SetStateAction<boolean>>
    error: boolean;
    
}

const Input = (props: InputProps) => {
    if(props.isSubmtting && (!Number(props.value) || props.value.trim() == '')){ 
        props.setError(true)
    } else{
        props.setError(false)
    }
    
  return (
    <div>
        <label className='text-Slate_500 font-semibold text-sm' htmlFor={props.name}>{props.label}</label>
        <div className={`group flex justify-center items-center border-2 ${props.error && props.isSubmtting ? 'border-Red': 'border-Slate_300'}  border-Slate_300 rounded-md mt-2 hover:border-Lime transition-all ${props.flexType} hover:`}>
            <input id={props.name} className='w-full outline-none p-1' name={props.name} value={props.value} onChange={(e) => props.setValue(e.target.value)} type={props.type} placeholder={props.placeholder}/>
            <p className={`font-semibold p-2 ${props.error && props.isSubmtting ? 'bg-Red text-White': 'bg-Slate_100 group-hover:bg-Lime group-hover:font-semibold transition-all'}`}>{props.logo}</p>
        </div>
        {props.isSubmtting 
        
        ? props.value.trim() == ''
            ? <p className='text-Red text-sm font-semibold mt-2'>This Field is Required</p>
            : !Number(props.value) 
                ? <p className='text-Red text-sm font-semibold mt-2'>Value must be a number</p>
                : null
        : null
        }
        
    </div>
  )
}

export default Input