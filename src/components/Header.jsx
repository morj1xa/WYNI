import SearchBar from "./SearchBar";
export default function Header() {
    return (
        <header>
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
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="/profile">Profile</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}