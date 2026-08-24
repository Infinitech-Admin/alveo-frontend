import React from "react";

const UnitLocation = () => {
  return (
    <section className="w-full flex flex-col justify-center">
      <div className=" w-full">
        <iframe
          allowFullScreen
          className="w-full  rounded-xl"
          height={350}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.7398478174355!2d120.99881902577164!3d14.442150530935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d1e2828e5e11%3A0x664582f5af39ff26!2sTalon%203%20Barangay%20Hall%2C%20Las%20Pinas%2C%20Manila%2C%201747%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1733715851496!5m2!1sen!2sph"
          style={{ border: 0 }}
          title="property location"
        />
      </div>
    </section>
  );
};

export default UnitLocation;
