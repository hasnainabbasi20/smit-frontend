
import { Link } from "react-router-dom";
import "../../assets/saylani.png";
function HomePage() {
    return (
        <div className="bg-white">
            <header className="flex justify-between items-center p-4 bord
            er-b">
                <img src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png" alt="Saylani Welfare Logo" className="h-12"/>
                <nav className="space-x-4">
                 <Link to="/reception" className="text-gray-600 hover:text-gray-800">Reception</Link>
                  <Link to={'/departmentStaff'} className="text-gray-600 hover:text-gray-800">Department</Link>
                </nav>
                <div className="space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">DONATE NOW</button>
                    <Link to={'/admin'} className="bg-green-500 text-white px-4 py-2 rounded">Login Admin</Link>
                </div>
            </header>
            <main className="p-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to the <span className="text-green-500">Saylani</span> Welfare Non Governmental Organization in Pakistan
                </h1>
                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                    The largest NGO offering free <span className="text-blue-600">as</span>
                </h2>
                <p className="text-gray-600 mt-4">
                    Saylani Welfare is on the ground and already working with local communities to assess how best to support underprivileged families in more than 63 areas of day to day lives.
                </p>
                <button className="mt-6 px-6 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-100">
                    Explorer More <i className="fas fa-arrow-right ml-2"></i>
                </button>
                <div className="mt-8 flex space-x-4">
                    <img src="https://res.cloudinary.com/saylani-welfare/image/upload/v1646926708/website-images/static/38.png" alt="Volunteers distributing food" className="rounded-full"/>
                    
                </div>
            </main>
        </div>
    );
};


export default HomePage;
