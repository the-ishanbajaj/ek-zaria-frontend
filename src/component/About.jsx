import React from 'react'

const About = () => {
  return (
    <div className="about-container">
      <h2>About Ek Zaria Foundation</h2>
      <p>
        Ek Zaria Foundation is dedicated to connecting generous donors with individuals who need financial support for medical treatments, education, and other essential needs.
      </p>
      <p>
        <strong>"We Do Not Accept Money Or Things"</strong> - We act only as a bridge between donors and recipients. All donations go directly to the recipient's bank account.
      </p>
      <p>
        Our mission is to create transparency and trust in the donation process, ensuring every rupee reaches those who truly need it.
      </p>
      
      <h2 style={{marginTop: '30px'}}>Our Work</h2>
      <div className="about-gallery">
        {/* Add your foundation images here */}
        <img src="/image1.jpg" alt="Foundation work 1" />
        <img src="/image2.jpg" alt="Foundation work 2" />
        <img src="/image3.jpg" alt="Foundation work 3" />
        {/* <img src="image4.jpg" alt="Foundation work 4" /> */}
      </div>
      
      <div className="footer">
        <p>For Medical Help Call Us - 7889168849, 86008 50086</p>
        <p>© 2025 Ek Zaria Foundation. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default About
