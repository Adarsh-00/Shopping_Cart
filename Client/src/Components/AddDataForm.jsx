import axios from 'axios';
import React, { useState } from 'react';

const AddDataForm = ({night}) => {

    const API = 'http://localhost:8080/items';

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(API, formData)
        .then(()=>{alert('data send successfully')})
        .catch((err)=>{console.log(err.message)});
        
        setFormData({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    }


    return (
        <form onSubmit={handleSubmit} className='d-flex gap-2 my-4 mx-3'>
            <input className='form-control form-control-lg' type="text" value={formData.name} name='name' onChange={handleInputChange} required placeholder='enter item name'/>
            <input className='form-control form-control-lg' type="text" value={formData.description} name='description' onChange={handleInputChange} required placeholder='describe your item'/>
            <input className='form-control form-control-lg' type="number" value={formData.price} name='price' onChange={handleInputChange} required placeholder='enter the price'/>
            <input className='form-control form-control-lg' type="text" value={formData.image} name='image' onChange={handleInputChange} required placeholder='enter image url'/>
            <button className='btn btn-primary' type='submit'>Add</button>
        </form>
    );
}

export default AddDataForm;
