import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

export default function Recommendations() {
  
  return (
    <div className="font-sans max-[393px]:max-w-full">
      <Header
        showBack={true}
        title="Your Recommendations"
      />

      <div className="mx-auto pt-[5px] px-[20px] pb-[20px] text-[14px]">
      </div>
      <BottomNavBar />
    </div>
  );
}