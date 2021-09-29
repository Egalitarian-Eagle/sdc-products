import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FormIstics from './FormIstics';
import StarRatingReview from './StarRatingReview';

const Wrapper = styled.div`
  label {
    font-weight: bold;
  }

  span {
    font-weight: bold;
  }

`

const Recommend = styled.div`
`

const Star = styled.div`
`

const Body = styled.div`
`

export default function NewReviewForm({id}) {
  const [istics, setIstics] = useState(null);

  //form inputs
  const [rating, setRating] = useState(5);
  const [recommended, setRecommended] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [chars, setChars] = useState({});
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    axios.get(`/reviews/meta?product_id=${id}`)
      .then(res => setIstics(res.data.characteristics))
      .catch(err => console.log(err));
  }, [])

  function onLoad(e) {
    setImages([]);
    const thumbnails = document.getElementById('thumbnails');
    thumbnails.innerHTML = '';
    let array = [];
    Array.from(e.target.files).forEach((file, idx) => {
      const newImg = document.createElement('img');
      const src = URL.createObjectURL(file);
      newImg.src = src;
      newImg.width = "50";
      thumbnails.appendChild(newImg);
      array.push(src);
    })
    setImages(array)
  }

  function onIsticChange(e) {
    const newObj = {[e.target.id] : Number(e.target.value)};
    setChars(chars => ({...chars, ...newObj}))
  }

  function handleSubmit(e) {
    setSubmitted(true)
    e.preventDefault();
    const params = {
      product_id: id,
      rating: rating,
      summary: title,
      body: body,
      recommend: recommended,
      name: username,
      email: email,
      photos: images,
      characteristics: chars
    }
    axios.post('/reviews', params)
      .then(res => console.log('response from review post', res))
      .catch(err => console.log('error from review post', err))
  }

  return (submitted === false &&
    <Wrapper>
      <h2>Write your review</h2>
      <form onSubmit={handleSubmit}>
        <div style={{paddingBottom: '20px'}}>
          <Recommend >
            <span>Do you recommend this product? </span>
            <label htmlFor="yes"> Yes</label>
            <input onChange={() => setRecommended(true)} id="yes" name="recommend" type="radio" defaultChecked />
            <label htmlFor="no"> No</label>
            <input onChange={() => setRecommended(false)}id="no" name="recommend" type="radio" />
          </Recommend>
          <Star >
            <StarRatingReview onChange={setRating}/>
          </Star>
        </div>
        <div style={{paddingBottom: '20px'}}>
          {istics
          ? <FormIstics istics={istics} onChange={onIsticChange} />
          : null}
        </div>
        <div style={{paddingBottom: '20px'}}>
          <div>
            <label style={{display: 'block'}} htmlFor="title">Title: </label>
            <input onChange={(e) => setTitle(e.target.value)} style={{display: 'block'}} placeholder="Example: Best purchase ever!" type="text" id="title" size="32" required />
          </div>
          <Body>
            <label style={{display: 'block'}} htmlFor="body">Review: </label>
            <textarea onChange={(e) => setBody(e.target.value)} style={{display: 'block'}} rows="5" cols="30" id="body" placeholder="Why did you like/dislike this product?" required />
          </Body>
          <label htmlFor="images">Images: </label>
          <input id="images" type="file" accept="image/*" multiple onChange={onLoad}/>
          <div id='thumbnails'>
            <img id="loaded"></img>
          </div>
        </div>
        <div style={{paddingBottom: '20px'}}>
          <div>
            <label htmlFor="username">Username: </label>
            <input onChange={(e) => setUsername(e.target.value)} id='username' type="text" placeholder='Example: jshzglr' required/>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input onChange={(e) => setEmail(e.target.value)}id='email' type="email" placeholder='Example: josh@gmail.com' required/>
          </div>
        </div>
        <div>
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </Wrapper>
  )

  return <h3>Submitted</h3>
}