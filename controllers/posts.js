import postMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {

    try {
        const postMessages = await postMessage.find();

        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json( {message: error});  
    }
}

export const getPostDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const postMessage = await postMessage.find(p => id === p._id);

        console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createPost = async (req, res) => {
    const { title, parodie, tags, artists, group, language, category, titleImage, pages } = req.body;

    const newPostMessage = new postMessage({ title, parodie, tags, artists, group, language, category, titleImage, pages });


    try {
        await newPostMessage.save();    
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json( { message: error });
    }
}