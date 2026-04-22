import { useState } from "react";
import FormField from "../../../auth/components/FormField";
import { useProduct } from "../../hook/useProduct";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImageFiles((prev) => {
        const combined = [...prev, ...newFiles];
        // Enforce maximum 7 images silently
        if (combined.length > 7) {
          return combined.slice(0, 7);
        }
        return combined;
      });
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceAmount", formData.priceAmount);
      
      // Append each file separately
      imageFiles.forEach((file) => {
        data.append("images", file);
      });

      await handleCreateProduct(data);
      setStatus("success");
      setFormData({ title: "", description: "", priceAmount: "" });
      setImageFiles([]);
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setStatus("error");
      console.error(err);
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto p-6 relative pb-10">
      <h2 className="font-display text-[40px] leading-[0.9] tracking-[-1px] uppercase text-black mb-6">
        Create Product
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="prod-title"
          label="Product Name"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <FormField
          id="prod-desc"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <FormField
          id="prod-price"
          label="Price (INR)"
          type="number"
          name="priceAmount"
          value={formData.priceAmount}
          onChange={handleChange}
        />
        
        {/* Image Upload */}
        <div className="w-full pb-6">
          <label htmlFor="prod-image" className="block w-full h-[96px] border-[1px] border-dashed border-black rounded-none flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors mt-2">
            <span className="font-body text-[11px] uppercase tracking-[3px] font-bold text-black opacity-50">
              UPLOAD PRODUCT IMAGES (MAX 7)
            </span>
            <input
              id="prod-image"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Thumbnails */}
          {imageFiles.length > 0 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
              {imageFiles.map((file, idx) => (
                <div key={idx} className="relative shrink-0 w-16 h-16 border border-black bg-cream overflow-hidden group">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-body text-[9px] font-bold tracking-[1px] uppercase"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          id="create-submit-btn"
          type="submit"
          className="flex items-center justify-center w-full h-[44px] px-5 bg-accent text-black border-[1.5px] border-black rounded-none font-body text-[12px] font-bold tracking-[0.2em] uppercase cursor-pointer gap-2 transition-all duration-150 hover:bg-[#b8e800] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mb-0"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? "CREATING..." : status === "success" ? "PRODUCT CREATED ✓" : "CREATE PRODUCT →"}
        </button>

        {status === "error" && (
          <p className="font-body text-[9px] font-medium tracking-[1px] uppercase text-[#CC0000] text-center w-full absolute bottom-2 left-0">
            Registration failed. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
