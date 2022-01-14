import axios from "axios";
import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";

function Bookmarks() {
  // const [count, setCount] = useState(0)
  const URL = process.env.REACT_APP_API_URL;
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/bookmarks`)
    .then((response) => {
      console.log(response)
      console.log(response.data)
      setBookmarks(response.data)
    })
    .catch((e) => console.log('catch', e))
  }, [])

  return (
    <div className="Bookmarks">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark, index) => {
              return <Bookmark key={index} bookmark={bookmark} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Bookmarks;
