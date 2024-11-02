import {Schema,model} from 'mongoose';

const client_schema=new Schema({
    username:{type :String, required:true , unique:true,min:4},
    password:{type :String,required:true}
});

const Client_model=model('Client',client_schema);

export default Client_model;