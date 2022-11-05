import React, { useEffect, useState } from 'react'
import { getCategories } from '../api/categoryAPI'

const Checkbox_categories = ({handleFilter}) => {
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])

    useEffect(() => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
    }, [])

    const handleChange = (e) => {
        // e.preventDefault()
        let newChecked = [...checked]
        let checkedValue = e.target.value

        let index = newChecked.findIndex(item=>item===checkedValue)
        if(index === -1){
            newChecked.push(checkedValue)
        }
        else{
            newChecked.splice(index, 1)
        }
        setChecked(newChecked)
        handleFilter(newChecked)
    }

    return (
        <>
            <h4 className='mt-3'>Categories</h4>
            {
                categories.map((category, i) => {
                    return <div className="form-check" key={i}>
                        <input className="form-check-input mt-1 me-2" type="checkbox" id={`flexCheck${i}`} value= {category.categoryId} onChange={handleChange}/>
                            <label className="form-check-label" htmlFor={`flexCheck${i}`}>
                                {category.category_name}
                            </label>
                    </div>
                })
            }

        </>
    )
}

export default Checkbox_categories