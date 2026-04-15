import MapPin from "../assets/map_pin.png";
import BackButton from "../components/BackButton";

const Header = ({
  title = "University of Calgary", // TODO: change to be dynamic?
  showLocation = true,
  className = "",
  showBack = false,
}) => {
  return (
    <header className={`w-full bg-[#f5f4f2] px-4 md:px-6 py-3 ${className}`}>
      <div className="relative flex items-center justify-between">

        <div className="flex items-center">
          <img
            src="/UEATS.svg"
            alt="UEats logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </div>

        {showLocation && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">

            {showBack ? (
              <BackButton />
            ) : (
              <img
                src={MapPin}
                alt="Location icon"
                className="h-4 w-4 md:h-5 md:w-5 object-contain"
              />
            )}

            <span className="text-md md:text-base font-semibold text-black whitespace-nowrap">
              {title}
            </span>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;