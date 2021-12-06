import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Link from "next/link";

const Header = () => {
	const { width } = useContext(UserContext);

	const [menuOpen, setMenuOpen] = useState(false);
	const cartItems = useSelector((state) => state.cartItems);

	useEffect(() => {
		if (width >= 768) {
			setMenuOpen(true);
		}
	}, [width]);

	const menuStateHandler = () => {
		setMenuOpen(!menuOpen);
		console.log(menuOpen);
	};

	const hideMenuOnMobileClick = () => {
		if (width < 768) {
			setMenuOpen(!menuOpen);
		}
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

			<nav className="navbar__items" hidden={menuOpen && width < 768}>
				<Link href="/">
					<div
						className="navbar__item"
						onClick={hideMenuOnMobileClick}
					>
						Home
					</div>
				</Link>
				<Link href="/about">
					<div className="navbar__item" onClick={hideMenuOnMobileClick}>about</div>
				</Link>
				<Link href="/blogs">
					<div className="navbar__item" onClick={hideMenuOnMobileClick}> blogs</div>
				</Link>
				<Link href="/shop">
					<div className="navbar__item" onClick={hideMenuOnMobileClick}>Shop</div>
				</Link>
				<Link href="/checkout">
					<div className="navbar__item" onClick={hideMenuOnMobileClick}>
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
