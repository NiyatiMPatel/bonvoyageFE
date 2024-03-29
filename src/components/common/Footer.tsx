const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* LEFT CORNER OF HEADER WITH LOGO/COMPANY NAME */}
        <span className="text-3xl text-white font-bold tracking-tight">
          BonVoyage
        </span>
        {/* RIGHT CORNER OF HEADER WITH MENU ITEMS */}
        <span className="flex text-white font-bold tracking-tight gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
