import React from "react";
import phoneMockup from '../../assets/user/home page/mobileimage.png'
// import googlePlay from "/google-play.png"; 

// import appStore from "/app-store.png";     
// import qrImage from "/qr-placeholder.png"; 
const DownloadAppSection = () => {
  return (
    <section className="bg-[#F7F7FF] py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
            Stay Connected Anywhere!
          </h2>
          <p className="text-gray-600 mb-6">
            Download our app for seamless PG booking
          </p>

          {/* Store Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <a href="#" className="bg-[#003ADB] hover:bg-[#002aad] text-white rounded-xl px-5 py-3 flex items-center gap-2 shadow-md transition">
              {/* <img src={googlePlay} alt="Google Play" className="w-6 h-6" /> */}
              <svg width="60" height="65" viewBox="0 0 60 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M44.2008 22.5007L8.83411 2.9674C7.79447 2.37686 6.67023 1.94965 5.50078 1.70073C4.55454 1.59181 3.59989 1.81574 2.80078 2.33407M44.2008 22.5007L34.4174 32.5007M44.2008 22.5007L55.8674 28.9507C60.0174 31.2507 60.0174 33.6841 55.8674 35.9841L44.2008 42.4341L34.4174 32.4341L44.2008 22.4341V22.5007ZM34.4174 32.5007L2.80078 2.33407M34.4174 32.5007L2.83411 62.6174M34.4174 32.5007L44.2008 42.5007L8.90078 62.0341C6.96745 63.1007 4.36745 64.0174 2.83411 62.6174M2.80078 2.33407L34.4674 32.5007L2.83411 62.6174M2.80078 2.33407L2.71745 2.35073C1.65078 3.28407 1.05078 5.20073 1.05078 7.98407V57.0174C1.05078 59.8007 1.66745 61.6841 2.83411 62.6174" stroke="#F8F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              <span className="text-sm">Get it on <br /> <strong>Google Play</strong></span>
            </a>
            <a href="#" className="bg-[#003ADB] hover:bg-[#002aad] text-white rounded-xl px-5 py-3 flex items-center gap-2 shadow-md transition">
              {/* <img src={appStore} alt="App Store" className="w-6 h-6" /> */}
              <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M51.0887 17.7574C47.4787 21.3708 40.622 20.3741 40.622 20.3741C40.622 20.3741 39.6287 13.5208 43.242 9.90743C46.852 6.29743 53.7087 7.2941 53.7087 7.2941C53.7087 7.2941 54.702 14.1441 51.0887 17.7574ZM13.832 47.3674C13.832 58.3041 21.152 70.8674 28.562 73.5241C31.1287 74.4441 33.7854 73.1741 35.992 71.5908C37.6654 70.3908 39.692 69.2474 41.332 69.2474C42.9654 69.2474 44.9987 70.3908 46.6687 71.5908C48.8754 73.1741 51.532 74.4441 54.102 73.5241C59.3654 71.6374 64.5854 64.7474 67.1654 56.9908C62.1654 55.5574 58.5187 51.0374 58.5187 45.6808C58.5187 40.7741 61.582 36.5674 65.9387 34.7974C63.132 29.8108 58.5454 27.1674 53.362 27.1674C50.682 27.1674 48.2154 28.2474 46.2287 29.5441C43.0487 31.6108 39.612 31.6108 36.4354 29.5441C34.4454 28.2474 31.982 27.1674 29.302 27.1674C20.7554 27.1674 13.832 34.3508 13.832 47.3674Z" stroke="#F8F8FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              <span className="text-sm">Download on the <br /> <strong>App Store</strong></span>
            </a>
          </div>

          {/* QR Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-2">
              <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow text-sm font-semibold text-pink-500">
                <span className="bg-pink-500 text-white rounded-full px-2">C</span>
                <span className="bg-yellow-400 text-white rounded-full px-2">M</span>
              </span>
            </div>
            <p className="text-gray-700 mb-2">Scan QR code to install the app!</p>
            {/* <img src={qrImage} alt="QR Code" className="w-28 h-28 rounded-md bg-gray-400" /> */}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 ">
          
        <div className="absolute -ml-4 mt-4">
          <svg width="600" height="580" viewBox="0 0 720 693" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect y="224.48" width="566.863" height="167" rx="83.5" transform="rotate(-25.2135 0 224.48)" fill="#FFDC82"/>
<rect x="21.8125" y="418.691" width="692.18" height="167" rx="83.5" transform="rotate(-25.2135 21.8125 418.691)" fill="#FFDC82"/>
<rect x="157.617" y="559.229" width="566.863" height="167" rx="83.5" transform="rotate(-25.2135 157.617 559.229)" fill="#FFDC82"/>
<rect x="228" y="41" width="321" height="610" rx="39" fill="#FEE123"/>
<rect x="197" y="17" width="387" height="659" fill="url(#pattern0_4693_44323)"/>
<defs>
{/* <pattern id="pattern0_4693_44323" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_4693_44323" transform="matrix(0.00102115 0 0 0.000548554 -0.523077 -0.0475207)"/>
</pattern> */}

</defs>
</svg>

          </div>

        <div>
          <img
            src={phoneMockup}
            alt="Phone App"
            className="w-full  mx-auto drop-shadow-2xl relative z-10 "
          />
          </div>



          {/* Optional yellow background circles if needed */}
          {/* <div className="absolute -z-10 -right-10 top-10 w-80 h-80 rounded-full bg-yellow-300 blur-2xl opacity-40 hidden md:block" /> */}
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
