import React from "react";
import { Button } from "reactstrap";
import "./styles/footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div
          className="footer-div"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>WHO WE ARE?</p>
            <p style={{ paddingBottom: "30px !important" }}>
              A dedicated Recruitment and <br />
              Employment Agency, connecting talented students with <br />{" "}
              leading companies. We specialise in Student <br />
              Placements, Short-term Internships and Jobs.
            </p>
          </div>
          <div>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>GET IN TOUCH</p>
            <span>
              <b>Head office: </b>Main II chandigar road, karachi
            </span>
            <span style={{ display: "block" }}>
              <b>Phone Number: </b>+92342-4408250
            </span>
          </div>
          <div>
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>
              Connect with us on{" "}
            </p>
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              <i class="fab fa-facebook"></i>
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              <i class="fab fa-twitter"></i>
            </Button>
            <Button style={{ backgroundColor: "transparent", border: "none" }}>
              <i class="fab fa-google"></i>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
