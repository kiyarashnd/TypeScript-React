import { useState , useEffect } from 'react'
import styles from './select.module.css'

export type selectOptions={
    label:string
    value:string | number
}

type MultipleSelectProps = {
    multiple:true
    value:selectOptions[]
onChange:(value:selectOptions[])=>void
}

type singleSelectProps = {
    multiple?:false
    value?:selectOptions
onChange:(value:selectOptions | undefined)=>void
}

type SelectProps ={
options:selectOptions[]
} & (singleSelectProps | MultipleSelectProps)

export function Select({multiple,value,onChange,options}:SelectProps){
    const [isOpen,setIsOpen]=useState(false);
    //for highLite index when we hover on any item on list
    const [highlightedIndex,setHighlightedIndex]=useState(0)

    function clearOptions(){
        onChange(undefined);
    }

    function selectOption(option:selectOptions) {
        if(multiple){
            if(value.includes(option)){
                onChange(value.filter(o=>o!==option))
            }
            else{
                onChange([...value,option])
            }
        } else{
            if(option!==value) onChange(option)
        }
    }

    function isOptionSelected(option:selectOptions)
    {
        return multiple? value.includes(option): option === value;
    }

    useEffect(() => {
     if (isOpen) setHighlightedIndex(0)
    }, [isOpen]);

    
    return (
        <>
        <div
        onBlur={()=>setIsOpen(false)} 
        onClick={()=>setIsOpen(prev=>!prev)} tabIndex={0} className={styles.container}>
            <span className={styles.value}>{multiple?value.map(v=>(
                <button key={v.value} className={styles['options-badge']} onClick={e=>{
                    e.stopPropagation()
                    selectOption(v)
                }}>{v.label}<span className={styles['remove-btn']}>&times;</span></button>
            )):value?.label}</span>
            {/* here &times; is X icon */}
            <button onClick={e=>{
                // stopPropagation for stop open list when click on x
                e.stopPropagation()
                clearOptions();
            }} className={styles['clear-btn']}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen?styles.show : ""}`}>
                {options.map((option,index)=>(
                    <li onClick={e=>{
                        e.stopPropagation()
                        selectOption(option)
                        setIsOpen(false)
                    }} 
                    onMouseEnter={()=>setHighlightedIndex(index)}
                    key={option.value}
                    className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ''}
                    ${index===highlightedIndex ? styles.highlighted:''}`}>{option.label}</li>
                ))}
            </ul>
        </div>
        </>
    )
}