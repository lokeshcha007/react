import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../slices/ApiSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading......</p>;
  if (error) return <p>{error}...</p>;

  return (
    <div>
      <h2>posts</h2>
      <ul>
        {items.map((item) => {
          return (
            <>
              <li>{console.log(item)}</li>
              <li>{item.title}</li>
              <li>{item.body}</li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
