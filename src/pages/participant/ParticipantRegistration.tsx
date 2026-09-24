import { useParams } from "react-router-dom";

function ParticipantRegistration() {
  const { bidCode } = useParams();

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#153C33] mb-2">
          Registration
        </h1>

        <p className="text-gray-600 mb-6">
          Bidding ID: {bidCode}
        </p>

        <p className="text-gray-500">
          Registration form coming next...
        </p>
      </div>
    </div>
  );
}

export default ParticipantRegistration;