import { Navigate, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
      const res = await api.get("/api/post/view-applied/");
      setPosts(res.data);
        } catch (error) {
            
        }
    };
      fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row mb-3">
        <h1 className="section-header col-6">Dashboard</h1>
        <div className="col d-flex justify-content-end align-items-end me-5">
          <button
            className="btn btn-warning text-secondary btn-lg plan-a-trip"
            onClick={() => navigate("/plan-a-trip")}
          >
            Plan a trip!
          </button>
        </div>
      </div>

      <div className="container">
        {posts.length !== 0 &&
          posts.map((post: any) => (
            <div className="row mb-3">
              <Card title={post.title} content={post.content} />
            </div>
          ))}
      </div>
    </div>
  );
}
