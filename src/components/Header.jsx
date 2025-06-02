import SearchBar from "./SearchBar";
export default function Header() {
    return (
        <div className="full-width-block">
            <header>
                <div className="header-container">

                    <h2 className="logo">
                        <a href="/">WYNI</a>
                    </h2>
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
        </div>

    );
}