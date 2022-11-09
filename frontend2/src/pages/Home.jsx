import './Home.css'

export function Home() {
  window.addEventListener("scroll", throttle(parallax, 13));

  function throttle(fn, wait) {
    let time = Date.now();
    return function () {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  function parallax() {
    let scrolled = window.pageYOffset;

    let parallax = document.querySelector("#level0");
    parallax.style.transform = "translateY(" + scrolled * 0.8 + "px" + ")";

    let parallax1 = document.querySelector("#level1");
    parallax1.style.transform = "translateY(" + scrolled * 0.6 + "px" + ")";

    let parallax2 = document.querySelector("#level2");
    parallax2.style.transform = "translateY(" + scrolled * 0.3 + "px" + ")";

    let parallax3 = document.querySelector(".logo");
    parallax3.style.transform = "translateY(" + -scrolled * 0.8 + "px" + ")";
  }

  return (
    <div>
      <div class="socials">
        <span style={{fontSize: '2rem'}}>HCET</span>
        <a href="#" target="_blank" class="social-link">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 282.7 268"
            style={{enableBackground:'new 0 0 282.7 268', maxWidth:'40px'}}>
            {" "}
            <path d="M274.9,61.3c0,48.8,0,97.6,0,146.5c-3.5,1-7,1.9-11,3c0,2.7,0,5.8,0,8.9c0,8.8,0,8.8-8.6,9c-1,0-1.9,0.1-3.3,0.2 c0,3-0.2,5.8,0,8.6c0.3,4.4-1.4,6.5-6,6.2c-2.9-0.2-5.8,0-9,0c0,2,0,3.3,0,4.7c0,7.1-0.2,7.3-7.3,7.3c-4.1,0-8.2,0-12.4,0 c-0.1,1.4-0.2,2.2-0.2,3c-0.2,8.9-0.2,8.9-9.2,8.9c-43.5,0-87,0-130.5,0c-12,0-11.8,1.4-11.9-10.8c0-0.3-0.3-0.5-0.7-1.1 c-2.8,0-5.7,0-8.7,0c-11.9,0.1-11.4,0.8-11.5-10.7c0-0.3-0.3-0.6-0.6-1.3c-2.9,0-6-0.1-9.1,0c-3.5,0.1-5.2-1.6-5.1-5.1 c0.1-3.2,0-6.5,0-9.9c-2.1,0-3.4,0-4.8,0c-7,0-7.2-0.2-7.2-7.4c0-3.8,0-7.5,0-11.3c-12.2-0.3-9.9-2-9.9-10.5c-0.1-43.5,0-87,0-130.5 c0-9.2,0-9.2,8.9-9.8c0.3,0,0.5-0.4,1-0.7c0-2.4,0-5.1,0-7.7c0-11.6-1.1-11.4,10.8-11.4c0.3,0,0.5-0.3,1.2-0.7c0-2.8,0.1-5.7,0-8.7 c-0.2-4.1,1.7-5.7,5.7-5.5c2.9,0.1,5.9,0,9.3,0c0-1.9,0-3.4,0-4.8c0-6.8,0.3-7.1,7-7.1c4.6,0,9.2,0,12.8,0c1.2-4.6,2.1-8.3,3.1-12 c49.1,0,98.3,0,147.4,0c1,3.8,1.9,7.6,3,12c1.8,0,4,0,6.3,0c2.5,0,5,0.1,7.4,0c3.5-0.1,5.2,1.5,5.1,5c-0.1,2.2,0,4.5,0,6.9 c3.9,0,7,0,10.1,0c3.3,0,4.8,1.6,4.8,4.8c0,3.3,0,6.5,0,10.1c2,0,3.5,0,4.9,0c6.7,0,7,0.4,7,7.1c0,4.2,0,8.5,0,11.7 C268.2,59.4,271.5,60.3,274.9,61.3z M239.9,49.1c-3.8-0.8-8.4-0.4-10.4-2.5c-2-2.1-1.5-6.6-2.1-10.5c-4,0-9,1.5-11.6-0.4 c-2.5-1.8-2.6-7-3.7-10.9c-47.4,0-95.3,0-143.4,0c0,2-0.1,3.7,0,5.3c0.5,4.7-1.6,6.7-6.4,6.3c-2.7-0.2-5.5,0-8.2,0 C53,47.2,53,47.2,41.7,48.9c0,3.7,0.6,7.6-0.1,11.2c-1.1,5.2-6.5,2-9.4,3.6c0,47.2,0,94,0,141c1.2,0,2.1,0,2.9,0 c6.3,0.1,6.7,0.5,6.7,6.9c0,2.6,0,5.2,0,7.2c4.1,0.8,8.5,0.3,10.4,2.3c2,2.2,1.6,6.6,2.4,10.6c3.7,0,8.6-1.4,11.3,0.4 c2.6,1.8,2.8,6.9,4.2,11.1c47,0,94.8,0,143.1,0c0-1.9,0-3.5,0-5.1c0-6,0.5-6.5,6.6-6.6c2.7,0,5.5,0,7.5,0c0.8-4.2,0.4-8.6,2.4-10.5 c2.2-2,6.6-1.6,10.4-2.2c0-3.7-0.8-7.7,0.2-11.3c1.5-5.3,7-1.7,10.4-3.4c0-46.9,0-93.8,0-140.7C240.6,62.6,240.6,62.6,239.9,49.1z" />{" "}
            <path d="M88.6,101.1c0-5.5,0-10.3,0-15.1c0-3.3,1.6-4.8,4.9-4.8c4.8,0,9.6,0,15.1,0c0-3.3,0.1-6.4,0-9.5c-0.1-3.7,1.4-5.5,5.2-5.5 c18.4,0.1,36.8,0.1,55.3,0c3.8,0,5.4,1.7,5.3,5.4c-0.1,3,0,5.9,0,9.6c4.5,0,8.8,0.1,13,0c4.2-0.2,6.1,1.4,6,5.8 c-0.2,4.5,0,8.9,0,14.2c3.7,0,7.3,0.1,10.9,0c3.5-0.1,5.1,1.6,5.1,5.1c0,18.4-0.1,36.8,0,55.3c0,3.7-1.5,5.5-5.3,5.4 c-3.3-0.1-6.6,0-10.7,0c0,4.6-0.1,9,0,13.4c0.1,4-1.6,5.7-5.6,5.6c-4.3-0.2-8.5,0-13.3,0c0,3.9-0.1,7.3,0,10.7 c0.1,3.5-1.4,5.2-5,5.2c-18.6,0-37.2,0-55.8,0c-3.6,0-5.1-1.6-5-5.1c0.1-3.4,0-6.9,0-10.8c-4.9,0-9.3-0.2-13.8,0 c-4.4,0.2-6.5-1.4-6.2-6c0.2-4.1,0-8.2,0-13c-3.9,0-7.5,0-11.1,0c-3.3,0-4.8-1.6-4.8-4.8c0-18.8,0-37.5,0-56.3c0-3.4,1.8-4.7,5-4.7 C81.1,101.2,84.6,101.1,88.6,101.1z M96.8,161.9c3.6,0,6.5,0.2,9.5,0c4.9-0.4,6.6,1.8,6.2,6.5c-0.2,3.1,0,6.2,0,9.1 c19.4,0,38,0,56.8,0c0-3.2,0-6,0-8.8c0-6.3,0.5-6.7,6.9-6.7c2.9,0,5.8,0,8.6,0c0-19.4,0-38,0-56.8c-3.2,0-6,0-8.8,0 c-6.3,0-6.7-0.5-6.7-6.9c0-2.6,0-5.2,0-7.6c-19.4,0-38,0-56.8,0c0,3-0.2,5.7,0,8.3c0.4,4.9-1.8,6.6-6.5,6.2c-3.1-0.2-6.2,0-9.3,0 C96.8,124.3,96.8,142.8,96.8,161.9z" />{" "}
            <path d="M212,75.2c-12.6,0.1-11.8,0.9-11.8-11.7c0-13.2-1-12.1,12.4-12.2c12.3,0,11.6-0.7,11.5,11.5c0,0.2,0,0.3,0,0.5 C224.2,76.2,224.9,75.3,212,75.2z" />{" "}
          </svg>
        </a>
      </div>
      <div class="container">
        <div class="parallax-wrapper">
          <div class="logo">
            <img src="https://media.discordapp.net/attachments/958806926240661605/1039785425444819025/logo.png" />
            <a href="#" class="button" target="_blank">
              Learn More
            </a>
          </div>
          <div class="parallax" id="level0"></div>
          <div class="parallax" id="level1"></div>
          <div class="parallax" id="level2"></div>
          <div class="parallax" id="level3"></div>
        </div>
        <div class="content">
          <h2>
            Oregon Studio was created to teach school children about the life of
            a 19th century pioneer on the Oregon Trail.
            <br />
            <br />
            The Oregon Trail is a series of educational computer games. The
            first game was originally developed by Don Rawitsch, Bill Heinemann,
            and Paul Dillenberger in 1971 and produced by the Minnesota
            Educational Computing Consortium (MECC) in 1974. The original game
            was designed to teach 8th grade schoolchildren about the realities
            of 19th-century pioneer life on the Oregon Trail. The player assumes
            the role of a wagon leader guiding a party of settlers from
            Independence, Missouri, to Oregon's Willamette Valley via a covered
            wagon in 1848.
          </h2>
        </div>
        <small class="footer">(c) HCET STUDIOS</small>
      </div>
    </div>
  );
}
