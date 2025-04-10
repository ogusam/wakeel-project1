import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const STORAGE_KEY = "registration_documents";

const Documents = ({ onValidate }: { onValidate: (valid: boolean) => void }) => {
  const [documents, setDocuments] = useState<{
    [key: string]: File | null;
  }>({
    certOfIncorp: null,
    formCO2: null,
    formC07: null,
    formCAC11: null,
    memorandum: null,
    boardResolution: null,
    scumlCert: null,
    professionalCert: null,
    cerpac: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load saved filenames from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setDocuments((prev) => ({
        ...prev,
        ...Object.keys(parsed).reduce((acc, key) => {
          acc[key] = null; // Can't restore actual files
          return acc;
        }, {} as { [key: string]: File | null }),
      }));
    }
  }, []);

  useEffect(() => {
    const requiredFields = [
      "certOfIncorp",
      "formCO2",
      "formC07",
      "formCAC11",
      "memorandum",
      "boardResolution",
    ];

    const newErrors: { [key: string]: string } = {};
    let valid = true;

    requiredFields.forEach((field) => {
      if (!documents[field]) {
        newErrors[field] = "This document is required.";
        valid = false;
      }
    });

    setErrors(newErrors);
    onValidate(valid);

    // Save file names to localStorage for persistence
    const docNames = Object.entries(documents).reduce((acc, [key, file]) => {
      if (file) acc[key] = file.name;
      return acc;
    }, {} as { [key: string]: string });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(docNames));
  }, [documents, onValidate]);

  const handleFileChange = (key: keyof typeof documents, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [key]: file }));
    if (!file && !["scumlCert", "professionalCert", "cerpac"].includes(key)) {
      setErrors((prev) => ({ ...prev, [key]: "This document is required." }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { key: "certOfIncorp", label: "Certificate of Incorporation" },
        { key: "formCO2", label: "Form CO2" },
        { key: "formC07", label: "Form C07" },
        { key: "formCAC11", label: "Form CAC1.1" },
        { key: "memorandum", label: "Memorandum and Articles of Association" },
        { key: "boardResolution", label: "Board Resolution (signed and sealed)" },
        { key: "scumlCert", label: "SCUML Certificate (if applicable)" },
        { key: "professionalCert", label: "Professional Membership Certificate" },
        { key: "cerpac", label: "CERPAC for Foreign Directors/Signatories" },
      ].map(({ key, label }) => (
        <div key={key}>
          <label className="block mb-1">{label}</label>
          <Input
            type="file"
            onChange={(e) =>
              handleFileChange(key as keyof typeof documents, e.target.files?.[0] || null)
            }
          />
          {errors[key] && <p className="text-red-600 text-sm mt-1">{errors[key]}</p>}
        </div>
      ))}
    </div>
  );
};

export default Documents;
