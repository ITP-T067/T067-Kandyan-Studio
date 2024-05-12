const loyaltyModel=require('../../models/CustomerManagement/loyalty.modle');

//create data
const loyalty_customer = async(req,res, next) => {
    console.log(req.body)
    const data = new Customer(req.body)

    try{
        await data.save() 
        if(res.status(201)){
            res.send({success : true, message : "Customer saved successfully", data: data})
        }
    }catch(error){
        next(error);
    }

}


module.exports = {loyalty_customer};