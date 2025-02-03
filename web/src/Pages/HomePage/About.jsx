import React from "react";

export default function About() {
  const about = [
    {
   
      text: "Events ",
      count: "1024",
    },
    {
   
      text: "Happy Clients",
      count: "5178",
    },
    {
  
      text: "Vendors ",
      count: "3478",
    },
  ];

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h6 className="section-title text-start" style={{ color: "#7472ee" }}>
                About Us
              </h6>
              <h1 className="mb-4">
                Welcome to{" "}
                <span className="text-uppercase" style={{ color: "#7472ee" }}>
                  EventSphere
                </span>
              </h1>
              <p className="mb-4">
                EventSphere is your ultimate event planning and management solution. From corporate conferences to grand weddings, we bring your visions to life with expert planning, seamless execution, and personalized services. Let us make your next event extraordinary!
              </p>
              <div className="row g-3 pb-4">
                {about.map((item, key) => (
                  <div key={key} className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
                    <div className="border rounded p-1">
                      <div className="border rounded text-center p-4">
                        {item.icon}
                        <h2 className="mb-1" data-toggle="counter-up" style={{ color: "#7472ee" }}>
                          {item.count}
                        </h2>
                        <p className="mb-0">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.1s"
                    src="/assets/img/about1.jpeg"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    src="/assets/img/about3.jpg"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    src="/assets/img/about4.jpg"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    src="/assets/img/about5.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
