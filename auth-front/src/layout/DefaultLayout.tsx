import { useState } from "react";
import { Link } from "react-router-dom";
import { Children } from "react";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {

    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <strong>ToDo App</strong>
                        </Link>
                        
                        <div 
                            className={`navbar-burger ${isActive ? 'is-active' : ''}`} 
                            onClick={() => setIsActive(!isActive)}
                            aria-label="menu" 
                            aria-expanded={isActive}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                   <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/"> Login </Link>
                            <Link className="navbar-item" to="/dashboard"> Dashboard </Link>
                            <Link to="/singup" className="navbar-item" > Signup </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    );
}