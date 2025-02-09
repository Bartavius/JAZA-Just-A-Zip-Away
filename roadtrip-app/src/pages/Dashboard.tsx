import { Navigate, useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="row mb-3">
                <h1 className="section-header col-6">Dashboard</h1>
                <div className="col d-flex justify-content-end align-items-end me-5">
                <button className="btn btn-warning text-secondary btn-lg plan-a-trip" onClick={() => navigate("/plan-a-trip")}>Plan a trip!</button></div>
            </div>
            
            <div className="container">
                <Card title="Hello" content="whaaaat"/>
            </div>
            
            <h1>Dashboard</h1>
            <h1>Dashboard</h1>
            <h1>Dashboard</h1>
            <h1>Dashboard</h1>

            <h1>Dashboard</h1>
            <h1>Dashboard</h1>
            <h1>Dashboard</h1>

            <h1>Dashboard</h1>
            <h1>Dashboard</h1>
            <h1>Dashboard</h1>

            <h1>Dashboard</h1>
            <h1>Dashboard</h1>


            <h1>Dashboard</h1>
            <h1>Dashboard</h1>

            <h1>Dashboard</h1>
            <h1>Dashboard</h1>

            <h1>Dashboard</h1>
            <h1>Dashboard</h1>

            <h1>Dashboard</h1>
            
        </div>
    )
}