export default function Home() {
  return (
    <div className="row m-5">
      <div className="col-sm-8 offset-2">
      <div className="card" >
      <div className="card-header">
        <span>Next Js Aplication</span>
      </div>
      <div className="card-body">
        
        <h1>Welcome to Our Next.js Application</h1>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Home</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/account/accountlist">Account</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Branch</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Account Type</a>
                  </li>
                </ul>
                
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
