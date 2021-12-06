import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Link from "next/link";

const Header = () => {
	const value = useContext(UserContext);

	const [menuOpen, setMenuOpen] = useState(false);
	const cartItems = useSelector((state) => state.cartItems);

	useEffect(() => {
		if (value.width >= 768) {
			setMenuOpen(false);
		} else {
			setMenuOpen(true);
		}
	}, [value.width]);

	const menuStateHandler = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<header className="navbar">
			<div className="navbar__action">
				<div className="navbar__action__logo">
					<Link href="/">AnandPal</Link>
				</div>
				<div
					className="navbar__action__hamburger"
					onClick={menuStateHandler}
				>
					<FontAwesomeIcon icon={faBars} color={"#00000"} />
				</div>
			</div>

			<nav className="navbar__items">
				<Link href="/">
					<div className="navbar__item">Home</div>
				</Link>
				<Link href="/about">
					<div className="navbar__item">about</div>
				</Link>
				<Link href="/blogs">
					<div className="navbar__item">blogs</div>
				</Link>
				<Link href="/shop">
					<div className="navbar__item">Shop</div>
				</Link>
				<Link href="/checkout">
					<div className="navbar__item">
						{cartItems?.length === 0 ? null : (
							<div className="itemsInCart">Cart</div>
						)}
					</div>
				</Link>
			</nav>
		</header>
	);
};

export default Header;
