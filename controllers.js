export const searchUser  = async (request, respose) => {
    try{
        if (!request.query.query){
            return response.status(200).json([]);
        }
        const users = await User.find({staffname: request.query.query}).exec();
        const roomnumber= await User.find({roomnumber: request.query.query}).exec();

        respose.status(200).json([...users, ...roomnumber]);
    
    } catch(error){
        respose.status(404).json({messeage: error.message })
    }
}