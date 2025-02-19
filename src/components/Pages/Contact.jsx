import { Button, TextInput } from "@mantine/core";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Get in Touch
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Have questions? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className=" p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Send us a message
          </h2>
          <form>
            <div className="space-y-4">
              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                size="md"
                required
              />
              <TextInput
                label="Mobile Number"
                placeholder="Enter your mobile number"
                size="md"
                required
              />
              <TextInput
                label="Email Address"
                placeholder="Enter your email address"
                size="md"
                required
              />
              <label className="block text-gray-700 font-semibold">
                Message
              </label>
              <textarea
                className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Write your message..."
                required
              ></textarea>

              <Button  fullWidth type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
          <p className="text-gray-600">Feel free to reach out to us via the details below.</p>
          
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600 text-lg" />
            <p className="text-gray-700">RentEasy, Pokhara, Nepal</p>
          </div>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-blue-600 text-lg" />
            <p className="text-gray-700">+977 9847502403</p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600 text-lg" />
            <p className="text-gray-700">renteasy@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
