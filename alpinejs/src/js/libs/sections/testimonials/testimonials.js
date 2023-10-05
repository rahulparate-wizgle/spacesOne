function testimonialBox() {
  const authorsEl = document.querySelectorAll(".author");
  const wrapper = document.querySelector(".testimonials-wrapper");
  const container = document.querySelector(".testimonials-block");
  const nameEl = document.querySelector(".name");
  const textEl = document.querySelector(".text");

  const testimonials = [
    {
      text: "I had my concerns that due to a tight deadline this project can't be done. But Florin proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again Florin!",
      name: "Selena Martinez",
      color: "rgba(103, 28, 201,1.0)",
    },
    {
      text: "Second time hiring him. Finished everything in a timely manner and his work is excellent. Can't recommend him enough.",
      name: "Karie Hehn",
      color: "rgba(123, 34, 224,1.0)",
    },
    {
      text: "Alexandru Florin never fails to impress me by the quality of his work and delivering on time. When it comes to front-end, he is definitely my go to guy. Always is a pleasure to work with Alexandru even when deadlines are tight and pressure is great. It's reassuring to have a project in such good hands.",
      name: "Steve P. Huard",
      color: "rgba(73, 17, 138,1.0)",
    },
    {
      text: "Florin has been of great help on our different web projects. He is very trustworthy and serious in the work done. Keep on the good work and energy, been a pleasure to collaborate.",
      name: "Matt Dilon",
      color: "rgba(121, 0, 196,1.0)",
    },
    {
      text: "I hired Florin Pop based on others positive experiences, and I understand why he's so highly rated. His code is very clean, he communicates well, and he likes to offer alternative solutions.",
      name: "Corina Sparks",
      color: "rgba(85, 34, 153,1.0)",
    },
  ];

  authorsEl.forEach((author, idx) => {
    author.addEventListener("click", (e) => {
      addTestimonial(idx);
      author.classList.add("selected");
    });
  });

  function addTestimonial(idx) {
    const testimonial = testimonials[idx];

    nameEl.innerHTML = testimonial.name;
    textEl.innerHTML = testimonial.text;
    wrapper.style.background = testimonial.color;
    /*container.style.boxShadow = `0 35px 10px -20px ${testimonial.color.substring(
      0,
      testimonial.color.length - 4
    )}0.9)`;*/

    authorsEl.forEach((author) => {
      author.classList.remove("selected");
    });
  }

  addTestimonial(0);
}

export function initTestimonials() {
  return {
    setup() {
      testimonialBox();
    }
  }
}