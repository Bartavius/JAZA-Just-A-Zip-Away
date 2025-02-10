import { FaCarSide } from "react-icons/fa6";
import { FaTruckMoving } from "react-icons/fa6";
export default function HomePage() {
    return (
        <div>
            <section className="container">
                <h1 className="ms-5 mt-3 section-header d-inline-block me-4">J.A.Z.A.</h1>
                <FaCarSide className="fs-1 mb-3"/>
                <p className="w-50">Just A Zip Away from a paid and sponsored road trip—all at the expense of a company relocating their vehicles.</p>
            </section>
            <FaTruckMoving className="truck-kun"/>
        </div>
    )
}