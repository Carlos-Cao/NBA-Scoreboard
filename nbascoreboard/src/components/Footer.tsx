const Footer = () => {
  return (
    <footer className="bg-red-700 text-white py-4">
      <div className="container mx-auto text-center">
        <a href="https://github.com/Carlos-Cao">
          <p>&copy; {new Date().getFullYear()} Carlos-Cao</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
