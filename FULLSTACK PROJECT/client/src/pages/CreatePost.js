import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import  * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const CreatePost = () => {
    let navigate = useNavigate();

    const initialValues={
        title:"",
        postText:"",
        username:"",
    };

const validationSchema=Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
});

    const onSubmit=(data)=>{
        axios.post('http://localhost:3001/posts', data).then((response)=>{
            navigate('/')
        });
        console.log(data)
    };


  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <ErrorMessage name='title' component='span'/>
                <label>Title:</label>
                <Field id='inputCreatePost' name='title' placeholder='(Ex. title...)'/>
                <ErrorMessage name='postText' component='span'/>
                <label>Post:</label>
                <Field id='inputCreatePost' name='postText' placeholder='(Ex. Post...)'/>
                <ErrorMessage name='username' component='span'/>
                <label>Username:</label>
                <Field id='inputCreatePost' name='username' placeholder='(Ex. John123...)'/>
                <button type='submit'>Create a Post</button>
            </Form>
            </Formik>
    </div>
  )
}

export default CreatePost