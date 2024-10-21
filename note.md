import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


const initialContacts = [
    { id: 1, name: 'Tâche 1', telephone: '773456785' },
    { id: 2, name: 'Tâche 2', telephone: '772345678' },
    { id: 3, name: 'Tâche 3', telephone: '773456785' }
];

function App() {

    //
    const [contacts, setContact] = useState(initialContacts);
    const [form, setForm] = useState({name:'',telephone:''});
   

   const handleSubmit = (e) => {
       e.preventDefault();
        if(form.id) {
            const updateContact = contacts.map((val) => (val.id === form.id) ? form : val)
            setContact(updateContact);  
        } else {
        setContact([...contacts, {id:Date.now(),...form}])
        }
       
   }
   const handleDelete =(id)=>{
        const rep=confirm(Are you sure you want to delete ${id}?);
        if(rep)
       setContact([...contacts.filter(contact => contact.id !== id)]);
   }

   const handleEdit = (contact) => {
       // const contactFind = contacts.find(contact => contact.id === id);
       console.log(contact);
       setForm({...contact});
      
       // setForm((c) => {
       //     c = Object.assign(c, contact);
       //    return c;
       //     // return c;
       // });
       // setForm(contact);
       // console.log(form);
   }

    return (
        <div>
        <form  onSubmit={handleSubmit}>
            <div>
                <label>name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e)=>setForm({...form, [e.target.name]: e.target.value})}
                    required
                />
            </div>

            <div>
                <label>Téléphone:</label>
                <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={(e)=>setForm({...form, [e.target.name]: e.target.value})}
                />
            </div>
            <button type="submit">
                {form.id ? 'Update' : 'Save'}
            </button>
        </form>

    <table>
        {contacts.map((contact) => (
            <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.telephone}</td>
                <td>
                    <button type="button" onClick={()=>{handleDelete(contact.id)}}>Delete</button>
                    <button type="button" onClick={() => {handleEdit(contact)}} >Edit</button>
                </td>

            </tr>


        ))}
    </table>
        </div>
)


}

export default App