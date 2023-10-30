import { api } from "../api";

export const useDownloader = () => {
  const generateURLforDownload =
    api.storage.generateURLForDownload.useMutation();
  const forceDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    downloader: generateURLforDownload.mutateAsync,
    forceDownload: forceDownload,
  };
};
