import React from "react";
import CommonHeading from "./CommonHeading";
import "./Services.css"; // Import CSS for styling

export default function Services() {
  const services = [
    {
      id: 1,
      icon: <i className="fa fa-calendar-check fa-2x custom-icon"></i>,
      name: "Event Planning",
      description:
        "From corporate meetings to grand weddings, we handle every detail for a seamless event experience.",
    },
    {
      id: 2,
      icon: <i className="fa fa-utensils fa-2x custom-icon"></i>,
      name: "Catering & Dining",
      description:
        "Delicious catering services with a variety of cuisines tailored to your event theme.",
    },
    {
      id: 3,
      icon: <i className="fa fa-music fa-2x custom-icon"></i>,
      name: "Live Entertainment",
      description:
        "We provide top-tier DJs, live bands, and performers to keep your audience engaged.",
    },
    {
      id: 4,
      icon: <i className="fa fa-lightbulb fa-2x custom-icon"></i>,
      name: "Lighting & Decor",
      description:
        "Transform your event with professional lighting, staging, and decorative themes.",
    },
    {
      id: 5,
      icon: <i className="fa fa-camera fa-2x custom-icon"></i>,
      name: "Photography & Videography",
      description:
        "Capture your moments with high-quality photography and cinematic videography.",
    },
    {
      id: 6,
      icon: <i className="fa fa-users fa-2x custom-icon"></i>,
      name: "Guest Management",
      description:
        "From RSVPs to on-site coordination, we ensure smooth guest experiences.",
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <CommonHeading heading="Our Services" title="Services" subtitle="Discover Our" />
        </div>
        <div className="row g-4">
          {services.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <a className="service-item card-hover-effect rounded" href="#" tabIndex="0">
                <div className="service-icon d-flex justify-content-center align-items-center mb-3">
                  {item.icon}
                </div>
                <h5 className="service-name mb-3 text-center">{item.name}</h5>
                <p className="text-body mb-0 text-center">{item.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
