import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, clearCart } from "../utils/cartSlice";

const CartModal = ({ isOpen, onClose, cartItems }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            ✖
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems?.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.card.info.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.card.info.price / 100}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeItem(index))} 
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Clear Cart
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
