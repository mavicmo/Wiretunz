import React, {useState} from 'react'
import './AddSong.css'
import axios from 'axios';

function AddSong() {
  const [equals, setEquals] = useState({

      name: '',
      artist: '',
      song: '',
      image:''
    });
    const [submitted, setSubmitted] = useState(true);
    const [valid, setValid] = useState(false);   


  const handleTitleInputChange =(event) => {
    setEquals({...equals, name: event.target.value})
  }
      
  const handleArtistInputChange =(event) => {
    setEquals({...equals, artist: event.target.value})    
  }

  const handleSongInputChange =(event) => {
    setEquals({...equals, song: event.target.value})
  }

  const handleImageInputChange =(event) => {
    setEquals({...equals, image: event.target.value})
  }
  
  
  
  const handleSubmit = (event) => { 
    event.preventDefault() 
    if(equals.name && equals.artist && equals.song && equals.image) {
      setValid(true);
      axios.post ('http://localhost:3001/api/songs/add', {body:equals}).then(()=> 
      console.log('uploaded'))

    }
    setSubmitted(true);
    
  }
  return (
    <div className="form-container">
      <form className='Add Song' onSubmit={handleSubmit}>
      <h1> Add New Song</h1>

      {submitted && valid ? <div className='Your Song Has Been Added!'></div> :null }


        <input
        onChange={handleTitleInputChange}
        value={equals.name}
        className= 'form-field'
        placeholder='Name'
        name='title' />
       

        <input
        onChange={handleArtistInputChange}
        value={equals.artist}
        className= 'form-field'
        placeholder='Artist'
        name='artist' />
       

        <input
        onChange={handleSongInputChange}
        value={equals.song}
        className= 'form-field'
        placeholder='Song'
        name='' />


        <input
        onChange={handleImageInputChange}
        value={equals.image}
        className= 'form-field'
        placeholder='Image'
        name='' />
        
           {/* {submitted && !equals.email ?<span>Enter Email Name</span> :null} */}
         <button
         className='form-field'
         type='submit'>Add Song</button>
         </form>
  </div>
  )};


export default AddSong;