import { useEffect, useState } from "react";

function BasicInfo(){

    const [form, setForm] = useState({
        username: "",
        phone:"",
        address:"",
        city:"",
        state:"",
        pincode:""
    });

    useEffect(() =>{
        fetch("http://localhost:5000/profile", {
            credentials: "include",
        })
        .then(res => res.json())
        .then(data => setForm(data));
    },[]);

   const handleChange = (e: any) => {
    setForm({
        ...form,[e.target.name]: e.target.value,
    });
   };

   const handleSubmit = async () =>{
    await fetch("http://localhost:5000/profile",
        {
            method: "PUT",
            headers:{
                "content-type":"application-json",
            },
            credentials:"include",
            body: JSON.stringify(form),
        });
        alert("Profile updated succefully");
   }
return (
    <div className="flex flex-col gap-4">
        <input name="username" value={ form.username } onChange={handleChange} placeholder="Name" />
        <input name="username" value={ form.phone } onChange={handleChange} placeholder="phone" />
        <input name="username" value={ form.address } onChange={handleChange} placeholder="Address" />
        <input name="username" value={ form.city } onChange={handleChange} placeholder="City" />
        <input name="username" value={ form.state } onChange={handleChange} placeholder="State" />
        <input name="username" value={ form.pincode } onChange={handleChange} placeholder="Pincode" />
        <button className="bg-blue-500 text-white px-3 py-1" onClick={handleSubmit}>
            Save
        </button>
    </div>
);
}

export default BasicInfo;