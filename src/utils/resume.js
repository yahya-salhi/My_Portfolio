const RESUME_PATH = "/Yahya_Salhi_CV.pdf";
const RESUME_DOWNLOAD_NAME = "Yahya_Salhi_CV.pdf";

export const downloadResume = () => {
  const link = document.createElement("a");
  link.href = RESUME_PATH;
  link.download = RESUME_DOWNLOAD_NAME;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const viewResume = () => {
  window.open(RESUME_PATH, "_blank");
};

export const checkResumeExists = async () => {
  try {
    const response = await fetch(RESUME_PATH, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};
