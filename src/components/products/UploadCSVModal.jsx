import { useState } from "react";
import { uploadCSVProducts } from "../../api/productApi";
import { toast } from "react-hot-toast";
import uploadIcon from "../../assets/upload.png";

const UploadCSVModal = ({ onCancel, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (selected) => {
    if (!selected) return;

    if (!selected.name.endsWith(".csv")) {
      toast.error("Only CSV files are allowed");
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleFileChange = (e) => {
    handleFileSelect(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await uploadCSVProducts(formData);

      setResult(res.data);

      if (res.data.errorRows?.length) {
        toast(`Uploaded ${res.data.successCount} products with some errors`, {
          icon: "⚠️",
        });
      } else {
        toast.success(
          `Uploaded ${res.data.successCount} products successfully`,
        );
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "CSV upload failed. Please check the file.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setFile(null);
    onSuccess();
  };

  return (
    <div className="csv-upload">
      {!result ? (
        <>
          <div
            className={`csv-drop-zone ${dragActive ? "active" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <img src={uploadIcon} alt="" />
            <p>Drag your file(s) to start uploading</p>
            <span>OR</span>
            <label className="browse-btn">
              Browse files
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileChange}
                disabled={loading}
              />
            </label>
          </div>

          {file && (
            <div className="selected-file">
              <span>{file.name}</span>
              <button type="button" onClick={() => setFile(null)}>
                ✕
              </button>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="csv-result">
            <h4>Upload Summary</h4>
            <p>
              Successfully added: <strong>{result.successCount}</strong>
            </p>

            {result.errorRows?.length > 0 && (
              <ul className="error-list">
                {result.errorRows.map((e, i) => (
                  <li key={i}>
                    Row {e.row}: {e.error}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-actions">
            <button onClick={handleDone}>Done</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadCSVModal;
