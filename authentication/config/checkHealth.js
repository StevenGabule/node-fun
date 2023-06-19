const mongoose = require('mongoose');

module.exports.checkHealth = async function() {
	const time = Date.now();
	const {db} = mongoose.connection;
	const collection = db.collection('healthcheck')

	const query = {_id: 'heartbeat'}
	const value = {time}
	await collection.update(query, value, { upsert: true})

	const found = await collection.findOne({time: {$gte: time}})
	if(!found) throw new Error('DB HealthCheck Failed.')

	return !!found;
}