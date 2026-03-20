

// import { useState, useEffect } from "react";
// import { supabase } from "../lib/supabase";
// import "./admin-owners.css";

// export default function AdminOwners(){

// const [owners,setOwners] = useState([])
// const [properties,setProperties] = useState([])
// const [editingOwner,setEditingOwner] = useState(null)
// const [assignedProperties,setAssignedProperties] = useState([])
// const [selectedProperty,setSelectedProperty] = useState("")

// const [form,setForm] = useState({
// name:"",
// email:"",
// password:""
// })

// useEffect(()=>{
// fetchOwners()
// fetchProperties()
// },[])

// function handleChange(e){
// setForm({...form,[e.target.name]:e.target.value})
// }


// /* FETCH ONLY AVAILABLE PROPERTIES */

// async function fetchProperties(){

// const { data } = await supabase
// .from("properties")
// .select("*")
// .not(
// "id",
// "in",
// `(
// select property_id from owner_properties
// )`
// )
// .order("title")

// if(data) setProperties(data)

// }


// /* FETCH OWNERS */

// async function fetchOwners(){

// const { data } = await supabase
// .from("owners")
// .select(`
// id,
// name,
// email,
// owner_properties(
// id,
// property_id,
// properties(
// id,
// title,
// imageUrl
// )
// )
// `)

// setOwners(data || [])

// }


// /* CREATE OWNER */

// async function createOwner(e){

// e.preventDefault()

// try{

// const { data,error } = await supabase.auth.signUp({
// email:form.email,
// password:form.password
// })

// if(error) throw error

// const userId = data.user.id

// await supabase.from("profiles").insert({
// id:userId,
// email:form.email,
// role:"owner"
// })

// await supabase.from("owners").insert({
// user_id:userId,
// name:form.name,
// email:form.email
// })

// alert("Owner created")

// setForm({
// name:"",
// email:"",
// password:""
// })

// fetchOwners()

// }catch(err){
// alert(err.message)
// }

// }


// /* OPEN PROPERTY PANEL */

// async function openAssignPanel(owner){

// setEditingOwner(owner)

// const { data } = await supabase
// .from("owner_properties")
// .select(`
// id,
// property_id,
// properties(
// id,
// title,
// imageUrl
// )
// `)
// .eq("owner_id",owner.id)

// setAssignedProperties(data || [])

// }


// /* ASSIGN PROPERTY */

// async function assignProperty(){

// if(!selectedProperty) return

// await supabase
// .from("owner_properties")
// .insert({
// owner_id:editingOwner.id,
// property_id:selectedProperty
// })

// setSelectedProperty("")

// await fetchProperties()
// await openAssignPanel(editingOwner)

// }


// /* REMOVE PROPERTY */

// async function removeProperty(id){

// await supabase
// .from("owner_properties")
// .delete()
// .eq("id",id)

// await fetchProperties()
// openAssignPanel(editingOwner)

// }



// return(

// <div className="admin-owners">

// <h2>Create Owner</h2>

// <form onSubmit={createOwner} className="create-owner-form">

// <input
// name="name"
// placeholder="Owner Name"
// value={form.name}
// onChange={handleChange}
// required
// />

// <input
// name="email"
// placeholder="Owner Email"
// value={form.email}
// onChange={handleChange}
// required
// />

// <input
// type="password"
// name="password"
// placeholder="Password"
// value={form.password}
// onChange={handleChange}
// required
// />

// <button>Create Owner</button>

// </form>


// <h2 className="owner-list-title">Owners</h2>

// <table className="owner-table">

// <thead>
// <tr>
// <th>Name</th>
// <th>Email</th>
// <th>Properties</th>
// <th>Actions</th>
// </tr>
// </thead>

// <tbody>

// {owners.map(owner=>{

// const props = owner.owner_properties || []

// return(

// <tr key={owner.id}>

// <td>{owner.name}</td>

// <td>{owner.email}</td>

// <td>
// {props.length>0
// ? props.map(p=>p.properties.title).join(", ")
// :"None"}
// </td>

// <td>

// <button
// className="manage-btn"
// onClick={()=>openAssignPanel(owner)}
// >
// Manage Properties
// </button>

// </td>

// </tr>

// )

// })}

// </tbody>

// </table>


// {/* MODAL */}

// {editingOwner && (

// <div className="assign-modal">

// <div className="assign-box">

// <button
// className="modal-close"
// onClick={()=>setEditingOwner(null)}
// >
// ✕
// </button>

// <h3>Manage Properties for {editingOwner.name}</h3>


// {/* ASSIGNED PROPERTIES */}

// <div className="assigned-section">

// {assignedProperties.length===0 && (
// <p>No properties assigned</p>
// )}

// {assignedProperties.map(p=>(

// <div key={p.id} className="property-card">

// <img
// src={p.properties.imageUrl || "/property-placeholder.jpg"}
// alt=""
// />

// <div className="property-text">
// <h5>{p.properties.title}</h5>
// </div>

// <button
// className="remove-btn"
// onClick={()=>removeProperty(p.id)}
// >
// Remove
// </button>

// </div>

// ))}

// </div>


// {/* ASSIGN PROPERTY */}

// <div className="assign-property-section">

// <h4>Assign New Property</h4>

// <div className="assign-controls">

// <select
// value={selectedProperty}
// onChange={(e)=>setSelectedProperty(e.target.value)}
// >

// <option value="">Select Property</option>

// {properties.map(p=>(
// <option key={p.id} value={p.id}>
// {p.title}
// </option>
// ))}

// </select>

// <button
// className="assign-btn"
// onClick={assignProperty}
// >
// Assign
// </button>

// </div>

// </div>

// </div>

// </div>

// )}

// </div>

// )

// }

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import "./admin-owners.css";

export default function AdminOwners(){

  const [owners,setOwners] = useState([])
  const [properties,setProperties] = useState([])
  const [editingOwner,setEditingOwner] = useState(null)
  const [assignedProperties,setAssignedProperties] = useState([])
  const [selectedProperty,setSelectedProperty] = useState("")

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  })

  useEffect(()=>{
    fetchOwners()
  },[])

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }

  /* FETCH OWNERS */

  async function fetchOwners(){

    const { data } = await supabase
    .from("owners")
    .select(`
      id,
      name,
      email,
      owner_properties(
        id,
        property_id,
        properties(
          id,
          title,
          imageUrl
        )
      )
    `)

    setOwners(data || [])
  }

  /* CREATE OWNER */

  async function createOwner(e){

    e.preventDefault()

    try{

      const { data,error } = await supabase.auth.signUp({
        email:form.email,
        password:form.password
      })

      if(error) throw error

      const userId = data.user.id

      await supabase.from("profiles").insert({
        id:userId,
        email:form.email,
        role:"owner"
      })

      await supabase.from("owners").insert({
        user_id:userId,
        name:form.name,
        email:form.email
      })

      alert("Owner created")

      setForm({
        name:"",
        email:"",
        password:""
      })

      fetchOwners()

    }catch(err){
      alert(err.message)
    }

  }

  /* OPEN PROPERTY PANEL (FIXED LOGIC HERE) */

  async function openAssignPanel(owner){

    setEditingOwner(owner)

    // 1. Get assigned properties
    const { data: assigned } = await supabase
      .from("owner_properties")
      .select(`
        id,
        property_id,
        properties(
          id,
          title,
          imageUrl
        )
      `)
      .eq("owner_id",owner.id)

    setAssignedProperties(assigned || [])

    // 2. Extract assigned IDs
    const assignedIds = (assigned || []).map(p => p.property_id)

    // 3. Fetch available properties (NOT assigned to this owner)
    let query = supabase
      .from("properties")
      .select("*")
      .order("title")

    if (assignedIds.length > 0) {
      query = query.not("id", "in", `(${assignedIds.join(",")})`)
    }

    const { data: available } = await query

    setProperties(available || [])
  }

  /* ASSIGN PROPERTY */

  async function assignProperty(){

    if(!selectedProperty) return

    await supabase
    .from("owner_properties")
    .insert({
      owner_id:editingOwner.id,
      property_id:selectedProperty
    })

    setSelectedProperty("")

    await openAssignPanel(editingOwner)
  }

  /* REMOVE PROPERTY */

  async function removeProperty(id){

    await supabase
      .from("owner_properties")
      .delete()
      .eq("id",id)

    openAssignPanel(editingOwner)
  }

  return(

    <div className="admin-owners">

      <h2>Create Owner</h2>

      <form onSubmit={createOwner} className="create-owner-form">

        <input
          name="name"
          placeholder="Owner Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Owner Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button>Create Owner</button>

      </form>

      <h2 className="owner-list-title">Owners</h2>

      <table className="owner-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Properties</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {owners.map(owner=>{

            const props = owner.owner_properties || []

            return(

              <tr key={owner.id}>

                <td>{owner.name}</td>
                <td>{owner.email}</td>

                <td>
                  {props.length>0
                    ? props.map(p=>p.properties.title).join(", ")
                    :"None"}
                </td>

                <td>

                  <button
                    className="manage-btn"
                    onClick={()=>openAssignPanel(owner)}
                  >
                    Manage Properties
                  </button>

                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

      {/* MODAL */}

      {editingOwner && (

        <div className="assign-modal">

          <div className="assign-box">

            <button
              className="modal-close"
              onClick={()=>setEditingOwner(null)}
            >
              ✕
            </button>

            <h3>Manage Properties for {editingOwner.name}</h3>

            {/* ASSIGNED PROPERTIES */}

            <div className="assigned-section">

              {assignedProperties.length===0 && (
                <p>No properties assigned</p>
              )}

              {assignedProperties.map(p=>(

                <div key={p.id} className="property-card">

                  <img
                    src={p.properties.imageUrl || "/property-placeholder.jpg"}
                    alt=""
                  />

                  <div className="property-text">
                    <h5>{p.properties.title}</h5>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={()=>removeProperty(p.id)}
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* ASSIGN PROPERTY */}

            <div className="assign-property-section">

              <h4>Assign New Property</h4>

              <div className="assign-controls">

                <select
                  value={selectedProperty}
                  onChange={(e)=>setSelectedProperty(e.target.value)}
                >
                  <option value="">Select Property</option>

                  {properties.map(p=>(
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}

                </select>

                <button
                  className="assign-btn"
                  onClick={assignProperty}
                >
                  Assign
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}