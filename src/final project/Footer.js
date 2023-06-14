export function Footer() {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Dacees snoods and accessories
              </h6>
              <p>
                
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Categories
              </h6>
              <p>Snoods</p>
              <p>Preyieds</p>
              <p>Headscarves</p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> Bait Shemesh , Hakishon 12, Israel</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                {/* לבדוק האם זה יכול באמת לשלוח מייל ואם בכלל צריך */}
                snooddacee@gmail.com
              </p>
              <p><i className="fas fa-phone me-3"></i> 050-425-4269</p>
              <p><i className="fas fa-print me-3"></i> 050-389-7255</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ "backgroundColor": "rgba(0, 0, 0, 0.05)" }}>
        © 2023 Copyright: Chavi&Bat7.com
        {/* <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
      </div>
    </footer>
  );
}