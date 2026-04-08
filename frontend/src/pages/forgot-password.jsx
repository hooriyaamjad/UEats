import BackButton from "../components/BackButton";

export default function ForgotPassword() {
  return (
    <main>
      <div className="absolute top-4 left-4">
        <BackButton to="/login"/>
      </div>
    </main>
  );
}