import React, { useState, useEffect } from 'react'

import ItemService from './services/ItemService'
import Item from './components/Item'


const getRandomInt = (max => () => Math.floor(Math.random() * Math.floor(max)))(10000)  

const genBlankItem = () => {
	return {
		id: getRandomInt(),
		reference: "",
		description: "",
		currency: "",
		vr_unit: 0,
		discount: 0
	}
}

const removeFact = prop => obj => Object.keys(obj).filter(k => k !== prop).reduce((newObj, key) => {
	newObj[key] = obj[key]
	return newObj
}, {})

const removeId = removeFact('id')

const cleanObj = obj => Object.keys(obj).filter(k => !!obj[k]).reduce((newObj, key) => {
	newObj[key] = obj[key]
	return newObj
}, {})

const App = () => {

	const [item, modifyItem] = useState(genBlankItem())
	const [items, setItems] = useState([])

	const handleChange = e => {
		modifyItem({...item, [e.target.name]: e.target.value})
	}

	const handleOnSubmit = e => {

		e.preventDefault()
		let updateItem = items.find(i => i.reference === item.reference)

		if (updateItem) {
			ItemService
				.updateItem(cleanObj(removeId(item)), updateItem.id)
				.then(item => setItems([...items.map(i => i.id === item.id ? item : i)]))
		} else {
			ItemService
				.addItem(item)
				.then(item => setItems(items.concat(item))
			)
			modifyItem(genBlankItem())
		}
	}

	useEffect(() => {
		ItemService
			.getAll()
			.then(items => setItems(items))
	}, [])

  	return (
		<React.Fragment>		
			<form onSubmit={handleOnSubmit}>
				<div>
					<label>Reference</label>
					<input 
						type="text"
						name="reference"
						value={item.reference}
						onChange={handleChange} />
				</div>
				<div>
					<label>Description</label>
					<input 
						type="text"
						name="description"
						value={item.description}
						onChange={handleChange} />
				</div>
				<div>
					<label>Currency</label>
					<select 
						name="currency" 
						value={item.currency}
						onChange={handleChange}>
						<option value="COP">COP</option>
						<option value="US">US</option>
						<option value="EUR">EUR</option>
					</select>
				</div>
				<div>
					<label>Price</label>
					<input 
						type="number"
						name="vr_unit"
						min="0"
						step="1"
						value={item.vr_unit}
						onChange={handleChange} />
				</div>
				<div>
					<label>Discount</label>
					<input 
						type="number"
						name="discount"
						min="0"
						step="1"
						value={item.discount}
						onChange={handleChange} />
				</div>
				<button type="submit">Save</button>
			</form>
			<h3>Items</h3>
			{ items.map(i => <Item key={i.id} {...i} />) }
		</React.Fragment>
  	)
}

export default App;
