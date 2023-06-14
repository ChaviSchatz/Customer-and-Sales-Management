export function Footer() {
  return (
    <footer class="text-center text-lg-start bg-light text-muted">
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>Dacees snoods and accessories
              </h6>
              <p>
                
              </p>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                Categories
              </h6>
              <p>Snoods</p>
              <p>Preyieds</p>
              <p>Headscarves</p>
            </div>

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3"></i> Bait Shemesh , Hakishon 12, Israel</p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                {/* לבדוק האם זה יכול באמת לשלוח מייל ואם בכלל צריך */}
                snooddacee@gmail.com
              </p>
              <p><i class="fas fa-phone me-3"></i> 050-425-4269</p>
              <p><i class="fas fa-print me-3"></i> 050-389-7255</p>
            </div>
          </div>
        </div>
      </section>

      <div class="text-center p-4" style={{ "background-color": "rgba(0, 0, 0, 0.05);" }}>
        © 2023 Copyright: Chavi&Bat7.com
        {/* <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
      </div>
    </footer>
  );
}