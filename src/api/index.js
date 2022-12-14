import axios from 'axios'

export const fetchList = async (listId) => {
    try {
        let res = await axios.get(`http://localhost:5500/api/item/${listId}`)
        console.log(res.data)
    } catch (error) {

    }
}