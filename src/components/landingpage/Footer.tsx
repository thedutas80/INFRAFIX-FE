import React from 'react'

interface FooterProps {
  data: {
    logo: string
    address: {
      street: string
      city: string
      province: string
      country: string
    }
    contact: {
      email: string
      phone: string
    }
    socialMedia: {
      facebook: string
      twitter: string
      instagram: string
      linkedin: string
    }
  }
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Logo and Copyright */}
        <div className="text-center md:text-left">
          <img
            src={data.logo}
            alt="Infrafix Logo"
            className="h-12 mx-auto md:mx-0 mb-4"
            id="footer-logo"
          />
          <p className="text-gray-400">
            &copy; Infrafix 2025. All rights reserved.
          </p>
        </div>

        {/* Address Information */}
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-4">Kantor Kami</h3>
          <h4 className="font-medium text-lg mb-5">{data.address.city}</h4>
          <p className="text-gray-400">{data.address.street}</p>
          <p className="text-gray-400">
            {data.address.province}, {data.address.country}
          </p>
          <p className="text-gray-400 mt-2">{data.contact.email}</p>
          <p className="text-gray-400">{data.contact.phone}</p>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-right">
          <h3 className="font-bold text-lg mb-4">Ikuti Kami</h3>
          <div className="flex justify-center md:justify-end space-x-4">
            <a
              href={data.socialMedia.facebook}
              className="text-gray-400 hover:text-white transition duration-300"
              id="social-facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/FFFFFF/facebook-new.png"
                alt="Facebook"
                className="w-6 h-6"
              />
            </a>
            <a
              href={data.socialMedia.twitter}
              className="text-gray-400 hover:text-white transition duration-300"
              id="social-twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/FFFFFF/twitter--v1.png"
                alt="Twitter"
                className="w-6 h-6"
              />
            </a>
            <a
              href={data.socialMedia.instagram}
              className="text-gray-400 hover:text-white transition duration-300"
              id="social-instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/FFFFFF/instagram-new--v1.png"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
            <a
              href={data.socialMedia.linkedin}
              className="text-gray-400 hover:text-white transition duration-300"
              id="social-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.icons8.com/ios-filled/30/FFFFFF/linkedin.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8 text-gray-500">
        {/* Original copyright, moved for better structure */}
      </div>
    </footer>
  )
}

export default Footer
