import {
    DocumentType,
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

@index({ email: 1 })

@pre<User>('save', async function () {
    // Hash password if the password is new or was updated
    if (!this.isModified('password')) return;

    // Hash password with costFactor of 12
    this.password = await bcrypt.hash(this.password, 12);
})

@modelOptions({
    schemaOptions: {
        id: true,
        versionKey: false,
        timestamps: true,
        autoIndex: true,
        toJSON: {
            virtuals: true,
            transform: (_, ret) => {
                // TODO: delete all fields not required on the frontend
                delete ret._id;
                delete ret.password;
                delete ret.salt;
                delete ret.updatedAt;
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
                delete ret.password;
                delete ret.salt;
                delete ret.updatedAt;
                return ret;
            },
        },
    },
})

// Export the User class to be used as TypeScript type
export class User {
    @prop()
    name: string;

    @prop({ unique: true, required: true })
    email: string;

    @prop({ required: true, minlength: 8, maxLength: 32, select: false })
    password: string;

    @prop({ default: 'user' })
    role: string;

    // Instance method to check if passwords match
    async comparePasswords(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;

