import { getById } from "./common";

export const formattedDate = (isoDate) => {
  if (isoDate) {
    return new Date(isoDate).toISOString().split("T")[0];
  }
};

export const FileDownload = async (ID) => {
  try {
    const item = await getById(`/downloadInquiry?inquiry_id=${ID}`);
    if (item) {
      if (item.type === "success" && item.data?.file_path) {
        const fileUrl = `${process.env.VITE_REACT_APP_API_MAIN_SERVER_URL}${item.data.file_path}`;
        const fileName = fileUrl.split("/").pop();
        const fileResponse = await fetch(fileUrl);
        if (!fileResponse.ok) {
          throw new Error("Failed to download file");
        }
        if (fileResponse) {
          const blob = await fileResponse.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          return true;
        }
      }
    }
  } catch (error) {
    console.error("Download error:", error);
    alert("Error downloading file!");
  }
};
