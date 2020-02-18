import React, { useState, useEffect } from 'react'

import ItemService from './services/ItemService'
import Item from './components/Item'
import Notification from './components/Notification'

const genBlankItem = () => {
	return {
		reference: "",
		description: "",
		currency: "",
		vr_unit: 0,
		discount: 0
	}
}

const removeFalsyProps = obj => {
	return Object
			.keys(obj)
			.filter(k => !!obj[k])
			.reduce((newObj, k) => {
				newObj[k] = obj[k]
				return newObj
			}, {})
}

const App = () => {

	const [item, modifyItem] = useState(genBlankItem())
	const [items, setItems] = useState([])
	const [notification, setNotification] = useState({
		msg: '',
		classStyle: ''
	})

	const handleChange = e => {
		modifyItem({...item, [e.target.name]: e.target.value})
	}

	const handleOnSubmit = e => {

		e.preventDefault()
		let updateItem = items.find(i => i.reference === item.reference)

		if (updateItem) {
			ItemService
				.updateItem(removeFalsyProps(item), updateItem.id)
				.then(item => setItems([...items.map(i => i.id === item.id ? item : i)]))
				.then(() => { 
					setNotification({
						msg: 'Item added', 
						classStyle: 'success'
					})

					setTimeout(() => {
						setNotification({msg: '', classStyle: ''})
					}, 5000)
				})
				.catch(err => setNotification({
					msg: 'Error updating item',
					classStyle: 'error'
				}))
				.finally(() => modifyItem(genBlankItem()))
		} else {
			ItemService
				.addItem(item)
				.then(item => setItems(items.concat(item)))
				.then(() => { 
					setNotification({
						msg: 'Item added', 
						classStyle: 'success'
					})

					setTimeout(() => {
						setNotification({msg: '', classStyle: ''})
					}, 5000)
				})
				.finally(() => modifyItem(genBlankItem()))
		}
	}

	useEffect(() => {
		ItemService
			.getAll()
			.then(items => setItems(items))
	}, [])

  	return (
		<React.Fragment>
			<Notification msg={notification.msg} classStyle={notification.classStyle} />
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
