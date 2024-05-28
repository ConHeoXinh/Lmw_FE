import React from "react";

const EmailComponent = () => {
  const companyName = "Thư Viện LMS";
  const companyAddress = "123 phường a, quận b, thành phố C";
  const companyEmail = "info@abccompany.com";
  const companyPhone = "+1234567890";

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md pt-28 mx-5">
      <h1 className="text-3xl font-bold mb-2 text-center">Liên hệ</h1>
      <h2 className="text-xl font-bold mb-2">{companyName}</h2>
      <p className="mb-2">
        <strong>Address:</strong> {companyAddress}
      </p>
      <p className="mb-2">
        <strong>Email:</strong>{" "}
        <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
      </p>
      <p className="mb-2">
        <strong>Phone:</strong>{" "}
        <a href={`tel:${companyPhone}`}>{companyPhone}</a>
      </p>
    </div>
  );
};

export default EmailComponent;
