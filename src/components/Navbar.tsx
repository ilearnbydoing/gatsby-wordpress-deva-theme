import React, { useState } from "react";
import classNames from "classnames";
import { Link, graphql, useStaticQuery } from "gatsby";
import { SettingsAndSlugs } from "../models/settings-and-page-slugs.model";
import url from "url";

type NavbarProps = {
  navbarData: SettingsAndSlugs;
};

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const {
    site: {
      siteMetadata: {
        header: { navigation },
        siteUrl,
        apiUrl,
        logoUrl,
        siteTitle,
      },
    },
  } = navbarData;

  const logo = logoUrl ? url.resolve(siteUrl, logoUrl) : null;

  const [isMenuToggled, setIsMenuToggled] = useState(false);

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 container mx-auto">
      <div className="flex flex-shrink-0 mr-6 w-2/3 lg:w-auto">
        <Link className="text-2xl text-primary font-serifBold" to="/">
          {logo ? (
            <img className="h-10" src={logo} alt={siteTitle} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: siteTitle }}></span>
          )}
        </Link>
      </div>
      <div className="block lg:hidden">
        {" "}
        <button
          onClick={(e) => setIsMenuToggled(!isMenuToggled)}
          className="navbar-burger flex items-center py-2 px-3 text-gray-700 focus:outline-none"
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>{" "}
      </div>
      <div
        className={classNames(
          "navbar-menu lg:flex lg:flex-grow lg:items-center lg:justify-end w-full lg:w-auto",
          { hidden: !isMenuToggled }
        )}
      >
        <div className="flex flex-col items-end lg:flex-row">
          {navigation.map(({ label, url }, i) => {
            return url.startsWith("/") ||
              url.startsWith(siteUrl) ||
              url.startsWith(apiUrl) ? (
              <Link
                key={i}
                className="inline-block mt-4 lg:mt-0 mx-3 lg:mx-5 text-gray-700 border-b-3 border-transparent hover:border-primary"
                activeClassName="border-b-3 border-primaryLight"
                to={`${
                  url.startsWith("/")
                    ? url
                    : url.startsWith(siteUrl)
                    ? url.slice(siteUrl.length, url.length)
                    : url.slice(apiUrl.length, url.length)
                }`}
              >
                {label}
              </Link>
            ) : (
              <a
                key={i}
                href={url}
                rel="noreferrer noopener"
                target="_blank"
                className="inline-block mt-4 lg:mt-0 mx-3 lg:mx-5 text-gray-700 border-b-3 border-transparent hover:border-primary"
              >
                {label}
              </a>
            );
          })}
          {/* <Link
            className="block lg:inline-block mt-4 lg:mt-0 lg:mx-5 text-primaryActive hover:text-primary"
            to="/contact"
          >
            Contact
          </Link> */}
          {}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
