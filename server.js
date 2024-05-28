import 'dotenv/config';
import app from './app/app.js';
import { connect } from 'mongoose';
import 'colors';

const { DB_HOST, PORT } = process.env;

try {
	await connect(DB_HOST)
	console.log('Database connection successful'.bgGreen.italic.bold);
	app.listen(PORT, () => {
		console.log(
			`Server running. Use our API on port: ${PORT}`.bgGreen.italic.bold
		);
	});
} catch (err) {
	console.log(err.message.bgRed.italic.bold, err.stack);
	process.exit(1);
}
