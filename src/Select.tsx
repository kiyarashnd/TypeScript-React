type selectOptions={
    label:string
    value:string
}

type SelectProps ={
options:selectOptions[]
value?:selectOptions
onChange:(value:selectOptions | undefined)=>void
}

export function Select({value,onChange,options}:SelectProps){

}