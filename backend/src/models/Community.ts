import { Ref, prop, getModelForClass } from '@typegoose/typegoose';
import { UserModel } from './User'

class Community {
	@prop({ required: true })
	public name?: string;

	@prop()
	public logo?: string;

	@prop({ default: 0 })
	public totalMembers?: number;

	@prop({ ref: () => UserModel, default: [] })
	public users?: Ref<typeof UserModel>[];
}

export const CommunityModel = getModelForClass(Community);
