import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import Image from 'next/image';

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item" style={{padding : "10px"}}><Image src="/../public/img/logo-gimme-money.png" alt="Gimme Money Logo" width="70" height="70" /></a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/campaigns/list">
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/info/aboutus">
          <a className="item">About Us</a>
        </Link>

      </Menu.Menu>
    </Menu>
  );
};

export default Header;
