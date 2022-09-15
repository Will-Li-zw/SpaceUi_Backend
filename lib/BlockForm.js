import { useState } from "react";

export default function BlockForm() {
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form.entries());
      console.log(formData);
      const res = await fetch('/api/block', {
        body: JSON.stringify(formData),
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
  
    return (
      <div>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", width:"500px",justifyContent:"center", alignItems:"center"}}>
        <input name="type" placeholder="type" type="text"  />
        <input name="wheather" placeholder="wheather" type="text"  />
        <input name="connector" placeholder="connector" type="text"  />
        <input name="peopleDensity" placeholder="People Density" type="text"  />
        <input name="carDensity" placeholder="Car Density" type="text"  />
        <input name="bikeDensity" placeholder="Bike Density" type="text"  />
        <textarea name="description" placeholder="description" type="text"  />
        <button type="submit">Create block</button>
      </form>
      <form>
      {formFields.map((form, index) => 
            <div key={index}>
              <input
                name='type'
                placeholder='Type'
                onChange={event => handleFormChange(event, index)}
                value={form.type}
              />
              <input
                name='description'
                placeholder='Description'
                onChange={event => handleFormChange(event, index)}
                value={form.description}
              />
              <input
                name='blockId'
                placeholder='Block Id'
                onChange={event => handleFormChange(event, index)}
                value={form.blockId}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
      )}
      </form>
      <button onClick={addFields}>Add A Space Object</button>
      </div>
    );
  }

  