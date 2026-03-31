import { useEffect, useState } from "react";

function BasicInfo() {

    const [form, setForm] = useState({
        username: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });
    useEffect(() => {
        fetch("http://localhost:5000/profile", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => setForm(data));
    }, []);

    const handleChange = (e: any) => {
        setForm({
            ...form, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        await fetch("http://localhost:5000/profile",
            {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });
        alert("Profile updated succefully");
    }
    return (
        <div>
            {/* <div className="flex items-center gap-2">
                <label className="font-medium">Username:</label>
                <input name="username" value={form.username} onChange={handleChange} placeholder="Name" />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-medium">phone:</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="phone" />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-medium">address:</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-medium">city:</label>
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-medium">state:</label>
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
            </div>
            <div className="flex items-center gap-2">
                <label className="font-medium">pincode:</label>
                <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" />
            </div>
            <button className="bg-blue-500 text-white px-3 py-1" onClick={handleSubmit}>
                Save
            </button> */}

            <div className="space-y-2">
                <div><span className="font-semibold">Username:</span> {form.username}</div>
                <div><span className="font-semibold">Phone:</span> {form.phone}</div>
                <div><span className="font-semibold">Address:</span> {form.address}</div>
                <div><span className="font-semibold">City:</span> {form.city}</div>
                <div><span className="font-semibold">State:</span> {form.state}</div>
                <div><span className="font-semibold">Pincode:</span> {form.pincode}</div>
            </div>
        </div>
    );
}

export default BasicInfo;