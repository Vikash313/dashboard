import React, {useState, useEffect} from 'react'
import Api from '../../service/master';
import useForm from 'react-hook-form';

const EditIndustry = (props) => {
    const { register, handleSubmit } = useForm();
    const [name, setName] = useState('')
    const [status, setStatus] = useState(false)
    const [_id, setId] = useState('')

    useEffect(() => {
        if (props.location && props.location.state){
            setId(props.location.state._id)
            setName(props.location.state.name)
            setStatus(props.location.state.status)
        }
    }, [])

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            _id
        }
        const res = await Api.addIndustryType(payload)

        if (res){
            props.history.goBack()
        }
    }

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <div className='card-header h5'> Add / Edit Industry  </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-8'>
                                <div className='form-group'>
                                    <label htmlFor='name'>Industry Name</label>
                                    <input id="name" value={name} ref={register} type='text' onChange={e => setName(e.target.value)} className='form-control' name='name' />
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-8'>
                                <div className='form-group'>
                                    <label htmlFor='status'>Status</label>
                                    <select id='status' value={status} ref={register} onChange={e => setStatus(e.target.value)} name='status'>
                                        <option value='true'>Active</option>
                                        <option value='false'>In Active</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='pl-3 w-100'>
                            <div className='row' >
                                <button type='submit' className='btn btn-success mr-auto'> Save </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditIndustry