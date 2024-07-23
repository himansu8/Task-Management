
let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/task`, { authorization: `Bearer ${token}` })



const token = JSON.parse(localStorage.getItem('token')).token;
{
    headers: {
        authorization: `bearer ${token}`
    }
}