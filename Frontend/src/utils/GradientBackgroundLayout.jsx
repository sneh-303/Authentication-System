// src/components/GradientBackgroundLayout.jsx
const GradientBackgroundLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 flex items-center justify-center px-4">
      {children}
    </div>
  );
};

export default GradientBackgroundLayout;
