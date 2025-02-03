import React from "react";
import CommonHeading from "./CommonHeading";

export default function EventPackages() {
  const packages = [
 
    {
      img: "../assets/img/about1.jpeg",
      price: "$1200",
      name: "Wedding Celebration",
      description:
        "Make your wedding day unforgettable with our premium wedding planning services, tailored to your dreams and preferences.",
      darkbtn: "Book Event",
    },
    {
        img: "../assets/img/home3.jpg",
        price: "$500",
        name: "Corporate Event",
        description:
          "From business conferences to networking meetups, we ensure a seamless corporate event experience with professional planning and execution.",
        darkbtn: "Book Event",
      },
    {
      img: "../assets/img/about4.jpg",
      price: "$800",
      name: "Concert & Music Fest",
      description:
        "Experience high-energy music festivals and live concerts planned to perfection with stage, lighting, and crowd management.",
      darkbtn: "Book Event",
    },
  ];

  const features = [
   
  ];

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Event Packages"
            title="Events"
            subtitle="Discover Our"
          />
          <div className="row g-4">
            {packages.map((item, key) => (
              <div
                key={key}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img className="img-fluid" src={item.img} alt={item.name} />
                    <small
                      className="position-absolute start-0 top-100 translate-middle-y text-white rounded py-1 px-3 ms-4"
                      style={{
                        backgroundColor: "#7472ee",
                      }}
                    >
                      {item.price}
                    </small>
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{item.name}</h5>
                      <div className="ps-2">{item.star}</div>
                    </div>
                    <div className="d-flex mb-3">
                      {features.map((featureItem, index) => (
                        <small key={index} className="border-end me-3 pe-3">
                          {featureItem.icon}
                          {featureItem.quantity
                            ? `${featureItem.quantity} ${featureItem.facility}`
                            : featureItem.facility}
                        </small>
                      ))}
                    </div>
                    <p className="text-body mb-3">{item.description}</p>
                    <div className="d-flex justify-content-between">
                      <a
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#7472ee",
                          color: "#fff",
                          padding: "10px 20px",
                          borderRadius: "5px",
                        }}
                        href="#"
                      >
                        {item.darkbtn}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
