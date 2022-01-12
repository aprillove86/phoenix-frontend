import { useState} from 'react'


function Show(props) {
	const id = props.match.params.id;
	const person = props.people.find(p => p._id === id); //p is single person
	
	const[editForm, setEditForm] = useState(person);

	const handleChange =(event) => {
		setEditForm({
			...editForm,
			[event.target.name]: event.target.value
		})
	}

	//handleSubmit will submit our new user for creation
	const handleSubmit = (event) => {
		event.preventDefault();
		props.updatePeople(editForm, id);
		props.history.push('/')
	}

	const handleClick = () => {
		props.deletePeople(id);
		props.history.push('/');
	}
	
	return (
		<div className="person">
			<h1>{person.name}</h1>
			<h2>{person.title}</h2>
			{
				person.image && <img src={person.image} alt={person.name} />
			}
			<button id="delete" onClick={handleClick}>
				DELETE
				</button>
			<form onSubmit={handleSubmit}>
				<input  type="text" name="Name" 
				placeholder="name" value={editForm.name}
				onChange={handleChange} 
				/>
				<br />
				<input  type="text" name="image" 
				placeholder="ImageURL" value={editForm.image}
				onChange={handleChange} 
				/>
				<br />
				<input  type="text" name="title" 
				placeholder="Title" value={editForm.title}
				onChange={handleChange} 
				/>
				<br />
				<input type="submit" value="Update Person" />
			</form>	
		</div>
	)
}

export default Show;
