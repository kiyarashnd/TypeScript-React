import styles from './select.module.css'

type selectOptions={
    label:string
    value:any
}

type SelectProps ={
options:selectOptions[]
value?:selectOptions
onChange:(value:selectOptions | undefined)=>void
}

export function Select({value,onChange,options}:SelectProps){
    return (
        <>
        <div tabIndex={0} className={styles.container}>
            <span className={styles.value}>Value</span>
            {/* here &times; is X icon */}
            <button className={styles['clear-btn']}>&times;</button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${styles.show}`}>
                {options.map(option=>(
                    <li key={option.label} className={styles.option}>{option.label}</li>
                ))}
            </ul>
        </div>
        </>
    )
}