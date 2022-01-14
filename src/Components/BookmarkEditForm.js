import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function BookmarkEditForm() {
  // base URL
  const URL = process.env.REACT_APP_API_URL;
  // the index from React Router
  let { index } = useParams();
  // the navigate function from React Router
  const navigate = useNavigate()

  const [bookmark, setBookmark] = useState({
    name: "",
    url: "",
    category: "",
    description: "",
    isFavorite: false,
  });

  // make an API call to our back end 
  // using the index from Router
  // call setBookmark with the bookmark the call returns
  useEffect(() => {
    axios.get(`${URL}/bookmarks/${index}`)
      .then((response) => {
        setBookmark(response.data)
    })
    .catch((e) => console.log('catch', e))
  }, []);

  const handleTextChange = (event) => {
    setBookmark({ ...bookmark, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setBookmark({ ...bookmark, isFavorite: !bookmark.isFavorite });
  };

  // what SHOULD we do when the user clicks the submit button
  // - make a put request
  // - render a specific component
  // when we update one resource,
  // we should get to that resource's detail page
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${URL}/bookmarks/${index}`, bookmark)
    .then(() => { navigate(`/bookmarks/${index}`)
    })
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={bookmark.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          type="text"
          pattern="http[s]*://.+"
          required
          value={bookmark.url}
          placeholder="http://"
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          name="category"
          value={bookmark.category}
          placeholder="educational, inspirational, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="isFavorite">Favorite:</label>
        <input
          id="isFavorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={bookmark.isFavorite}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bookmark.description}
          onChange={handleTextChange}
          placeholder="Describe why you bookmarked this site"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default BookmarkEditForm;
