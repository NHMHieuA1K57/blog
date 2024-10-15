import React from "react";
import MainLayout from "../../components/MainLayout";
import { images } from "../../constants";

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-100">
        {/* Main Section */}
        <section className="container mx-auto py-12">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
            <p className="mt-4 text-gray-600">
              Welcome to Ehya Blog! We're passionate about sharing insights on
              design, user experience, and user interfaces.
            </p>
          </div>

          {/* Image Section */}
          <div className="mb-12 flex justify-center">
            <img
              src={images.HeroImage}
              alt="Creative Team"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Our Mission, Our Team, Our Vision */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mx-auto h-12 w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c.867 0 1.742.166 2.5.5m2.5.5a9 9 0 11-10 0 7.5 7.5 0 1010 0"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Our Mission</h3>
              <p className="text-gray-600">
                We aim to inspire designers and developers with meaningful
                content and resources.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mx-auto h-12 w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16a4 4 0 01-8 0m8 0v-5.5A2.5 2.5 0 0012.5 8m-5 3v-3M12 14v3.5m5 2V15m0-8.5V9.5m3-2.5v3.5"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Our Team</h3>
              <p className="text-gray-600">
                A team of passionate creators committed to high-quality content.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mx-auto h-12 w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12v8m0-8l-4 4m4-4l4 4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Our Vision</h3>
              <p className="text-gray-600">
                To become a go-to platform for design, UX, and UI inspiration.
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
