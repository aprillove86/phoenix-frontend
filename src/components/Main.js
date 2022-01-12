import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
	const [people, setPeople] = useState([]);

	// const URL = "http://localhost:3001/people/"
	const URL = 'https://phoenix-api-app.herokuapp.com/people/';
	// retrieve all the people
	const getPeople = async () => {
		const response = await fetch(URL);
		const data = await response.json();
		console.log('getPeople - data', data);
		setPeople(data);
	};

	const createPeople = async (person) => {
		await fetch(URL, {
			method: 'POST',
			headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(person)
		});

        getPeople()
	};
const updatePeople = async (person, id) => {
	await fetch(URL + id, {
		method: "PUT", 
		headers: {
			"Content-Type": 'Application/json'
		},
		body: JSON.stringify(person)
	})
	getPeople();
}
const deletePeople = async (id) => {
	await fetch(URL + id, {
		method: 'DELETE'
	})
	getPeople();
}
	// run getPeople once when component is mounted
	useEffect(() => getPeople(), []);

	return (
		<main>
			<Switch>
				<Route exact path='/'>
					<Index people={people} createPeople={createPeople} />
				</Route>

				<Route path='/people/:id' render={(rp) => (
					<Show 
					{...rp} 
					updatePeople={updatePeople}
					deletePeople={deletePeople}
					people={people}
					/>
				)} />
			</Switch>
		</main>
	);
}

export default Main;
