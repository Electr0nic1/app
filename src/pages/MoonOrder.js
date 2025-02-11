import React, { useState } from 'react';
import api from '../api';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const MoonOrder = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [watermarkedImage, setWatermarkedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage)); // Создаем URL для превью
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setWatermarkedImage(null);

    try {
      const formData = new FormData();
      formData.append('message', text);
      if (image) {
        formData.append('fileimage', image);
      }

      const imageBlob = await api.addMoonOrder(formData);
      const imageUrl = URL.createObjectURL(imageBlob);
      setWatermarkedImage(imageUrl);
      setText('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting Moon Order:', error);
      setErrors(error?.error?.errors || { general: 'Произошла ошибка при отправке заказа.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="px-4 mb-10 sm:px-0 bg-white shadow-xl rounded">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between w-full items-center p-6">
              <label
                className="text-base font-semibold leading-7 text-sky-600 text-xl"
                htmlFor="text"
              >
                Текст для водяного знака (не менее 10 и не более 20 символов)
              </label>
              <input
                required
                type="text"
                id="text"
                name="text"
                value={text}
                onChange={handleTextChange}
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              {errors?.text && <></>}
            </div>
            <div className="flex justify-between w-full items-center p-6">
              <label
                className="text-base font-semibold leading-7 text-sky-600 text-xl"
                htmlFor="image"
              >
                Загрузить изображение (формат jpg)
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              {errors?.image && <></>}
              {imagePreview && <img src={imagePreview} alt="Image Preview" className="max-w-xs" />}
            </div>
            <div className="my-10">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                {loading ? 'Отправка...' : 'Сделать подпись'}
              </button>
            </div>
          </form>
          <Link
            className="bg-sky-500 text-white py-2 px-2 rounded shadow-md text-xs hover:bg-sky-600"
            to="/gagarin"
          >
            На главную
          </Link>
        </div>
        {watermarkedImage && <img src={watermarkedImage} />}
      </div>
    </>
  );
};

export default MoonOrder;
