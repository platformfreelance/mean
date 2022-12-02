var mongoose=require('mongoose');

var commandeSchema=mongoose.Schema({
    gig: {type: mongoose.Schema.Types.ObjectId, ref: 'Gig'},
    freelancer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    currentStatus: {type: String, default: 'in progress'}, //done, in progress, cancelled
    createdAt: {type: Date, default: Date.now},
});

var Commande=module.exports=mongoose.model('Commande',commandeSchema);