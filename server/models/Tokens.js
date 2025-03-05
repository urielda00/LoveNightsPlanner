// Tokens for reset pass
import mongoose from 'mongoose';

const TokensSchema = new mongoose.Schema(
	{
		token: { type: String, require: true },
	},
	{ timestamps: true }
);

const Tokens = mongoose.model('Tokens', TokensSchema);
export default Tokens;
