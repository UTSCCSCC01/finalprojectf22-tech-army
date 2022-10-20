import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
  
const Events = () => {

  const navigate = useNavigate();

  const handlePost =() => {
    navigate('/events/postevent');
}

  const [Events, setevents] = useState([])
  const { Meta } = Card;

  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  
  // only when the PostSize is 8 then we show the load more button
  const [PostSize, setPostSize] = useState()



  useEffect( () => {

    const body = {
      skip: Skip,
      limit : Limit

    }

    axios.post('http://localhost:8000/api/events',body).then (response =>{
      if (response.data.success) {

            setevents([...response.data.event])     //check if the name is called Events

            setPostSize(response.data.PostSize)
            console.log()
      } else{
          alert('cant fetch data from db')
      }
    })

  }, [])




  const Loadfunc = () =>{
      let skip = Skip + Limit;

      const body = {
            skip: skip,
            limit : Limit

      }

          // need to update 
          axios.post('http://localhost:8000/api/events',body).then (response =>{
      if (response.data.success) {

            setevents([...response.data.event])     //check if the name is called Events

            setPostSize(response.data.PostSize)
            console.log()
      } else{
          alert('cant fetch data from db')
      }
    })


    setSkip(skip)

  }




  return (
    <><Navbar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'Left',
        alignItems: 'Left',
        height: '100vh',
        paddingLeft: "300px"
      }}
    >
      <h1>Welcome to Events Page!</h1>
    </div></>
  );
};
  
export default Events;