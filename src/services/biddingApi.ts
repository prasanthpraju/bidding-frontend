const API_URL = "http://localhost:3000/api/v1";

export async function getBiddings() {
  const response = await fetch(
    `${API_URL}/bidding`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return response.json();
}

export async function getBiddingById(id: string) {
  const response = await fetch(
    `${API_URL}/bidding/${encodeURIComponent(id)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return response.json();
}

export async function createBidding(data: {
  name: string;
  pool: number;
  members: number;
  duration: number;
  durationType: string;
  upiId: string;
  qrCodeImage: File | null;
}) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("pool", String(data.pool));
  formData.append("members", String(data.members));
  formData.append("duration", String(data.duration));
  formData.append("durationType", data.durationType);
  formData.append("upiId", data.upiId);

  if (data.qrCodeImage) {
    formData.append(
      "qrCodeImage",
      data.qrCodeImage
    );
  }

  const response = await fetch(
    `${API_URL}/bidding`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  return response.json();
}

export async function deleteBidding(
  id: string
) {
  const response = await fetch(
    `${API_URL}/bidding?id=${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return response.json();
}