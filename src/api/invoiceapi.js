import axiosInstance from "./axios";

/**
 * GET invoices (paginated + search)
 */
export const getInvoices = async ({ page = 1, limit = 10, search = "" }) => {
  const { data } = await axiosInstance.get("/invoices", {
    params: { page, limit, search },
  });
  return data;
};

/**
 * GET single invoice by ID
 */
export const getSingleInvoice = async (id) => {
  const { data } = await axiosInstance.get(`/invoices/${id}`);
  return data;
};

/**
 * MARK invoice as PAID
 */
export const markInvoicePaid = async (id) => {
  const { data } = await axiosInstance.put(`/invoices/${id}/status`);
  return data;
};

/**
 * DELETE invoice
 */
export const deleteInvoice = async (id) => {
  const { data } = await axiosInstance.delete(`/invoices/${id}`);
  return data;
};

/**
 * DOWNLOAD invoice PDF
 */
export const downloadInvoice = async (id) => {
  const response = await axiosInstance.get(`/invoices/${id}/download`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `invoices-${id}.pdf`;
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

export const getInvoiceStats = async () => {
  const { data } = await axiosInstance.get("/invoices/stats");
  return data;
};
