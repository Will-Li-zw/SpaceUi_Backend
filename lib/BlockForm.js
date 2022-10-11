import { useState, useEffect } from "react";
import { Alert, message, Button, Form } from 'antd';

export default function BlockForm() {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form.entries());
      const transmitData = {...formData, "spaceObjects":JSON.stringify(formFields), "movingObjects":JSON.stringify(movingFormFields)};
      const res = await fetch('/api/block', {
        body: JSON.stringify(transmitData),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const result = await res.json();
      console.log(result)
      setMessageShow(true);
      message
      .loading('Action in progress..', 1.0)
      .then(() => message.success('Adding Block finished', 1.0));
    };

    const [formFields, setFormFields] = useState([]);
    const [messageShow, setMessageShow] = useState(false);

  
    const handleFormChange = (event, index) => {
      let data = [...formFields];
      data[index][event.target.name] = event.target.value;
      setFormFields(data);
    }
    const addFields = () => {
      let object = {}
      setFormFields([...formFields, object])
    }
  
    const removeFields = (index) => {
      let data = [...formFields];
      data.splice(index, 1)
      setFormFields(data)
    }
    const [movingFormFields, setMovingFormFields] = useState([])
  
    const handleMovingFormChange = (event, index) => {
      let data = [...movingFormFields];
      data[index][event.target.name] = event.target.value;
      setMovingFormFields(data);
    }
    const addMovingFields = () => {
      let object = {}
      setMovingFormFields([...movingFormFields, object])
    }
  
    const removeMovingFields = (index) => {
      let data = [...movingFormFields];
      data.splice(index, 1)
      setMovingFormFields(data)
    }
  
    return (
      <div>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px",justifyContent:"center", alignItems:"center"}}>
        <input name="name" placeholder="name" type="text"  />
        <input name="type" placeholder="type" type="text"  />
        <input name="wheather" placeholder="Wheather" type="text"  />
        <input name="connector" placeholder="connector" type="text"  />
        <input name="peopleNumber" placeholder="People Number" type="text"  />
        <input name="carNumber" placeholder="Car Number" type="text"  />
        <input name="bikeNumber" placeholder="Bike Number" type="text"  />
        <input name="tramNumber" placeholder="Tram Number" type="text"  />
        <input name="parentBlock" placeholder="Parent Block" type="text"  />
        <textarea name="description" placeholder="description" type="text"  />
        {formFields.map((form, index) => 
            <div key={index}>
              <input
                name='sName'
                placeholder='Name'
                onChange={event => handleFormChange(event, index)}
                value={form.sName}
              />
              <input
                name='sType'
                placeholder='Object Type'
                onChange={event => handleFormChange(event, index)}
                value={form.sType}
              />
              <input
                name='sDescription'
                placeholder='Object Description'
                onChange={event => handleFormChange(event, index)}
                value={form.sDescription}
              />
              <input
                name='sBlockId'
                placeholder='Block Id'
                onChange={event => handleFormChange(event, index)}
                value={form.sBlockId}
              />
              <Button onClick={() => removeFields(index)}>Remove</Button>
            </div>
        )}
        {movingFormFields.map((form, index) => 
          <div key={index}>
            <input
                name='mName'
                placeholder='Name'
                onChange={event => handleMovingFormChange(event, index)}
                value={form.mName}
              />
            <input
              name='mType'
              placeholder='Type'
              onChange={event => handleMovingFormChange(event, index)}
              value={form.mType}
            />
            <input
              name='mDescription'
              placeholder='Description'
              onChange={event => handleMovingFormChange(event, index)}
              value={form.mDescription}
            />
            <input
              name='mBlockId'
              placeholder='Block Id'
              onChange={event => handleMovingFormChange(event, index)}
              value={form.mBlockId}
            />
            <input
              name='speed'
              placeholder='speed'
              onChange={event => handleMovingFormChange(event, index)}
              value={form.speed}
            />
            <Button onClick={() => removeMovingFields(index)}>Remove</Button>
          </div>
        )}
        <button type="submit">Create block</button>
      </form>
      <Button onClick={addFields}>Add A Space Object</Button>
      <Button onClick={addMovingFields}>Add A Moving Object</Button>
      </div>
    );
  }

  