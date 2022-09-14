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
  
    return (
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
    );
  }