import React, { Dispatch} from 'react'


interface RadioProps{
    label: string
    name: string
    value: string
    option: string
    setValue: Dispatch<React.SetStateAction<string>>
}
const Radio = (props: RadioProps) => {
  return (
    <div className={`flex gap-2 p-2 border-2 border-Slate_300 mb-2 rounded-md hover:border-Lime cursor-pointer ${props.option == props.value ? 'bg-lime-200 border-Lime' : null}`} onClick={() => props.setValue(props.value)}>
        <input type="radio" value={props.value} name={props.name} id={props.label} checked={props.option == props.value} />
        <label className='text-Slate_900 font-semibold' htmlFor={props.label}>{props.label}</label>
    </div>
    
  )
}

export default Radio