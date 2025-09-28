import { useState } from "react";
 import { useEffect} from "react";

const Manager=()=>{

    const [showPassword, setShowPassword] = useState(false);
    const [passwords, setPasswords] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const [form, setForm] = useState({
        URL:"",
        username:"",
        password:"",
    });

    useEffect(() => {
        getPasswords();
    }, []);
      
  const getPasswords = async () => {
      let req = await fetch("http://localhost:4000/");
      let passwords = await req.json();
      setPasswords(passwords);
  };
   
  const togglePassword=()=>{
        setShowPassword(!showPassword);
  }

  const handleValue = async (e) => {
  e.preventDefault();
  if (form.password.trim() === "") {
    alert("Password field cannot be empty!");
    return;
  }

  if (editIndex === null) {
    // POST new password
    await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  } else {
    // UPDATE existing password
    await fetch(`http://localhost:4000/${passwords[editIndex]._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditIndex(null);
  }

  setForm({ URL: "", username: "", password: "" });
  getPasswords(); // refresh list
};


    const copyValue=(text)=>{
       navigator.clipboard.writeText(text);
    }
   
    const handleEdit = (index) => {
  setForm(passwords[index]);
  setEditIndex(index);
};


const handleDelete = async (index) => {
  await fetch(`http://localhost:4000/${passwords[index]._id}`, {
    method: "DELETE",
  });
  getPasswords();
};



    return (
        <>
        <div className="mx-auto py-10 px-10 max-w-4xl">
            <h1 className="text-4xl text-center font-bold">
                <span className="text-green-700">&lt;</span>
                Pass
                <span className="text-green-700">OP/&gt;</span>
            </h1>
            <p className="text-green-700 text-lg text-center">Your own Password Manager</p>
            <form onSubmit={handleValue}>
                <div className="flex flex-col p-4 text-black text-center gap-8 items-center">
                    <input className="rounded-full border border-green-500 w-full p-2 py-1" placeholder="Enter website URL" type="text" name="URL" id="URL" value={form.URL} onChange={(e)=> setForm({...form, [e.target.name]:e.target.value})}/>
                    <div className="flex gap-8 w-full justify-between">
                        <input className="rounded-full border border-green-500 w-full p-2 py-1" placeholder="Enter Username" type="text" name="username" id="username" value={form.username} onChange={(e)=> setForm({...form, [e.target.name]:e.target.value})}/>
                        <div className="relative" >
                            <input className="rounded-full border  pr-6 pl-2  border-green-500 w-full py-1" placeholder="Enter Password" type={showPassword? "text" : "password"} name="password" id="password" value={form.password} onChange={(e)=> setForm({...form, [e.target.name]:e.target.value})}/>
                                <span className="absolute right-0 p-2 cursor-pointer" onClick={togglePassword}><i className={`fa-solid ${showPassword ? "fa-eye-slash":"fa-eye"}`}></i></span>
                        </div>
                    </div>
                 <button
  type="submit"
  className="flex items-center border-2 border-green-900 bg-green-600 hover:bg-green-500 rounded-full py-2 px-2 w-fit gap-2"
>
  <i className="fa-solid fa-plus"></i> {editIndex === null ? "Add Password" : "Update Password"}
</button>

                </div>
            </form>

            <div className="passwords">
  <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

  {passwords.length === 0 ? (
    <div>No passwords to show</div>
  ) : (
    <table className="table-auto w-full text-center">
      <thead className="bg-green-800 text-white">
        <tr>
          <th>URL</th>
          <th>Username</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="bg-green-100">
        {passwords.map((item, index) => (
          <tr key={index} className="h-10">
            <td className="w-50 border border-green-700 cursor-pointer text-blue-500 "><a className="underline" href={item.URL} target="_blank">{item.URL}</a>
            <button onClick={()=>copyValue(item.URL)}  className="hover:text-slate-400">&nbsp;
                <i class="fa-solid fa-copy"></i>
            </button></td>
            <td className="w-32 border border-green-700">{item.username}
                 <button  onClick={()=>copyValue(item.username)}  className="hover:text-slate-400">&nbsp;
                <i class="fa-solid fa-copy"></i>
            </button></td>
            <td className="w-32 border border-green-700">{item.password}
                 <button  onClick={()=>copyValue(item.password)} className="hover:text-slate-400">&nbsp;
                <i class="fa-solid fa-copy"></i>
            </button></td>
            <td className="w-32 border border-green-700">
              <span>
                <button onClick={()=>handleEdit(index)} className="text-black-600 mr-2"><i class="fa-regular fa-pen-to-square"></i></button>
                <button onClick={()=>handleDelete(index)} className="text-black-600"><i class="fa-solid fa-trash"></i></button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

        </div>
       
        </>
    
    )
}
export default Manager;

