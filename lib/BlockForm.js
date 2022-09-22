import { useState } from "react";

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
    };

    const [formFields, setFormFields] = useState([])
  
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
        <input name="wheather" placeholder="wheather" type="text"  />
        <input name="connector" placeholder="connector" type="text"  />
        <input name="peopleDensity" placeholder="People Density" type="text"  />
        <input name="carDensity" placeholder="Car Density" type="text"  />
        <input name="bikeDensity" placeholder="Bike Density" type="text"  />
        <textarea name="description" placeholder="description" type="text"  />
        {formFields.map((form, index) => 
            <div key={index}>
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
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
        )}
        {movingFormFields.map((form, index) => 
          <div key={index}>
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
            <button onClick={() => removeMovingFields(index)}>Remove</button>
          </div>
        )}
        <button type="submit">Create block</button>
      </form>
      <button onClick={addFields}>Add A Space Object</button>
      <button onClick={addMovingFields}>Add A Moving Object</button>
      </div>
    );
  }

  