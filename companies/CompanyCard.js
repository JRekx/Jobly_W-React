/**
 * CompanyCard component renders a card displaying company information
 * and links to the company detail page.
 *
 * Props:
 * - name: Company name
 * - description: Short company description
 * - LogoUrl: URL for company logo image
 * - handle: Company handle for detail page route
 */
import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

function CompanyCard({ name, description, LogoUrl, handle }) {
  console.debug("CompanyCard", LogoUrl);

  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h5 className="card-title">
          {name}
          {LogoUrl && (
            <img src={LogoUrl} alt={name} className="float-right ml-5" />
          )}
        </h5>
        <p>
          <small>{description}</small>
        </p>
      </div>
    </Link>
  );
}

export default CompanyCard;
