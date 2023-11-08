import React from "react";

export default function Testimonial() {
  const testimonial = [
    {
      name: "Jorjan",
      img: "https://source.unsplash.com/50x50/?portrait?1",
      testimonial:
        "An enchanting and inspirational journey of self-discovery. Paulo Coelho's storytelling is captivating, making it a must-read for those seeking purpose in life.",
    },
    {
      name: "Amma boling",
      img: "https://source.unsplash.com/50x50/?portrait?2",
      testimonial:
        "Tara Westover's memoir is a gripping tale of determination against all odds. Her pursuit of education and personal growth is truly remarkable and a testament to the human spirit.",
    },
    {
      name: "Janni",
      img: "https://source.unsplash.com/50x50/?portrait?3",
      testimonial:
        "Erin Morgenstern's 'The Night Circus' is a whimsical and enchanting journey into a magical world. The vivid descriptions and unique characters make it a captivating read, though I wished for more character depth.",
    },
  ];
  return (
    <>
      <section className="my-8 dark:bg-gray-700 dark:text-gray-100">
        <h1 className="text-4xl font-semibold text-center">
          What our customers are saying about us
        </h1>
        <div className="flex flex-col items-center  mb-12 md:p-10 md:px-12"></div>
        <div className=" flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
          {testimonial.map((data, index) => (
            <Card
              name={data.name}
              img={data.img}
              testimonial={data.testimonial}
              key={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function Card({ name, img, testimonial }) {
  return (
    <>
      <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-900">
          <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="w-8 h-8 dark:text-violet-400"
            >
              <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
              <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
            </svg>
            {testimonial}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              className="absolute right-0 w-8 h-8 dark:text-violet-400"
            >
              <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
              <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
            </svg>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-violet-400 dark:text-gray-900">
          <img
            src={img}
            alt="prifile"
            className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 "
          />
          <p className="text-xl font-semibold leadi">{name}</p>
        </div>
      </div>
    </>
  );
}
