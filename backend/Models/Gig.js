var mongoose=require('mongoose');

var gigSchema=mongoose.Schema({
    title:{type:String,required:true},
    technologies:{type:String,required:true},
    price:{type:String,required:true},
    description:{type:String,required:true},
    freelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, default: 'open'}, // open, closed
    createdAt: {type: Date, default: Date.now},
});

var Gig=module.exports=mongoose.model('Gig',gigSchema);
