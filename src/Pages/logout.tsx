

function Logout() {
    const handleLogout = async (e: any) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/logout", {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        alert(data.message);
        window.location.href = "/signin";
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout;