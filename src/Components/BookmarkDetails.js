import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function BookmarkDetails() {
  const URL = process.env.REACT_APP_API_URL;
  const [bookmark, setBookmark] = useState([]);
  const navigate = useNavigate();
  let { index } = useParams();

  // GET request to /bookmarks/:index
  // use setBookmark to change our current bookmark
  // to the data we get back
  useEffect(() => {
    axios.get(`${URL}/bookmarks/${index}`)
      .then((response) => {
        setBookmark(response.data)
    })
    .catch((e) => console.log('catch', e))
  }, []);

  // make a delete request to /bookmarks/:index
  // redirect them to /bookmarks
  const handleDelete = (event) => {
    event.preventDefault();
    axios.delete(`${URL}/bookmarks/${index}`)
    .then(() => {navigate(`/bookmarks`)})
  };

  return (
    <article>
      <h3>
        {bookmark.isFavorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <p>{bookmark.description}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/bookmarks/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
