import SearchBar from "./SearchBar";
export default function Header() {
    return (
        <header>
            <div className="header-container">

                <h2>SHOP</h2>
                <form action="" method="get">
                    <SearchBar />
                </form>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/chat">Chat</a>
                        </li>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}