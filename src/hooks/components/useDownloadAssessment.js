import { useState, useCallback } from "react";
import apiClient from "../../api/apiClient";
import Sleep from "../../utils/Sleep";

const useDownloadAssessment = () => {

    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    const downloadAssessment = useCallback(async (householdId, assessmentId) => {

        if (!householdId || !assessmentId) {

            setDownloadError("Household ID and assessment ID are required.");
            return false;

        };

        try {

            setIsDownloading(true);
            setDownloadError(null);

            const response = await apiClient.get(`/solar-assessment-results/household/${householdId}/assessment/${assessmentId}/pdf`,{
                    responseType: "blob",
                }
            );

            const pdfBlob = new Blob([response.data], {
                type: "application/pdf",
            });

            const downloadUrl = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `solar-assessment-${assessmentId}.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.setTimeout(() => {
                window.URL.revokeObjectURL(downloadUrl);
            }, 1000);



            return true;

        } catch (err) {
            console.error("Assessment PDF download failed:", err);

            setError("Unable to download the assessment report. Please try again.");

            return false;
        } finally {

            await Sleep(1200);
            setIsDownloading(false);
            
        }
    }, []);

    return {
        downloadAssessment,
        isDownloading,
        downloadError,
        setDownloadError,
    };
};

export default useDownloadAssessment;
